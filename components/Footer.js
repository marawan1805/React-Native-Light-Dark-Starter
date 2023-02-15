import React, { useContext } from "react";
import { Button, View } from "react-native";
import Circle from "../screens/Circle";
import SettingsScreen from "../screens/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../config/theme";
import News from "../screens/News";
import { ThemeContext } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

export default function Footer() {
  //TODO: Add Settings Screen
  //TODO: Add Profile Screen
  //TODO: Add Shop Screen
  //TODO: Add Rewards Screen
  //TODO: Add Dark/Light mode Switch
  const { theme, updateTheme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: activeColors.secondary,
        },
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Circle") {
            return <FontAwesome5 name="circle-notch" size={24} color={color} />;
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          } else if (route.name === "News") {
            iconName = focused ? "newspaper" : "newspaper-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: activeColors.accent,
        tabBarInactiveTintColor: activeColors.tertiary,
        tabBarStyle: {
          backgroundColor: activeColors.secondary,
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          paddingLeft: 10,
          fontSize: 24,
        },
        headerStyle: {
          backgroundColor: activeColors.secondary,
        },
        headerTintColor: activeColors.tint,
      })}
    >
      {/* <Tab.Screen name="Logout" component={Logout} /> */}
      <Tab.Screen name="News" component={News} />
      <Tab.Screen
        options={{
          headerShown: false, // change this to `false`
        }}
        name="Circle"
        component={Circle}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
