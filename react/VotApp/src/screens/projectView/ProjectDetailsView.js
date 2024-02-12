import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Divider, ProgressBar, Surface, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FloridaHeader from "../../components/FloridaHeader";
import ScreensContext from "./projectViewScreensContext";
import { getProject } from "../../scripts/getProject";

const ProjectDetails = ({ name }) => {

    const { selectedProject , setSelectedProject } = useContext(ScreensContext);
    const [averageOriginalidad, setAverageOriginalidad] = useState(0);
    const [averageInnovacion, setAverageInnovacion] = useState(0);
    const [averageOds, setAverageOds] = useState(0);

    const navigation = useNavigation();

    const projectExample = {
        //BORRAR ESTA CONSTANTE CUANDO ESTÉN LISTOS LOS SCRIPTS

        name: "Proyecto Innovación Educativa",
        degree: "Master's Thesis",
        description: "Este proyecto busca mejorar la enseñanza de las matemáticas mediante el uso de tecnologías interactivas.",
        picture: "https://leinn.floridamkt.florida.es/wp-content/uploads/sites/15/2023/02/florida_NoticiaAmpliada.jpg",
        creator: "123456789A",
        teamMembers: [
            { name: "María García" },
            { name: "Juan Pérez" },
            { name: "Laura Martínez" }
        ],
        valorations: [
            { nie: "23320894K", originality: 8, innovation: 9, ods: 7 },
            { nie: "123456789B", originality: 7, innovation: 8, ods: 6 }
        ]
    };

    useEffect(() => {
        fetchData(name);
    }, [name]); 

    useEffect(() => {
        calculateAverage();
    }, [selectedProject]);

    const fetchData = async (name) => {
        //DESCOMENTAR ESTO CUANDO ESTÉN LISTOS LOS SCRIPTS
        /* try {
            const projectData = await getProject(name);
            setSelectedProject(projectData);
        } catch (error) {
            console.error(error);
        } */


        //BORRAR ESTO CUANDO ESTÉN LOS SCRIPTS
        setSelectedProject(projectExample);
    };

    const calculateAverage = () => {
        let sumOriginalidad = 0;
        let sumInnovacion = 0;
        let sumOds = 0;
        let cantProjects = projectExample.valorations.length;

        projectExample.valorations.forEach((valoracion) => {
            sumOriginalidad += valoracion.originality;
            sumInnovacion += valoracion.innovation;
            sumOds += valoracion.ods;
        });

        let averageOriginalidad = normalizeValue(sumOriginalidad / cantProjects);
        let averageInnovacion = normalizeValue(sumInnovacion / cantProjects);
        let averageOds = normalizeValue(sumOds / cantProjects);

        setAverageInnovacion(averageInnovacion);
        setAverageOriginalidad(averageOriginalidad);
        setAverageOds(averageOds);
    }

    function normalizeValue(value) {
        return value / 10;
    }

    return (
        <ScrollView style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader />
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>{projectExample.name}</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <Image style={styles.image} source={{ uri: projectExample.picture }} />
                    </View>
                    <Divider />
                    <View style={styles.sectionInfo}>
                        <View style={styles.sectionInfoSmall}>
                            <Text style={styles.textInfoTitle}>TITULACIÓN:</Text>
                        </View>
                        <View style={styles.sectionInfoSmall}>
                            <Text style={styles.textInfoDescription}>{projectExample.degree}</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionDegreeDescription}>
                        <View style={styles.sectionInfoSmall}>
                            <Text style={styles.textInfoTitle}>DESCRIPCIÓN:</Text>
                        </View>
                        <View style={styles.sectionInfoSmall}>
                            <Text>{projectExample.description}</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionDegreeDescription}>
                        <View style={styles.sectionInfoSmall}>
                            <Text style={styles.textInfoTitle}>INTEGRANTES:</Text>
                        </View>
                        <View style={styles.sectionInfoSmall}>
                            {projectExample.teamMembers.map((member, index) => (
                                <Surface style={styles.memberContainer} key={index} >
                                    <Text>{member.name}</Text>
                                </Surface>
                            ))}
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionInfo}>
                        <View style={styles.sectionInfoSmall}>
                            <Text style={styles.textInfoTitle}>VALORACIONES:</Text>
                        </View>
                    </View>
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text style={styles.textInfoValorations}>Originalidad:</Text>
                            <Text style={styles.textInfoValorations}>{averageOriginalidad * 10} / 10</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <ProgressBar color="#bc9c1c" progress={averageOriginalidad} indeterminate={false} />
                        </View>
                    </View>
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text style={styles.textInfoValorations}>Innovación:</Text>
                            <Text style={styles.textInfoValorations}>{averageInnovacion * 10} / 10</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <ProgressBar color="#bc9c1c" progress={averageInnovacion} indeterminate={false} />
                        </View>
                    </View>
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text style={styles.textInfoValorations}>ODS:</Text>
                            <Text style={styles.textInfoValorations}>{averageOds * 10} / 10</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <ProgressBar color="#bc9c1c" progress={averageOds} indeterminate={false} />
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionButton}>
                        <Button onPress={() => navigation.navigate('ProjectValoration')} icon="star" mode="contained" buttonColor="#C02830">VALORAR</Button>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

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
    card: {
        margin: 20,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitle: {
        margin: 5,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#C02830",
        justifyContent: "center",
        elevation: 5,
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
        elevation: 5,
    },
    sectionButton: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'center',
    },
    sectionDegreeDescription: {
        flex: 1,
        flexDirection: "column",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
        elevation: 5,
    },
    sectionInfoSmall: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    textInfoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
    },
    textInfoDescription: {
        fontSize: 16,
        textAlign: "right",
        marginLeft: 10,
    },
    textInfoValorations: {
        fontSize: 16,
        textAlign: "justify",
    },
    sectionValorations: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
    },
    valoration: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    progressBarContainer: {
        flex: 1,
        margin: 10,
    },
    image: {
        width: 280,
        height: 200,
        resizeMode: "contain",
        borderRadius: 10,
    },
    memberContainer: {
        margin: 5,
        backgroundColor: "#bc9c1c",
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
    }
});

export default ProjectDetails;
