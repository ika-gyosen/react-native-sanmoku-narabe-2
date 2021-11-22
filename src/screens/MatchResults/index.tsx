import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GameResultsView from "~/components/GameResultsView";

function MatchResults() {
  const [results, setResults] = useState<any>([]);
  useEffect(() => {
    const fetchResults = async () => {
      const fetchData = await AsyncStorage.getItem("gameResult");
      setResults(JSON.parse(fetchData ? fetchData : "[]"));
    };
    fetchResults();
  }, []);
  return (
    <View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.date}
        renderItem={({ item, index }) => {
          return (
            <GameResultsView
              index={index}
              black={item.black}
              white={item.white}
              date={item.date}
              result={item.result}
              turn={item.turn}
            />
          );
        }}
      />
    </View>
  );
}

export default MatchResults;
