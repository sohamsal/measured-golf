import React, { useState } from "react";
import { View, Button, Alert, ActivityIndicator } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";

const yourIpAddress = "PUT YOUR IP ADDRESS HERE"

const PaymentScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentIntent = async () => {
    try {
      const response = await fetch("http://"+yourIpAddress+":3000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1, currency: "usd" }), // Amount in cents
    });

    const { paymentIntent } = await response.json();
    return { paymentIntent };
  } catch (error) {
    console.error(error);
    return null;
  }
};

const openPaymentSheet = async () => {
  setLoading(true);

  const paymentData = await fetchPaymentIntent();
  if (!paymentData) {
    Alert.alert("Error", "Failed to fetch payment details");
    setLoading(false);
    return;
  }

  const { paymentIntent } = paymentData;

  const { error } = await initPaymentSheet({
    paymentIntentClientSecret: paymentIntent,
    merchantDisplayName: "Your Business Name",
    returnURL: "https://www.google.com/",  // Change this based on your app setup
  });

  if (error) {
    Alert.alert("Error", error.message);
    setLoading(false);
    return;
  }

  const { error: paymentError } = await presentPaymentSheet();
  setLoading(false);

  if (paymentError) {
    Alert.alert("Payment Failed", paymentError.message);
  } else {
    Alert.alert("Success", "Your payment was successful!");
  }
};

return (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    <Button title="Pay Now" onPress={openPaymentSheet} />
  </View>
);
};

export default PaymentScreen;
