import { Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import { storeData, getData } from "./config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";
import RegisterScreen from "./screens/RegisterScreen";

//Theme context is used to update the
//theme of the app. It will be used in
//all the screens of the app.
import { ThemeContext } from "./context/ThemeContext";

//creating simple splash screen
SplashScreen.preventAutoHideAsync();

//creating stack navigator which will contain
//login, register and footer screens
//footer is the bottom tab navigator which
//includes all the other screens.
const Stack = createStackNavigator();

const App = () => {
  //Appearance.getColorScheme() will return
  //the current theme of the device and save
  //it in theme state.
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });

  //updateTheme function takes newTheme as a parameter
  //if newTheme is not passed then it will toggle the theme
  //and store the new theme in async storage
  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeData("homeTheme", newTheme);
  };

  //fetchStoredTheme function will fetch the theme
  //from async storage and update the theme of the app
  //async storage is used to store the last theme that the user chose
  //so that the theme will be the same when the user opens the app next time
  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("homeTheme");
      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }) {
      alert(message);
    } finally {
      //hiding the splash screen after 1 second
      await setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  };

  //fetchStoredTheme function will be called when the app starts
  useEffect(() => {
    fetchStoredTheme();

    //if the theme of the device changes then
    //updateTheme function will be called using
    //Appearance.addChangeListener method
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme();
      setTheme({ mode: colorScheme });
    });
  }, []);

  return (
    //we will pass the theme and updateTheme function
    //to the ThemeContext.Provider so that it can be
    //used in all the screens of the app.
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Footer"
            component={Footer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;
