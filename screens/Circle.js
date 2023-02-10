import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GroupChat from "./GroupChat";
import GroupMeet from "./GroupMeet";
import { Ionicons, Entypo } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Circle = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          if (route.name === "Chat") {
            iconName = focused
              ? "ios-chatbubble-sharp"
              : "ios-chatbubble-outline";
            iconColor = focused ? "blue" : "gray";
          } else if (route.name === "Meet") {
            iconName = focused ? "people-sharp" : "people-outline";
            iconColor = focused ? "blue" : "gray";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={iconColor} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Chat" component={GroupChat} />
      <Tab.Screen name="Meet" component={GroupMeet} />
    </Tab.Navigator>
  );
};

export default Circle;
