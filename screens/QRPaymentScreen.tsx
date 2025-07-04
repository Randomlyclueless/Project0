import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform
} from "react-native";
import { db } from "../services/firebase";
import { ref, push, onValue } from "firebase/database";
import QRCode from "react-native-qrcode-svg";
import VoiceRecorder from "../components/VoiceRecorder";

const QRPaymentScreen = () => {
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [qrData, setQrData] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    console.log("✅ QRPaymentScreen mounted");
    const txnRef = ref(db, "transactions");
    onValue(txnRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const txnList = Object.values(data);
        setTransactions(txnList.reverse());
      } else {
        setTransactions([]);
      }
    });

    if (Platform.OS === "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
    }
  }, []);

  const handleSubmit = (method: string) => {
    if (!amount || !vendor) return;
    const txn = {
      vendor,
      amount: parseFloat(amount),
      method,
      timestamp: new Date().toISOString()
    };

    const txnRef = ref(db, "transactions");
    push(txnRef, txn);
    setAmount("");

    if (method === "QR") {
      const upiId = "abc@okaxis"; // 🔁 Replace with your actual UPI ID
      const upiUrl = `upi://pay?pa=${upiId}&pn=${vendor}&am=${amount}&cu=INR`;
      setQrData(upiUrl);
    } else {
      setQrData(null);
    }
  };

  const getTotal = () => transactions.reduce((sum, t) => sum + t.amount, 0);
  const getQR = () => transactions.filter(t => t.method === "QR").reduce((sum, t) => sum + t.amount, 0);
  const getCash = () => transactions.filter(t => t.method === "Cash").reduce((sum, t) => sum + t.amount, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚡ Quick Payment</Text>
      <Text style={styles.subtitle}>Enter vendor name & payment method</Text>

      <Text style={styles.label}>Your Name (Vendor)</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={vendor}
          onChangeText={setVendor}
          placeholder="Enter your name"
        />
        <VoiceRecorder onResult={(text) => setVendor(text)} />
      </View>

      <Text style={styles.label}>Amount (₹)</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
        />
        <VoiceRecorder onResult={(text) => setAmount(text)} />
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.qrBtn} onPress={() => handleSubmit("QR")}>
          <Text style={styles.btnText}>QR Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cashBtn} onPress={() => handleSubmit("Cash")}>
          <Text style={styles.btnText}>Cash Payment</Text>
        </TouchableOpacity>
      </View>

      {qrData && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text style={{ marginBottom: 10 }}>Scan this UPI QR</Text>
          <QRCode value={qrData} size={200} />
        </View>
      )}

      <Text style={styles.section}>📊 Today's Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.card}>Total Revenue: ₹{getTotal()}</Text>
        <Text style={styles.card}>QR: ₹{getQR()}</Text>
        <Text style={styles.card}>Cash: ₹{getCash()}</Text>
      </View>

      <Text style={styles.section}>🧾 Transaction Feed</Text>
      {transactions.map((t, i) => (
        <View key={i} style={styles.txn}>
          <Text>{t.vendor} - ₹{t.amount} via {t.method}</Text>
          <Text style={styles.timestamp}>{new Date(t.timestamp).toLocaleString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "#666", marginBottom: 10 },
  label: { fontWeight: "600", marginTop: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 6, marginBottom: 10 },
  pickerBox: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  qrBtn: { backgroundColor: "#4a90e2", flex: 0.48, padding: 12, borderRadius: 6 },
  cashBtn: { backgroundColor: "#4caf50", flex: 0.48, padding: 12, borderRadius: 6 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  section: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  summaryRow: { gap: 10, marginBottom: 10 },
  card: { backgroundColor: "#f1f1f1", padding: 10, borderRadius: 6 },
  txn: { borderBottomWidth: 1, borderBottomColor: "#eee", paddingVertical: 8 },
  timestamp: { fontSize: 12, color: "#888" }
});

export default QRPaymentScreen;
