import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Searchbar, Card, Text, Drawer } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Asegúrate de importar desde @expo/vector-icons si estás utilizando Expo
import DropdownComponent from "../../components/projectView/DropdownComponent";
import FloridaHeader from "../../components/FloridaHeader";
import Image1 from "../../assets/ProyectoImagePrueba.jpg";
import { getProjectFilter } from "../../scripts/getProject";
import { getDegree } from "../../scripts/getDegree";

const GeneralView = ({ navigation }) => {

    const [degreeData, setDegreeData] = useState([]); // Estado para almacenar los datos de los grados
    const [projectData, setProjectData] = useState([]); // Estado para almacenar los datos de los proyectos
    const [searchQuery, setSearchQuery] = useState(""); // Estado para la consulta de búsqueda
    const [selectedDegree, setSelectedDegree] = useState("all"); // Estado para el filtro de grado seleccionado

    useEffect(() => {
        const fetchDegrees = async () => {
            try {
                const degrees = await getDegree("all");
                let degreeDropdownData = degrees.map(degree => ({
                    label: degree.abbreviation,
                    value: degree.abbreviation
                }));
                degreeDropdownData.sort((a, b) => a.label.localeCompare(b.label));
                degreeDropdownData.unshift({ label: "Todos", value: "all" });
                setDegreeData(degreeDropdownData);
            } catch (error) {
                console.error("Error al obtener grados", error);
            }
        };

        fetchDegrees();
    }, []);


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProjectFilter(selectedDegree);
                setProjectData(projects);
            } catch (error) {
                console.error("Error al obtener proyectos", error);
            }
        };

        fetchProjects();
    }, [selectedDegree]);

    const handleOnPress = (name) => {
        navigation.navigate("ProjectDetails", { name });
    };


    return (
        <View style={styles.generalContainer}>
            <FloridaHeader />
            <View style={styles.searchAndFilterContainer}>
                <Searchbar
                    placeholder="Buscar..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchbar}
                    inputStyle={styles.searchbarInput}
                    iconColor={"#C02830"}
                    clearIcon={() => (
                        <MaterialCommunityIcons name="close-circle" size={24} color="#C02830" />
                    )}
                />
                <DropdownComponent
                    data={degreeData}
                    selectedValue={selectedDegree}
                    onChange={(value) => setSelectedDegree(value)}
                />
            </View>
            <FlatList
                style={{ width: '100%' }}
                data={projectData}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleOnPress(item.name)} style={styles.cardTouch}>
                        <Card style={styles.card}>
                            <Card.Title title={item.name} subtitle={item.degree} titleStyle={styles.cardTitle} subtitleStyle={styles.cardSubtitle} />
                            <Card.Cover source={{ uri: null}} style={styles.cardImage} />
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.listContentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        paddingTop: 60,
    },
    searchAndFilterContainer: {
        flexDirection: "row",
        backgroundColor: '#C02830',
        width: '130%',
        paddingHorizontal: 40,
        alignItems: 'center'
    },
    searchbar: {
        height: 60,
        flex: 1,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    searchbarInput: {
        fontSize: 16,
    },
    listContentContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    cardTouch: {
        marginBottom: 30,
    },
    card: {
        borderRadius: 8,
        elevation: 5, // Sombra para Android
        shadowColor: "#000", // Sombra para iOS
        backgroundColor: '#B58933',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardTitle: {
        fontSize: 18,
        color: "#000",
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#fff",
    },
    cardImage: {
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
});

export default GeneralView;
