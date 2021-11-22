import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

type Props = {
  // TODO 型
  navigation: StackNavigationProp<{
    Home: undefined;
    Game: { userName1: string; userName2: string };
    MatchResults: undefined;
  }>;
};

function Home({ navigation }: Props) {
  const [userName1, setUserName1] = useState("");
  const [userName2, setUserName2] = useState("");

  const handleInputUserName1 = (vaule: string) => {
    setUserName1(vaule);
  };
  const handleInputUserName2 = (vaule: string) => {
    setUserName2(vaule);
  };

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const fetchData = await AsyncStorage.getItem("userName");
        if (fetchData) {
          const userNames = JSON.parse(fetchData);
          setUserName1(userNames.userName1 || "");
          setUserName2(userNames.userName2 || "");
        } else {
          setUserName1("名無し1");
          setUserName2("名無し2");
        }
      } catch (e) {
        console.log("async fetch error", e);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    const setUserName = async () => {
      try {
        await AsyncStorage.setItem(
          "userName",
          JSON.stringify({ userName1, userName2 })
        );
      } catch (e) {
        console.log("async set error", e);
      }
    };
    setUserName();
  }, [userName1, userName2]);
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Play 三目並べ"
        onPress={() => {
          if (userName1 === "" || userName2 === "") return;
          return navigation.navigate("Game", {
            userName1: userName1,
            userName2: userName2,
          });
        }}
      />
      <Text style={styles.inputDescription}>お名前1</Text>
      <TextInput
        value={userName1}
        style={styles.inputStyle}
        onChangeText={(value) => {
          handleInputUserName1(value);
        }}
      />
      <Text style={styles.inputDescription}>お名前2</Text>
      <TextInput
        value={userName2}
        style={styles.inputStyle}
        onChangeText={(value) => {
          handleInputUserName2(value);
        }}
      />
      <Button
        title="対戦成績"
        onPress={() => {
          return navigation.navigate("MatchResults");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderColor: "#000",
    fontSize: 30,
    height: 40,
    width: 250,
    margin: 10,
  },
  inputDescription: {
    fontSize: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default Home;
