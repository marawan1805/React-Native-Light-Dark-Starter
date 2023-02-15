import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Switch,
  Button,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import StyledText from "../components/Texts/StyledText";
import SettingsItem from "../components/settings/SettingsItem";

const SettingsScreen = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === "dark");
  const toggleTheme = () => {
    updateTheme();
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <ScrollView
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <StyledText style={{ color: activeColors.accent }} bold>
        User
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="Name">
          <StyledText>Richard Barnes</StyledText>
        </SettingsItem>
        <SettingsItem label="Joined On">
          <StyledText>02/12/2022</StyledText>
        </SettingsItem>
      </View>

      <StyledText style={{ color: activeColors.accent }} bold>
        Theme Switch
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="Dark Mode">
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
        </SettingsItem>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 25,
  },
  section: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
  },
});

export default SettingsScreen;
