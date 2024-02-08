import React from "react";
import { View, StyleSheet } from "react-native";
import FloridaHeader from "../../components/FloridaHeader";
import ProjectDetailsCard from "../../components/projectView/ProjectDetailsCard";

const ProjectDetails = ({ name }) => {
    //get information of the project from the database with the name
    //const getInfo = (name) => "info";

    //Este es un ejemplo de un objeto que contiene la información de un proyecto
    const projectExample = {
        name: "ZEODOS",
        qualification: "D.A.M",
        rating: 85,
        description:
            "Calculadora de huella de carbono para contribuir a la descarbonización.",
        participants: ["Alba Marí", "Paula Roig", "Rubén"],
    };
    return (
        <View style={styles.generalContainer}>
            <FloridaHeader />
            <View style={styles.cardContainer}>
                <ProjectDetailsCard project={projectExample} />
            </View>
        </View>
    );
};

export default ProjectDetails;
const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        margin: 10,
    },
    cardContainer: {
        flex: 0.8,
    },
});
