import { Appearance, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import { storeData, getData } from "./config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";

import Navigation from "./components/Navigation";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import { ThemeContext } from "./context/ThemeContext";
import { auth } from "./config/firebase";
import { colors } from "./config/theme";

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });
  let activeColors = colors[theme.mode];

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "light";
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeData("homeTheme", newTheme);
  };

  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("homeTheme");
      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }) {
      alert(message);
    } finally {
      setTimeout(() => SplashScreen.hideAsync(), 500);
    }
  };

  useEffect(() => {
    fetchStoredTheme();

    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme();
      setTheme({ mode: colorScheme });
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        // console.log("Error");
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors.light.pink}
        style={{
          backgroundColor: colors.light.primary,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Navigation">
          {user ? (
            <Stack.Screen
              name="Navigation"
              component={Navigation}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Group>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Register"
                component={RegisterScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={LoginScreen}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;
