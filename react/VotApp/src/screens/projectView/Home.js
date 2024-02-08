import "react-native-gesture-handler";
import React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GeneralProjectsView from "./GeneralProjectsView";
import ProjectDetails from "./ProjectDetailsView";

const Stack = createStackNavigator();
const Home = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GeneralView"
                component={GeneralProjectsView}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
        </Stack.Navigator>
    );
};

export default Home;
