import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const CartScreen = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: activeColors.primary,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: activeColors.tertiary,
          marginBottom: 20,
        }}
      >
        Your cart is empty
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{
          backgroundColor: activeColors.accent,
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: activeColors.primary,
          }}
        >
          Explore
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;
