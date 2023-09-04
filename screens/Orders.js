import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNUpiPayment from "react-native-upi-payment";

import { colors } from "../config/theme";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const Orders = () => {
  const navigation = useNavigation();

  const [orderTxnId, setOrderTxnId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  const makePayment = () => {
    RNUpiPayment.initializePayment(
      {
        vpa: "8340257758@paytm",
        payeeName: "Ashish Kumar",
        amount: "1",
        transactionRef: "aasf-332-aoei-fn",
      },
      successCallback,
      failureCallback
    );
  };

  const failureCallback = (data) => {
    console.log(data);
    // in case no action taken
    if (data["status"] == "FAILURE") {
      setOrderStatus("FAILURE");
      setOrderMessage(data["message"]);
    }
    // in case of googlePay
    else if (data["Status"] == "FAILURE") {
      setOrderStatus("FAILURE");
      setOrderMessage("App closed without doing payment");
    }
    // in case of phonepe
    else if (data["Status"] == "Failed") {
      setOrderStatus("Failed");
      setOrderMessage("App closed without doing payment");
    }
    // in case of phonepe
    else if (data["Status"] == "Submitted") {
      setOrderStatus("Submitted");
      setOrderMessage("transaction done but pending");
    }
    // any other case than above mentioned
    else {
      setOrderStatus("FAILURE");
      setOrderMessage(data[Status]);
    }
  };
  const successCallback = (data) => {
    //
    console.log(data);
    setOrderTxnId(data["txnId"]);
    setOrderStatus("SUCCESS");
    setOrderMessage("Succccessfull payment");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // console.log(uid);
      } else {
        console.log("User is signed out.");
      }
    });
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.light.primary,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: colors.light.tertiary,
          marginBottom: 20,
        }}
      >
        Orders
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          backgroundColor: colors.light.accent,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.light.primary,
          }}
        >
          Explore
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Orders;
