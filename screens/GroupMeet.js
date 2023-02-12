import { View, Text } from "react-native";
import React, { useContext } from "react";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

const GroupMeet = () => {
  const theme = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <View>
      <Text>GroupMeet</Text>
    </View>
  );
};

export default GroupMeet;
