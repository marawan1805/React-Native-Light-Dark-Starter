import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import GroupChat from "../../screens/circle/GroupChat";
import GroupMeet from "../../screens/circle/GroupMeet";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const Drawer = createDrawerNavigator();

const Hamburger = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: activeColors.secondary,
          width: 240,
        },
        headerStyle: {
          backgroundColor: activeColors.secondary,
        },

        headerTitleStyle: {
          color: activeColors.tint,
        },
        headerTintColor: activeColors.accent,
      }}
      useLegacyImplementation
      initialRouteName="Home"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              icon={() => (
                <Ionicons name="log-out-outline" size={24} color="red" />
              )}
              label="Logout"
              inactiveTintColor="red"
              onPress={() => props.navigation.navigate("Login")}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Chat"
        component={GroupChat}
        options={{
          drawerInactiveTintColor: activeColors.tertiary,
          drawerActiveTintColor: activeColors.accent,
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color={focused ? activeColors.accent : activeColors.tertiary}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Meet"
        component={GroupMeet}
        options={{
          drawerInactiveTintColor: activeColors.tertiary,
          drawerActiveTintColor: activeColors.accent,
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="videocam-outline"
              size={24}
              color={focused ? activeColors.accent : activeColors.tertiary}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Hamburger;
