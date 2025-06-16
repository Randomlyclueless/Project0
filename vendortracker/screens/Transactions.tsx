import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Transactions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>💰 Transactions</Text>
      <Text style={styles.subText}>
        Here&apos;s where you can view your payment history and data insights.
      </Text>
    </View>
  );
};

export default Transactions;

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
