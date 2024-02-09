import React from "react";
import { View, StyleSheet } from "react-native";
import FloridaHeader from "../../components/FloridaHeader";
import ProjectDetailsCard from "../../components/projectView/ProjectDetailsCard";

const ProjectDetails = ({ name }) => {
    //get information of the project from the database with the name
    //const getInfo = (name) => "info";

    //Este es un ejemplo de un objeto que contiene la información de un proyecto
    const projectExample = {

        name: "Proyecto Innovación Educativa",
        degree: "Master's Thesis",
        description: "Este proyecto busca mejorar la enseñanza de las matemáticas mediante el uso de tecnologías interactivas.",
        picture: "imagen1.jpg",
        creator: "123456789A",
        teamMembers: [
            {
                name: "María García"
            },
            {
                name: "Juan Pérez"
            },
            {
                name: "Laura Martínez"
            }
        ],
        valorations: [
            {
                nie: "23320894K",
                originality: 8,
                innovation: 9,
                ods: 7
            },
            {
                nie: "123456789B",
                originality: 7,
                innovation: 8,
                ods: 6
            }
        ]

    };
    return (
        <View style={styles.generalContainer}>
            <View style={styles.logoContainer}>
            <FloridaHeader />
            </View>
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
        backgroundColor: 'white',
    },
    logoContainer: {
        flex: 0.15,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        paddingTop: 60,
    },
    cardContainer: {
        flex: 1,
    },
});
