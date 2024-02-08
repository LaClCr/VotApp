import React from "react";
import { View, Text } from "react-native";

// eslint-disable-next-line react/prop-types
const ProjectDetails = ({ name }) => {
    //get information of the project from the database with the name
    //const getInfo = (name) => "info";
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Text>Nombre del proyecto: {name}</Text>
        </View>
    );
};

export default ProjectDetails;
