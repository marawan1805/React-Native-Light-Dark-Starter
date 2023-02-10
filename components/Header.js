import * as React from "react";
import { Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Circle from "../screens/Circle";
import SettingsScreen from "../screens/Settings";

function Logout({ navigation }) {
  return (
    //TODO: Add Modal: are you sure you wanna logout?
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.navigate("Login")} title="Logout" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function Header() {
  //TODO: Add Settings Screen
  //TODO: Add Profile Screen
  //TODO: Add Shop Screen
  //TODO: Add Rewards Screen
  //TODO: Add Dark/Light mode Switch

  return (
    <Drawer.Navigator useLegacyImplementation initialRouteName="Home">
      <Drawer.Screen name="Circle" component={Circle} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}
