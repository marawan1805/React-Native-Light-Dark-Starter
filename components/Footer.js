import React, { useContext } from "react";
import Circle from "../screens/Circle";
import SettingsScreen from "../screens/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import Rewards from "../screens/Shop";
import Shop from "../screens/Shop";

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
          } else if (route.name === "Shop") {
            iconName = focused ? "cart" : "cart-outline";
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
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Circle"
        component={Circle}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
