import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../config/theme";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";

const Checkout = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        console.log("User is signed out.");
      }
    });
  });

  return (
    <View
      style={{
        backgroundColor: colors.light.secondary,
      }}
    >
      <Text>{userData.email}</Text>
    </View>
  );
};

export default Checkout;
