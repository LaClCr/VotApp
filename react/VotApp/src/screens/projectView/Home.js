import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import DropdownComponent from "../../components/projectView/DropdownComponent";
import ProjectCard from "../../components/projectView/ProjectCard";
import Image1 from "../../assets/favicon.png";

const Home = () => {
    // Datos de ejemplo para las tarjetas de proyecto
    const projectData = [
        {
            id: 1,
            name: "Proyecto A",
            degree: "Grado 1",
            logo: Image1,
        },
        {
            id: 2,
            name: "Proyecto B",
            degree: "Grado 2",
            logo: Image1,
        },
        {
            id: 3,
            name: "Proyecto C",
            degree: "Grado 3",
            logo: Image1,
        },
        {
            id: 4,
            name: "Proyecto D",
            degree: "Grado 4",
            logo: Image1,
        },
        {
            id: 5,
            name: "Proyecto E",
            degree: "Grado 5",
            logo: Image1,
        },
        {
            id: 6,
            name: "Proyecto F",
            degree: "Grado 6",
            logo: Image1,
        },
        {
            id: 7,
            name: "Proyecto G",
            degree: "Grado 7",
            logo: Image1,
        },
    ];

    return (
        <View style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <Text style={{ textAlign: "center" }}>LOGO</Text>
            </View>
            <View style={styles.filterContainer}>
                <DropdownComponent></DropdownComponent>
            </View>
            <View style={styles.projectCardContainer}>
                <FlatList
                    data={projectData}
                    renderItem={({ item }) => (
                        <ProjectCard
                            name={item.name}
                            degree={item.degree}
                            logo={item.logo}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Dos tarjetas por fila
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        margin: 10,
    },
    logoContainer: {
        flex: 0.15,
    },
    filterContainer: {
        flex: 0.15,
        backgroundColor: "#C02830",
        borderRadius: 8,
    },
    projectCardContainer: {
        flex: 0.8,
        backgroundColor: "grey",
    },
});

export default Home;
