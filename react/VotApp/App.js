import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import ProjectCreation from "./src/screens/projectCreation/ProjectCreation";
import Home from "./src/screens/projectView/Home";
import CameraQR from "./src/screens/scannerQR/CameraQR";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
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
                                <MaterialCommunityIcons
                                    name="home"
                                    color={color}
                                    size={26}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="CameraQR"
                        component={CameraQR}
                        options={{
                            tabBarLabel: "Cámara",
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons
                                    name="camera"
                                    color={color}
                                    size={26}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Create"
                        component={ProjectCreation}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
