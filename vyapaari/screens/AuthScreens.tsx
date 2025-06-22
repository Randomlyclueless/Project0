import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";

const AuthScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [business, setBusiness] = useState("");
  const [upiId, setUpiId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    if (!name || !phone || !business || !upiId) {
      Toast.show({
        type: "error",
        text1: "❗ Required",
        text2: "Please fill in all fields.",
      });
      return;
    }

    if (phone.length !== 10) {
      Toast.show({
        type: "error",
        text1: "📵 Invalid",
        text2: "Enter a valid 10-digit phone number.",
      });
      return;
    }

    console.log("Sending OTP to:", phone);
    setOtpSent(true);

    Toast.show({
      type: "success",
      text1: "📩 OTP Sent",
      text2: "Use 666666 for now.",
    });
  };

  const handleVerifyOtp = () => {
    if (otp !== "666666") {
      Toast.show({
        type: "error",
        text1: "❌ Invalid OTP",
        text2: "OTP must be 666666 for now.",
      });
      return;
    }

    console.log("OTP verified:", otp);
    Toast.show({
      type: "success",
      text1: "✅ Success",
      text2: "You are now logged in!",
    });

    navigation.replace("MainApp");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👋 Welcome Vyapaari</Text>

      {!otpSent ? (
        <>
          <Text style={styles.label}>👤 Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Ramesh Patel"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>📱 Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="10-digit number"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>🏪 Business Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Patel Kirana Store"
            value={business}
            onChangeText={setBusiness}
          />

          <Text style={styles.label}>💳 UPI ID</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. ramesh@upi"
            value={upiId}
            onChangeText={setUpiId}
          />

          <View style={styles.button}>
            <Button title="Continue & Send OTP" onPress={handleSendOtp} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>🔐 Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
          />
          <View style={styles.button}>
            <Button title="Verify & Continue" onPress={handleVerifyOtp} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginTop: 6,
  },
  button: {
    marginTop: 30,
  },
});
