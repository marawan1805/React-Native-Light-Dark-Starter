import React, { useContext } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  value,
}) {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholderTextColor={colors.light.text}
          placeholder={label}
          keyboardAppearance={colors.light.primary}
          keyboardType={keyboardType}
          style={{ flex: 1, paddingVertical: 0, color: colors.light.tint }}
          secureTextEntry={true}
          onChangeText={onChangeText}
          value={value}
          autoCapitalize="none"
          aria-valuemin={6}
        />
      ) : (
        <TextInput
          placeholderTextColor={colors.light.text}
          placeholder={label}
          keyboardAppearance={colors.light.primary}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          style={{ flex: 1, paddingVertical: 0, color: colors.light.tint }}
          autoCapitalize="none"
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: colors.light.accent, fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
