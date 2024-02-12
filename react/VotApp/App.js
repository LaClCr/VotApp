// App.js
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/projectView/Home";
import CameraQR from "./src/screens/scannerQR/CameraQR";
import CodeAccess from "./src/screens/projectCreation/CodeAccess";
import ProjectCreation from "./src/screens/projectCreation/ProjectCreation";
import Settings from "./src/screens/settings/Settings";
import "./src/screens/i18n"; // Importa la configuración de i18next
import { useTranslation } from "react-i18next";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function CreateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CodeAccess" component={CodeAccess} />
      <Stack.Screen name="ProjectCreation" component={ProjectCreation} />
    </Stack.Navigator>
  );
}

export default function App() {
  const { t } = useTranslation();
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
              tabBarLabel: t("Inicio"),
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="CameraQR"
            component={CameraQR}
            options={{
              tabBarLabel: t("Scanner"),
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="camera" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Create"
            component={CreateStack}
            options={{
              tabBarLabel: t("Crear"),
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="plus-box"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarLabel: t("Configuración"),
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
