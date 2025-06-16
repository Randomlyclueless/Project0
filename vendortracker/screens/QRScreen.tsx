import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

export default function QRScreen() {
  const upiLink = "upi://pay?pa=vendor@upi&pn=VendorName&am=100&cu=INR";

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Scan to Pay </Text>{" "}
      <QRCode
        value={upiLink}
        size={200}
        color="black"
        backgroundColor="white"
      />
      <Text style={styles.subtitle}> UPI ID: vendor @upi </Text>{" "}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20,
    color: "gray",
  },
});
