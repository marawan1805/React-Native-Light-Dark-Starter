import { View, Text } from "react-native";
import React, { useContext } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

const GroupChat = () => {
  const theme = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <View>
      <Text>GroupChat</Text>
    </View>
  );
};

export default GroupChat;
