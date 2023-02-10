import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GroupChat from "./GroupChat";
import GroupMeet from "./GroupMeet";

const Tab = createBottomTabNavigator();

const Circle = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Group Chat" component={GroupChat} />
      <Tab.Screen name="Group Meet" component={GroupMeet} />
    </Tab.Navigator>
  );
};

export default Circle;
