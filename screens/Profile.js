import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/theme";
import { auth } from "../config/firebase";

import { signOut, onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState("");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out!");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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
        {user.email}
      </Text>
      <TouchableOpacity
        onPress={() => handleLogout()}
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
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
