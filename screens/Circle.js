import { View, Text, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import GroupChat from "./GroupChat";
import GroupMeet from "./GroupMeet";
import SettingsScreen from "./Settings";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();
function Logout({ navigation }) {
  return (
    //TODO: Add Modal: are you sure you wanna logout?
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.navigate("Login")} title="Logout" />
    </View>
  );
}
const Circle = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: activeColors.primary,
          width: 240,
        },
        headerStyle: {
          backgroundColor: activeColors.primary,
        },

        headerTitleStyle: {
          color: "grey",
        },
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
          drawerInactiveTintColor: "grey",

          drawerIcon: ({ focused }) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              size={24}
              color={focused ? "blue" : "grey"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Meet"
        component={GroupMeet}
        options={{
          drawerInactiveTintColor: "grey",
          drawerIcon: ({ focused }) => (
            <Ionicons
              name="videocam-outline"
              size={24}
              color={focused ? "blue" : "grey"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Circle;
