import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FloridaHeader from "../../components/FloridaHeader";
import { getDegree } from "../../scripts/getDegree";
import { getProject } from "../../scripts/getProject";
import { deleteProject } from "../../scripts/deleteProject";

const DeleteInputData = () => {

    const navigation = useNavigation();
    const [code, setCode] = useState('');
    const [nie, setNie] = useState('');
    const [degreeData, setDegreeData] = useState([]);
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        fetchDegrees();
        fetchProjects();
    }, []);

    const fetchDegrees = async () => {
        try {
            const degrees = await getDegree("all");
            setDegreeData(degrees);
        } catch (error) {
            console.error("Error al obtener grados", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const projects = await getProject("all");
            setProjectData(projects);
            if (projects.length === 0) {
                alert("No se ha encontrado ningún proyecto.");
            }
        } catch (error) {
            console.error("Error al obtener proyectos", error);
        }
    };

    const handleButtonPress = async () => {
        let equalsDegreeCode = false;
        let equalsCreatorNIE = false;

        degreeData.forEach(degree => {
            if (degree.code === code) {
                console.log(degree.code);
                console.log(code);
                equalsDegreeCode = true;
            }
        });

        projectData.forEach(project => {
            if (project.creator === nie) {
                console.log(project.creator);
                console.log(nie);
                equalsCreatorNIE = true;
            }
        });

        !equalsDegreeCode && alert("Código de ciclo incorrecto");
        !equalsCreatorNIE && alert("NIE/NIF no corresponde a ningún representante de proyecto");

        if (equalsDegreeCode && equalsCreatorNIE) {
            try {
                const response = await deleteProject(nie);
                if (response.status === 200) {
                    navigation.navigate("ConfirmationDeleteProject");
                } else {
                    alert("No se pudo eliminar el proyecto");
                }
            } catch (error) {
                console.error("Error al eliminar el proyecto", error);
                alert("Error al eliminar el proyecto");
            }
        }
    };


    return (
        <View style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader />
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>DATOS DE PROYECTO</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <Text style={styles.textInfoTitle}>Introduce los datos de tu proyecto: </Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <TextInput
                            label="Código de ciclo"
                            value={code}
                            onChangeText={text => setCode(text)}
                            mode="outlined"
                            outlineColor="#C02830"
                            activeOutlineColor="#C02830"
                            style={{ flex: 1 }}
                        />
                    </View>
                    <Divider />
                    <View style={styles.sectionInfo}>
                        <TextInput
                            label="NIF/NIE representante"
                            value={nie}
                            onChangeText={text => setNie(text)}
                            mode="outlined"
                            outlineColor="#C02830"
                            activeOutlineColor="#C02830"
                            style={{ flex: 1 }}
                        />
                    </View>
                    <Divider />
                    <View style={styles.sectionButton}>
                        <Button onPress={handleButtonPress} icon="check" mode="contained" buttonColor="#C02830">Continuar</Button>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        backgroundColor: "#C02830",
    },
    logoContainer: {
        flex: 0.15,
        backgroundColor: "#C02830",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        paddingTop: 60,
    },
    cardContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        flex: 0.9,
        margin: 20,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    sectionTitle: {
        margin: 5,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#C02830",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: 'white',
    },
    sectionInfo: {
        flex: 1,
        flexDirection: "row",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
    },
    sectionButton: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    textInfoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
    },
});

export default DeleteInputData;
