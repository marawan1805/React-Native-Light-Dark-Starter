import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import Hamburger from "../components/circle/Drawer";

const Circle = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return <Hamburger />;
};

export default Circle;
