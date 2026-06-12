import React from "react";
import {
  NavigationContainer
} from "@react-navigation/native";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import BookListScreen from "../screens/BookListScreen";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import BookFormScreen from "../screens/BookFormScreen";

const Stack =
  createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Books">

        <Stack.Screen
          name="Books"
          component={BookListScreen}
          options={{
            title: "Knjige"
          }}
        />

        <Stack.Screen
          name="Details"
          component={BookDetailsScreen}
          options={{
            title: "Detalji"
          }}
        />

        <Stack.Screen
          name="Form"
          component={BookFormScreen}
          options={{
            title: "Nova knjiga"
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}