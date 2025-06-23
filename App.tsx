import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { enableScreens } from "react-native-screens";

// Screens
import DashboardScreen from "./screens/DashboardScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import QRPaymentScreen from "./screens/QRPaymentScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import VyomScreen from "./screens/VyomScreen";
import ClientsScreen from "./screens/ClientsScreen";
import SettingsScreen from "./screens/SettingsScreen";

// Optimize screen handling
enableScreens();

// Create drawer navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        {...({ id: "RootDrawer" } as any)}
        initialRouteName="Hii Vyapaari"
        screenOptions={{ headerShown: true }}
      >
        <Drawer.Screen name="Hii Vyapaari" component={DashboardScreen} />
        <Drawer.Screen name="Transactions" component={TransactionsScreen} />
        <Drawer.Screen name="QR Code" component={QRPaymentScreen} />
        <Drawer.Screen name="Analytics" component={AnalyticsScreen} />
        <Drawer.Screen name="Vyom Assistant" component={VyomScreen} />
        <Drawer.Screen name="Client Book" component={ClientsScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
