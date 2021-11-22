import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dayjs from "dayjs";

export type GameResultsViewProps = {
  index: number;
  black: string;
  white: string;
  date: string;
  // TODO 型
  result: 1 | -1 | 0;
  turn: number;
};

function GameResultsView({
  index,
  black,
  white,
  date,
  result,
  turn,
}: GameResultsViewProps) {
  let matchResult = "引き分け";
  if (result === 1) {
    matchResult = "先手勝利";
  } else if (result === -1) {
    matchResult = "後手勝利";
  }
  return (
    <View style={styles.wrapper}>
      <Text>
        {index} {dayjs(date).format("YYYY年MM月DD日 HH:mm:ss")}
      </Text>
      <Text style={styles.matchTitle}>{`${black} VS ${white}`}</Text>
      <Text style={styles.matchResult}>
        {turn}手 {matchResult}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 10,
  },
  matchTitle: {
    alignSelf: "center",
  },
  matchResult: {
    alignSelf: "center",
    margin: 5,
    fontSize: 20,
  },
});

export default GameResultsView;
