import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>⚙️ Settings</Text>
      <Text style={styles.subText}>
        Customize your preferences and manage your vendor profile here.
      </Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
