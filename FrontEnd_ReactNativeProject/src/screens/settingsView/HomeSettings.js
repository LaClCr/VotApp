import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "./SettingsScreen";
import DeleteInputData from "./DeleteInputData";
import Terms from "./Terms";
import ConfirmationDeleteProject from "./ConfirmationDeleteProject";

const Stack = createStackNavigator();

const HomeSettings = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DeleteInputData"
                component={DeleteInputData}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ConfirmationDeleteProject"
                component={ConfirmationDeleteProject}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Terms"
                component={Terms}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default HomeSettings;
