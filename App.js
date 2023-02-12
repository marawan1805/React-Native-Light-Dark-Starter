import "react-native-gesture-handler";
import { View, SafeAreaView, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Footer from "./components/Footer";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import { ThemeContext } from "./context/ThemeContext";

const Stack = createStackNavigator();

const App = () => {
  const [theme, setTheme] = useState({ mode: "dark" });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Home"
            component={Footer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;
