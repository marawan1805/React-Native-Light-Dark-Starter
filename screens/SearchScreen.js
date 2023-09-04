import React, { useContext, useState, useRef, useEffect } from "react";
import { View, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const searchProduct = () => {
    setSearchText("");
    navigation.navigate("Shop", { query: searchText, title: searchText });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.light.primary,
        paddingTop: 40,
      }}
    >
      <View
        style={{
          height: 50,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 0.5,
          borderColor: colors.light.secondary,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: colors.light.primary,
          }}
        >
          <Ionicons
            name="arrow-back"
            size={25}
            color={colors.light.tint}
            onPress={() => navigation.goBack()}
            style={{
              marginLeft: 15,
            }}
          />
          <TextInput
            style={{
              color: colors.light.text,
              fontSize: 16,
              width: 200,
              height: 40,
              paddingHorizontal: 10,
            }}
            ref={inputRef}
            value={searchText}
            onChangeText={(e) => setSearchText(e)}
            onSubmitEditing={() => searchProduct()}
            placeholder="Serach products..."
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: colors.light.primary,
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginRight: 15,
              backgroundColor: colors.light.secondary,
              borderRadius: 50,
              paddingVertical: 6,
              paddingHorizontal: 7,
            }}
          >
            <Ionicons
              name="heart-outline"
              size={25}
              color={colors.light.tint}
              onPress={() => navigation.navigate("Wishlist")}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              marginRight: 15,
              backgroundColor: colors.light.secondary,
              borderRadius: 50,
              paddingVertical: 6,
              paddingHorizontal: 7,
            }}
          >
            <Ionicons
              name="basket-outline"
              size={25}
              color={colors.light.tint}
              onPress={() => navigation.navigate("Basket")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchScreen;
