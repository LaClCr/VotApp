import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./src/screens/projectView/Home";
import HomeProjCreation from "./src/screens/projectCreation/HomeProjCreation";
import HomeSettings from "./src/screens/settingsView/HomeSettings";
import "./src/screens/i18n"; // Importa la configuración de i18next
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
    const { t } = useTranslation();
    return (
        <SafeAreaProvider>
            <StatusBar backgroundColor="#C02830" barStyle="light-content" />
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
                            tabBarLabel: t("Proyectos"),
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons
                                    name="home"
                                    color={color}
                                    size={26}
                                />
                            ),
                        }}
                    />

                    <Tab.Screen
                        name="Create"
                        component={HomeProjCreation}
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
                        component={HomeSettings}
                        options={{
                            tabBarLabel: t("Configuración"),
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons
                                    name="cog"
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
};

export default App;
