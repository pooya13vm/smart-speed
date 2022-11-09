import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";

//components
import Register from "../screens/Register";
import Home from "../screens/Home";
import Parkur from "../screens/Parkur";
import Katilimci from "../screens/Katilimci";
import TurnuvaBA from "../screens/TurnuvaBA";
import Gecmis from "../screens/Gecmis";
import Sarj from "../screens/Sarj";
import TurnuvaList from "../screens/TurnuvaList";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="TurnuvaList" component={TurnuvaList} />
        <Stack.Screen name="Parkur" component={Parkur} />
        <Stack.Screen name="Katilimci" component={Katilimci} />
        <Stack.Screen name="TurnuvaBA" component={TurnuvaBA} />
        <Stack.Screen name="Gecmis" component={Gecmis} />
        <Stack.Screen name="Sarj" component={Sarj} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
};

export default AppNavigation;
