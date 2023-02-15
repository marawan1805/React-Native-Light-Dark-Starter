import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const GroupChat = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <View style={[{ backgroundColor: activeColors.primary }, styles.container]}>
      <Text>GroupChat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GroupChat;
