import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  const addTransaction = () => {
    if (!amount) return;

    const newTransaction = {
      id: Date.now().toString(),
      amount,
      name: name || "Unknown",
      date: new Date().toLocaleString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setName("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Add Transaction </Text>{" "}
      <TextInput
        placeholder="Amount (₹)"
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />{" "}
      <TextInput
        placeholder="UPI Ref / Customer Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />{" "}
      <Button title="Add Payment" onPress={addTransaction} />
      <Text style={styles.subheading}> Transaction List </Text>{" "}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.amount}> ₹{item.amount} </Text>{" "}
            <Text>
              {" "}
              {item.name}• {item.date}{" "}
            </Text>{" "}
          </View>
        )}
      />{" "}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, marginBottom: 10 },
  subheading: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 6,
    marginBottom: 10,
  },
  amount: { fontWeight: "bold", fontSize: 16 },
});
