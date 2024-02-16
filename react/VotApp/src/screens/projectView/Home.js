import "react-native-gesture-handler";
import React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralProjectsView from "./GeneralProjectsView";
import ProjectDetails from "./ProjectDetailsView";
import ProjectValoration from "./ProjectValoration";
import ScannerIDCard from "./ScannerIDCard";
import ConfirmationScreen from "./ConfirmationScreen";
import NIEManual from "./NIEManual";
import Terms from "../settingsView/Terms";
import { ScreensProvider } from "./projectViewScreensContext";

const Stack = createStackNavigator();
const Home = () => {
    return (
        <ScreensProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="GeneralView"
                    component={GeneralProjectsView}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProjectDetails"
                    component={ProjectDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProjectValoration"
                    component={ProjectValoration}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ScannerIDCard"
                    component={ScannerIDCard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ConfirmationScreen"
                    component={ConfirmationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NIEManual"
                    component={NIEManual}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Terms"
                    component={Terms}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </ScreensProvider>

    );
};

export default Home;
