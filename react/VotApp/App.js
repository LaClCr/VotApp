import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
// Importa tus pantallas
import Home from "./src/screens/projectView/Home";
import CameraQR from "./src/screens/scannerQR/CameraQR";
import CodeAccess from "./src/screens/projectCreation/CodeAccess"; // Usamos CodeAccess para la validación
import ProjectCreation from "./src/screens/projectCreation/ProjectCreation";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Componente intermedio que decide qué mostrar en el tab "Create"
  function CreateStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CodeAccess" component={CodeAccess} />
        <Stack.Screen name="ProjectCreation" component={ProjectCreation} />
      </Stack.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#3B0809"
          inactiveColor="#f0edf6"
          barStyle={{ backgroundColor: "#C02830" }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="CameraQR"
            component={CameraQR}
            options={{
              tabBarLabel: "Cámara",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="camera" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Create"
            component={CreateStack} // Cambiado de CreateScreen a CreateStack
            options={{
              tabBarLabel: "Create",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="plus-box"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
