import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { colors } from "../config/theme";

const MainContainer = ({ children, style, ...props }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView
        style={[{ backgroundColor: activeColors.primary }, style]}
        showsVerticalScrollIndicator={false}
        {...props}
      >
        {children}
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
});

export default MainContainer;
