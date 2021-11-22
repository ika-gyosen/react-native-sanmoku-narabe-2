import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "~/screens/Home";
import Game from "~/screens/Game";
import MatchResults from "~/screens/MatchResults";

export type HomeStackParamList = {
  Home: undefined;
  Game: { userName1: string; userName2: string };
  MatchResults: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

function HomeNavigator(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Game" component={Game} />
      <Stack.Screen name="MatchResults" component={MatchResults} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
