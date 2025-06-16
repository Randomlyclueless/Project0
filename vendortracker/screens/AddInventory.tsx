import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function AddInventory() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAdd = () => {
    if (itemName && quantity) {
      Alert.alert(
        "Inventory Added",
        `Item: ${itemName}, Quantity: ${quantity}`
      );
      setItemName("");
      setQuantity("");
    } else {
      Alert.alert("Error", "Please enter item name and quantity");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name</Text>
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name"
      />
      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
