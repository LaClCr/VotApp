import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProjectCreation from "./ProjectCreation";
import CodeAccess from "./CodeAccess";
import { ScreensProvider } from "./projectCreationScreensContext";

const Stack = createStackNavigator();
const HomeProjCreation = () => {
    return (
        <ScreensProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="CodeAccess"
                    component={CodeAccess}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProjectCreation"
                    component={ProjectCreation}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </ScreensProvider>

    );
};

export default HomeProjCreation;
