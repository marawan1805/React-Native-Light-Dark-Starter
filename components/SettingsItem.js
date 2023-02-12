import { View, Text } from "react-native";
import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../config/theme";
const SettingsItem = ({ children, label }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <View>
      <Text>SettingsItem</Text>
    </View>
  );
};

export default SettingsItem;
