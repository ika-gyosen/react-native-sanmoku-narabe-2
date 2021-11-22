import { StyleSheet, Text, View, Pressable, Button } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import GameStatus from "~/components/GameStatus";
import SanmokuBoard from "~/components/SanmokuBoard";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO 型
type gameBordSquareState = 1 | -1 | 0;

type Props = {
  // TODO 型
  navigation: StackNavigationProp<{
    Home: undefined;
    Game: { userName1: string; userName2: string };
  }>;
  route: RouteProp<{ params: { userName1: string; userName2: string } }>;
};

function Game({ route, navigation }: Props): JSX.Element {
  const [gameBoard, setGameBoard] = useState<gameBordSquareState[]>([
    0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [isBlackTurn, setIsBlackTurn] = useState(true);
  const [turnCount, setTurnCount] = useState(1);
  const [gameState, setGameState] = useState<1 | -1 | 0>(0);

  const { userName1, userName2 } = useMemo(() => {
    return route.params;
  }, []);

  useEffect(() => {
    const writeGameResult = async () => {
      try {
        const fetchData = await AsyncStorage.getItem("gameResult");
        const gameResults = JSON.parse(fetchData ? fetchData : "[]");
        gameResults.push({
          black: userName1,
          white: userName2,
          date: new Date(),
          result: gameState,
          turn: turnCount,
        });
        await AsyncStorage.setItem("gameResult", JSON.stringify(gameResults));
      } catch (e) {
        console.log("Game screen storage Error", e);
      }
    };
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const pattern of patterns) {
      const check =
        gameBoard[pattern[0]] + gameBoard[pattern[1]] + gameBoard[pattern[2]];
      if (check === 3) {
        setGameState(1);
        writeGameResult();
        break;
      } else if (check === -3) {
        setGameState(-1);
        writeGameResult();
        break;
      } else {
        setGameState(0);
        if (turnCount === 10) {
          writeGameResult();
        }
      }
    }
  }, [gameBoard]);

  const handlePressSquare = (presedPosition: number) => {
    if (gameBoard[presedPosition] !== 0 || gameState !== 0) return;
    const maruOrBatsu = isBlackTurn ? 1 : -1;
    setGameBoard((prev) =>
      prev.map((squareState, index) => {
        return presedPosition === index ? maruOrBatsu : squareState;
      })
    );
    setIsBlackTurn((prev) => !prev);
    setTurnCount((prev) => prev + 1);
  };

  const handlePressReset = () => {
    setGameBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setIsBlackTurn(true);
    setTurnCount(1);
    setGameState(0);
  };

  return (
    <View style={styles.container}>
      <Text>{turnCount !== 10 ? turnCount : 9}手目</Text>
      <Text>{isBlackTurn ? userName1 : userName2}</Text>
      <View style={styles.bordContainer}>
        <SanmokuBoard
          handlePressSquare={handlePressSquare}
          gameBord={gameBoard}
        />
      </View>
      <View style={styles.statusContainer}>
        <GameStatus
          turnCount={turnCount}
          gameState={gameState}
          isBlackTurn={isBlackTurn}
        />
      </View>
      <Button title="リセット" onPress={handlePressReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 50,
  },
  bordContainer: {
    margin: 20,
  },
  statusContainer: {
    margin: 20,
  },
});

export default Game;
