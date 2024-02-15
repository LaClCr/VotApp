import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Divider, ProgressBar, Surface, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FloridaHeader from "../../components/FloridaHeader";
import ScreensContext from "./projectViewScreensContext";
import ScannerIDCard from './ScannerIDCard';
import LottieView from 'lottie-react-native';
import { getProject } from "../../scripts/getProject";

const ProjectDetails = () => {

    const { selectedProject, setSelectedProject } = useContext(ScreensContext);
    const { projectName } = useContext(ScreensContext);

    const [averageOriginalidad, setAverageOriginalidad] = useState(0);
    const [averageInnovacion, setAverageInnovacion] = useState(0);
    const [averageOds, setAverageOds] = useState(0);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    const lottieAnimationRef = useRef(null);

    useEffect(() => {
        if (loading) {
            lottieAnimationRef.current.play();
        }
    }, []);

    useEffect(() => {
        fetchData(projectName);
    }, [projectName]);

    useEffect(() => {
        selectedProject !== null && calculateAverage();
    }, [selectedProject]);

    const fetchData = async (name) => {
        setLoading(true);
        try {
            const projectData = await getProject(name);
            setSelectedProject(projectData);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };


    const calculateAverage = () => {
        let sumOriginalidad = 0;
        let sumInnovacion = 0;
        let sumOds = 0;
        let cantProjects = selectedProject.valorations.length;

        if (cantProjects > 0) {
            selectedProject.valorations.forEach((valoracion) => {
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
        } else {
            // Handle the case where there are no valorations
            setAverageInnovacion(0);
            setAverageOriginalidad(0);
            setAverageOds(0);
        }
    }

    function normalizeValue(value) {
        return parseFloat((10 * value / 10).toFixed(2));
    }

    return (
        <ScrollView style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader />
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <LottieView
                        ref={lottieAnimationRef}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        source={require('../../assets/animations/LoadingAnimation.json')}
                    />
                </View>
            ) : (
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.title}>{selectedProject.name}</Text>
                        </View>
                        <View style={{ ...styles.sectionInfo, justifyContent: 'center' }}>
                            <Image style={styles.image} source={{ uri: selectedProject.picture }} />
                        </View>
                        <Divider />
                        <View style={styles.sectionInfo}>
                            <View style={styles.sectionInfoSmall}>
                                <Text style={styles.textInfoTitle}>TITULACIÓN:</Text>
                            </View>
                            <View style={styles.sectionInfoSmall}>
                                <Text style={styles.textInfoDescription}>{selectedProject.degree}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.sectionDegreeDescription}>
                            <View style={styles.sectionInfoSmall}>
                                <Text style={styles.textInfoTitle}>DESCRIPCIÓN:</Text>
                            </View>
                            <View style={styles.sectionInfoSmall}>
                                <Text>{selectedProject.description}</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.sectionDegreeDescription}>
                            <View style={styles.sectionInfoSmall}>
                                <Text style={styles.textInfoTitle}>INTEGRANTES:</Text>
                            </View>
                            {!loading &&
                                <View style={styles.sectionInfoSmall}>
                                    {selectedProject.teamMembers.map((member, index) => (
                                        <Surface style={styles.memberContainer} key={index} >
                                            <Text>{member.name}</Text>
                                        </Surface>
                                    ))}
                                </View>
                            }
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
                                <Text style={styles.textInfoValorations}>{averageOriginalidad} / 10</Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <ProgressBar color="#bc9c1c" progress={averageOriginalidad} indeterminate={false} />
                            </View>
                        </View>
                        <View style={styles.sectionValorations}>
                            <View style={styles.valoration}>
                                <Text style={styles.textInfoValorations}>Innovación:</Text>
                                <Text style={styles.textInfoValorations}>{averageInnovacion} / 10</Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <ProgressBar color="#bc9c1c" progress={averageInnovacion} indeterminate={false} />
                            </View>
                        </View>
                        <View style={styles.sectionValorations}>
                            <View style={styles.valoration}>
                                <Text style={styles.textInfoValorations}>ODS:</Text>
                                <Text style={styles.textInfoValorations}>{averageOds} / 10</Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <ProgressBar color="#bc9c1c" progress={averageOds} indeterminate={false} />
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.sectionButton}>
                            <Button onPress={() => navigation.navigate(ScannerIDCard)} icon="star" mode="contained" buttonColor="#C02830">VALORAR</Button>
                            <View style={styles.terms}>
                                <Text style={styles.termsText}>Al continuar, aceptas nuestros</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
                                <Text style={{ ...styles.termsText, textDecorationLine: "underline" }}>TÉRMINOS Y CONDICIONES</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        backgroundColor: "#C02830",
    },
    terms: {
        justifyContent: 'center',
        padding:20,
    },
    termsText: {
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    card: {
        margin: 5,
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
        alignSelf: "center",
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
