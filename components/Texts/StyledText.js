import { Text } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../config/theme";

//receives font size and weight as input

const StyledText = ({ children, small, big, style, bold, ...props }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <Text
      style={[
        {
          color: activeColors.accent,
          fontSize: small ? 12 : big ? 24 : 16,
          fontWeight: bold || big ? "bold" : "normal",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;
