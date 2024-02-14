import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Keyboard } from "react-native";
import { Searchbar, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropdownComponent from "../../components/projectView/DropdownComponent";
import FloridaHeader from "../../components/FloridaHeader";
import ScreensContext from "./projectViewScreensContext";
import { getProject, getProjectFilter } from "../../scripts/getProject";
import { getDegree } from "../../scripts/getDegree";

const GeneralView = ({ navigation }) => {
    const { projectName, setProjectName } = useContext(ScreensContext);
    const [degreeData, setDegreeData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("all");

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
        fetchData();
    }, [selectedDegree]); // Esto actualizará la lista de proyectos cuando cambies la selección en la dropdown list

    const fetchData = async () => {
        try {
            let projects = [];
            if (searchQuery.trim() !== '') {
                projects = await getProject(searchQuery.trim());
                if (projects) {
                    setProjectData(projects); // Actualiza el estado con el proyecto por el nombre de la searchbar
                } else {
                    setProjectData([]);
                    alert("No se ha encontrado ningún proyecto con el nombre: " + searchQuery.trim());
                }
            } else {
                projects = await getProjectFilter(selectedDegree);
                setProjectData(projects); // Actualiza el estado con los proyectos filtrados
            }
        } catch (error) {
            console.error("Error al obtener proyectos", error);
        }
    };


    const handleSearch = () => {
        // Oculta el teclado
        Keyboard.dismiss();
        // Realiza la búsqueda
        fetchData();
    };

    const handleOnPress = (item) => {
        setProjectName(item.name);
        console.log("URI: " + item.picture);
        navigation.navigate("ProjectDetails");
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
                    onSubmitEditing={handleSearch}
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
                    <TouchableOpacity onPress={() => handleOnPress(item)} style={styles.cardTouch}>
                        <Card style={styles.card}>
                            <Card.Title title={item.name} subtitle={item.degree} titleStyle={styles.cardTitle} subtitleStyle={styles.cardSubtitle} />
                            <Card.Cover source={{ uri: item.picture }} style={styles.cardImage} />
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
        alignItems: 'center',
        marginLeft: 15
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
        elevation: 5,
        shadowColor: "#000",
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
