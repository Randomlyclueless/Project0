import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Button
        title="Add Inventory"
        onPress={() => navigation.navigate("AddInventory")}
      />
      <Button title="Repost" onPress={() => navigation.navigate("Repost")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
