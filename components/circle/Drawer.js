import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import React, { useContext } from "react";
import GroupChat from "../../screens/circle/GroupChat";
import GroupMeet from "../../screens/circle/GroupMeet";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { Image } from "react-native";

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
            <ImageBackground
              source={require("../../assets/images/menu-bg.jpg")}
              style={{ padding: 20 }}
            >
              <Image
                source={require("../../assets/images/user-profile.png")}
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 40,
                  marginBottom: 10,
                }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  marginBottom: 5,
                }}
              >
                John Doe
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#fff",
                    marginRight: 5,
                  }}
                >
                  280 Coins
                </Text>
                <FontAwesome5 name="coins" size={14} color="#fff" />
              </View>
            </ImageBackground>
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
