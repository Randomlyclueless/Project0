// AppNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import AddInventory from "../screens/AddInventory";
import Repost from "../screens/Repost";

// ✅ Exporting the type properly
export type RootStackParamList = {
  Home: undefined;
  AddInventory: undefined;
  Repost: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddInventory" component={AddInventory} />
        <Stack.Screen name="Repost" component={Repost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
