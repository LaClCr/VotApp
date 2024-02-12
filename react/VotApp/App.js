import React, { useContext } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
    PaperProvider,
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme,
} from "react-native-paper";
import merge from "deepmerge";
import { ThemeProvider, ThemeContext } from "./src/context/ThemeContext";
// Importa tus pantallas
import Home from "./src/screens/projectView/Home";
import CameraQR from "./src/screens/scannerQR/CameraQR";
import CodeAccess from "./src/screens/projectCreation/CodeAccess"; // Usamos CodeAccess para la validación
import ProjectCreation from "./src/screens/projectCreation/ProjectCreation";
import Settings from "./src/screens/settings/Settings";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
    const { isDarkMode } = useContext(ThemeContext);

    // Componente intermedio que decide qué mostrar en el tab "Create"
    const CreateStack = () => {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="CodeAccess" component={CodeAccess} />
                <Stack.Screen
                    name="ProjectCreation"
                    component={ProjectCreation}
                />
            </Stack.Navigator>
        );
    };

    const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer theme={theme}>
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
                        <Tab.Screen
                            name="Settings"
                            component={Settings}
                            options={{
                                tabBarLabel: "Settings",
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
            </PaperProvider>
        </SafeAreaProvider>
    );
};

export default function Main() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
}
