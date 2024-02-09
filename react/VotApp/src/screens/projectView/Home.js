import "react-native-gesture-handler";
import React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralProjectsView from "./GeneralProjectsView";
import ProjectDetails from "./ProjectDetailsView";
import ProjectValoration from "./ProjectValoration";

const Stack = createStackNavigator();
const Home = () => {
    return (
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
    );
};

export default Home;
