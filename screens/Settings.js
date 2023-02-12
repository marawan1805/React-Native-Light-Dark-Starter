import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Switch,
  Button,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

const SettingsScreen = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === "dark");
  const toggleTheme = () => {
    updateTheme();
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <SafeAreaView
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
    >
      <Switch
        value={isDarkTheme}
        onValueChange={toggleTheme}
        thumbColor={isDarkTheme ? "#fff" : activeColors.tertiary}
        ios_backgroundColor={activeColors.primary}
        trackColor={{
          false: activeColors.primary,
          true: activeColors.accent,
        }}
      ></Switch>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsScreen;
