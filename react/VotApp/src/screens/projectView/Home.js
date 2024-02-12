import "react-native-gesture-handler";
import React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralProjectsView from "./GeneralProjectsView";
import ProjectDetails from "./ProjectDetailsView";
import ProjectValoration from "./ProjectValoration";
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
            </Stack.Navigator>
        </ScreensProvider>

    );
};

export default Home;
