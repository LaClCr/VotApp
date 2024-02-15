import React  from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
    NavigationContainer,
} from "@react-navigation/native";

import Home from "./src/screens/projectView/Home";
import HomeProjCreation from "./src/screens/projectCreation/HomeProjCreation";
import HomeSettings from "./src/screens/settingsView/HomeSettings";



const Tab = createMaterialBottomTabNavigator();

const App = () => {

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
                            tabBarLabel: "Proyectos",
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
                            tabBarLabel: "Crear",
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
                            tabBarLabel: "Configuración",
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