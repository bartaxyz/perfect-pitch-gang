import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
  DefaultTheme,
} from "@react-navigation/native";

import { Home } from "./src/screens/Home";
import { Intro } from "./src/screens/Intro";
import { rgba } from "polished";

const RootTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "white",
  },
};

export type RootNavigatorParams = {
  Intro: undefined;
  Home: undefined;
};

export type RootNavigationProp<T extends keyof RootNavigatorParams> =
  NavigationProp<RootNavigatorParams, T>;

export type RootRouteProp<T extends keyof RootNavigatorParams> = RouteProp<
  RootNavigatorParams,
  T
>;

const Stack = createStackNavigator<RootNavigatorParams>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <React.Fragment>
      <NavigationContainer
        theme={RootTheme}
        // linking={{
        //   prefixes: ["https://bartaxyz.github.io/perfect-pitch-gang"],
        //   config: {
        //     screens: {
        //       Intro: "/",
        //       Home: "/home",
        //     },
        //   },
        // }}
      >
        <Stack.Navigator
          headerMode="none"
          screenOptions={{
            cardStyle: {
              backgroundColor: rgba("#F1B929", 0.1),
            },
            headerStyle: {
              borderWidth: 0,
              elevation: 0,
              backgroundColor: "transparent",
            },
            headerTitle: "",
          }}
        >
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="dark" />
    </React.Fragment>
  );
}
