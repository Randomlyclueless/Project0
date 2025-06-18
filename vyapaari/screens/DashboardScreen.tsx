import React from "react";
import { View, Text, StyleSheet, Button, Alert, FlatList } from "react-native";

// Dummy transaction data
const transactions = [
  { id: 1, amount: 100, date: "2025-06-17", status: "paid", customer: "Amit" },
  {
    id: 2,
    amount: 200,
    date: "2025-06-17",
    status: "pending",
    customer: "Ravi",
  },
  { id: 3, amount: 300, date: "2025-06-16", status: "paid", customer: "Sneha" },
  { id: 4, amount: 150, date: "2025-06-15", status: "paid", customer: "Neha" },
];

const today = "2025-06-17";
const thisWeek = ["2025-06-15", "2025-06-16", "2025-06-17"];

const totalToday = transactions
  .filter((t) => t.date === today && t.status === "paid")
  .reduce((sum, t) => sum + t.amount, 0);

const totalThisWeek = transactions
  .filter((t) => thisWeek.includes(t.date) && t.status === "paid")
  .reduce((sum, t) => sum + t.amount, 0);

const totalIncome = transactions
  .filter((t) => t.status === "paid")
  .reduce((sum, t) => sum + t.amount, 0);

const pendingPayments = transactions.filter((t) => t.status === "pending");
const recentTransactions = transactions.slice(0, 3);

export default function DashboardScreen() {
  const handlePress = () => {
    Alert.alert("Test Passed ✅", "The button press is working!");
    console.log("Button was pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📊 Vyapaari Dashboard</Text>

      <Text style={styles.section}>💰 Income Summary</Text>
      <Text>📅 Today: ₹{totalToday}</Text>
      <Text>📆 This Week: ₹{totalThisWeek}</Text>
      <Text>🏦 Total Income: ₹{totalIncome}</Text>

      <Text style={styles.section}>📋 Transactions Overview</Text>
      <Text>Total Transactions: {transactions.length}</Text>
      <Text>Pending Payments: {pendingPayments.length}</Text>

      <Text style={styles.section}>🧾 Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            • {item.customer} paid ₹{item.amount} ({item.status})
          </Text>
        )}
      />

      <View style={{ marginTop: 30 }}>
        <Button title="Test Button" onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: "600",
  },
});
