import React, { useContext } from "react";
import SettingsScreen from "../screens/Settings";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/core";
import Basket from "../screens/Basket";
import HomeScreen from "../screens/HomeScreen";
import Wishlist from "../screens/Wishlist";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import Shop from "../screens/Shop";
import Product from "../screens/Product";
import Orders from "../screens/Orders";
import SearchScreen from "../screens/SearchScreen";
import Checkout from "../screens/Checkout";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const navigation = useNavigation();
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <Stack.Navigator
      screenOptions={{
        animationTypeForReplace: "push",
        presentation: "modal",
        headerStyle: {
          backgroundColor: colors.light.primary,
        },
        headerTintColor: colors.light.tint,
        headerTitleStyle: {
          fontSize: 15,
          marginLeft: -10,
        },
        headerRight: () => (
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
                name="search-outline"
                size={25}
                color={colors.light.tint}
                onPress={() => navigation.navigate("SearchScreen")}
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
        ),
      }}
      initialRouteName="root"
    >
      <Stack.Screen
        name="root"
        component={MyTabs}
        options={{
          title: "Indic Fusion",
          headerShown: false,
        }}
      />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={({ route }) => ({
          title: route.params.title ? route.params.title : "Shop",
        })}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({ route }) => ({
          title: route.params.title ? route.params.title : "Product",
        })}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  const navigation = useNavigation();
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerLeft: () => (
          <View
            style={{
              alignItems: "center",
              marginHorizontal: 15,
              backgroundColor: colors.light.secondary,
              borderRadius: 50,
              paddingVertical: 6,
              paddingHorizontal: 7,
            }}
          >
            <Ionicons
              name="search-outline"
              size={25}
              color={colors.light.tint}
              onPress={() => navigation.navigate("SearchScreen")}
            />
          </View>
        ),
        headerRight: () => (
          <View
            style={{
              alignItems: "center",
              marginHorizontal: 15,
              backgroundColor: colors.light.secondary,
              borderRadius: 50,
              paddingVertical: 6,
              paddingHorizontal: 7,
            }}
          >
            <Ionicons
              name="notifications-outline"
              size={25}
              color={colors.light.tint}
              onPress={() => navigation.navigate("Notifications")}
            />
          </View>
        ),
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: colors.light.primary,
        },
        headerTintColor: colors.light.tint,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={22} color={color} />;
          } else if (route.name === "Basket") {
            iconName = focused ? "basket" : "basket-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Orders") {
            iconName = focused ? "bookmarks" : "bookmarks-outline";
            return <Ionicons name={iconName} size={20} color={color} />;
          } else if (route.name === "Wishlist") {
            iconName = focused ? "heart" : "heart-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={22} color={color} />;
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: colors.light.red,
        tabBarInactiveTintColor: colors.light.tertiary,
        tabBarStyle: {
          backgroundColor: colors.light.primary,
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0.5,
          borderTopColor: colors.light.secondary,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Indic Fusion" }}
      />
      <Tab.Screen
        name="Basket"
        component={Basket}
        options={{ headerTitle: "Basket" }}
      />
      <Tab.Screen name="Orders" component={Orders} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 40,
    backgroundColor: "#F1F5F9",
    width: 200,
    height: 40,
    marginLeft: 28,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
