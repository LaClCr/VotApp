import React, { useState } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import DropdownComponent from "../../components/projectView/DropdownComponent";
import ProjectCard from "../../components/projectView/ProjectCard";
import FloridaLogo from "../../assets/florida.jpg";
import Image1 from "../../assets/ProyectoImagePrueba.jpg";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons"; // Import the MaterialCommunityIcons component

const Home = () => {
    // Datos de ejemplo para las tarjetas de proyecto
    const projectData = [
        {
            id: 1,
            name: "HomeAPP",
            degree: "DAM",
            logo: Image1,
        },
        {
            id: 2,
            name: "Votapp",
            degree: "ASIR",
            logo: Image1,
        },
        {
            id: 3,
            name: "Proyecto C",
            degree: "DAW",
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
            degree: "DAM",
            logo: Image1,
        },
        {
            id: 7,
            name: "Proyecto G",
            degree: "Grado 7",
            logo: Image1,
        },
    ];
    //data será = a un useState de la BD con los grados que se presentan
    const exampleDropdownData = [
        { label: "DAM", value: "DAM" },
        { label: "DAW", value: "DAW" },
        { label: "ASIR", value: "ASIR" },
        { label: "Item 4", value: "4" },
        { label: "Item 5", value: "5" },
        { label: "Item 6", value: "6" },
        { label: "Item 7", value: "7" },
        { label: "Item 8", value: "8" },
    ];
    const [searchQuery, setSearchQuery] = useState(null);

    return (
        <View style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <Image source={FloridaLogo} style={styles.logo} />
            </View>
            <View style={styles.filterContainer}>
                <Searchbar
                    onIconPress={() => alert("Realizar búsqueda")} // Acción al tocar el icono de búsqueda
                    style={{
                        flex: 1,
                        height: 60,
                        margin: 10,
                        backgroundColor: "white",
                        borderColor: "white", // Color del borde rojo
                    }}
                    placeholderTextColor="black"
                    placeholder="Search..."
                    onChangeText={(text) => setSearchQuery(text)}
                    value={searchQuery}
                    clearIcon={() => (
                        <MaterialCommunityIcons name="close-circle" size={24} />
                    )}
                />

                <DropdownComponent
                    data={exampleDropdownData}
                ></DropdownComponent>
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
        marginTop: 10,
    },
    logo: {
        width: 400, // Ajusta el ancho según tus necesidades
        height: 100, // Ajusta la altura según tus necesidades
    },
    filterContainer: {
        flex: 0.15,
        marginTop: 10,
        flexDirection: "row",
        backgroundColor: "#C02830",
        borderRadius: 8,
    },
    projectCardContainer: {
        flex: 0.8,
    },
});

export default Home;
