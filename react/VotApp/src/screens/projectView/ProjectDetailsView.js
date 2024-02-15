import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import {
    Divider,
    ProgressBar,
    Surface,
    Button,
    useTheme,
    Card,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FloridaHeader from "../../components/FloridaHeader";
import ScreensContext from "./projectViewScreensContext";
import ScannerIDCard from "./ScannerIDCard";
import LottieView from "lottie-react-native";
import { getProject } from "../../scripts/getProject";
import { ThemeContext } from "../../context/ThemeContext";

const ProjectDetails = () => {
    const theme = useTheme();
    const { selectedProject, setSelectedProject } = useContext(ScreensContext);
    const { projectName } = useContext(ScreensContext);
    const { customBackgroundColor } = useContext(ThemeContext);

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

            let averageOriginalidad = normalizeValue(
                sumOriginalidad / cantProjects
            );
            let averageInnovacion = normalizeValue(
                sumInnovacion / cantProjects
            );
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
    };

    function normalizeValue(value) {
        return parseFloat(((10 * value) / 10).toFixed(2));
    }

    return (
        <View style={styles.generalContainer}>
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
                        source={require("../../assets/animations/LoadingAnimation.json")}
                    />
                </View>
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <Card
                        style={[
                            styles.card,
                            { backgroundColor: customBackgroundColor },
                        ]}
                    >
                        <View style={styles.sectionTitle}>
                            <Text style={styles.title}>
                                {selectedProject.name}
                            </Text>
                        </View>
                        <View style={styles.sectionInfo}>
                            <Image
                                style={styles.image}
                                source={{ uri: selectedProject.picture }}
                            />
                        </View>
                        <Divider />
                        <View style={styles.sectionInfo}>
                            <View style={styles.sectionInfoSmall}>
                                <Text
                                    style={[
                                        styles.textInfoTitle,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    TITULACIÓN:
                                </Text>
                            </View>
                            <View style={styles.sectionInfoSmall}>
                                <Text
                                    style={[
                                        styles.textInfoDescription,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    {selectedProject.degree}
                                </Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.sectionDegreeDescription}>
                            <View style={styles.sectionInfoSmall}>
                                <Text
                                    style={[
                                        styles.textInfoTitle,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    DESCRIPCIÓN:
                                </Text>
                            </View>
                            <View style={styles.sectionInfoSmall}>
                                <Text
                                    style={[
                                        styles.textInfoDescription,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    {selectedProject.description}
                                </Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.sectionDegreeDescription}>
                            <View style={styles.sectionInfoSmall}>
                                <Text
                                    style={[
                                        styles.textInfoTitle,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    INTEGRANTES:
                                </Text>
                            </View>
                            {!loading && (
                                <View style={styles.sectionInfoSmall}>
                                    {selectedProject.teamMembers.map(
                                        (member, index) => (
                                            <Surface
                                                style={styles.memberContainer}
                                                key={index}
                                            >
                                                <Text
                                                    style={{
                                                        color: "#fff",
                                                    }}
                                                >
                                                    {member.name}
                                                </Text>
                                            </Surface>
                                        )
                                    )}
                                </View>
                            )}
                        </View>
                        <Divider />
                        <View style={styles.sectionInfo}>
                            <View style={styles.sectionInfoSmall}>
                                <Text
                                    style={[
                                        styles.textInfoTitle,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    VALORACIONES:
                                </Text>
                            </View>
                        </View>
                        <View style={styles.sectionValorations}>
                            <View style={styles.valoration}>
                                <Text
                                    style={[
                                        styles.textInfoValorations,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    Originalidad:
                                </Text>
                                <Text
                                    style={[
                                        styles.textInfoValorations,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    {averageOriginalidad} / 10
                                </Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <ProgressBar
                                    color="#C02830"
                                    progress={averageOriginalidad}
                                    indeterminate={false}
                                />
                            </View>
                        </View>
                        <View style={styles.sectionValorations}>
                            <View style={styles.valoration}>
                                <Text
                                    style={[
                                        styles.textInfoValorations,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    Innovación:
                                </Text>
                                <Text
                                    style={[
                                        styles.textInfoValorations,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    {averageInnovacion} / 10
                                </Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <ProgressBar
                                    color="#C02830"
                                    progress={averageInnovacion}
                                    indeterminate={false}
                                />
                            </View>
                        </View>
                        <View style={styles.sectionValorations}>
                            <View style={styles.valoration}>
                                <Text
                                    style={[
                                        styles.textInfoValorations,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    ODS:
                                </Text>
                                <Text
                                    style={[
                                        styles.textInfoValorations,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    {averageOds} / 10
                                </Text>
                            </View>
                            <View style={styles.progressBarContainer}>
                                <ProgressBar
                                    color="#C02830"
                                    progress={averageOds}
                                    indeterminate={false}
                                />
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.sectionButton}>
                            <Button
                                textColor="#fff"
                                onPress={() =>
                                    navigation.navigate(ScannerIDCard)
                                }
                                icon="star"
                                mode="contained"
                                buttonColor="#C02830"
                            >
                                VALORAR
                            </Button>
                        </View>
                    </Card>
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 60,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        paddingTop: 60,
    },
    logoContainer: {
        flex: 0.1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    card: {
        flex: 1,
        margin: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
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
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    sectionInfo: {
        flex: 1,
        flexDirection: "row",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
    },
    sectionButton: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        justifyContent: "center",
    },
    sectionDegreeDescription: {
        flex: 1,
        flexDirection: "column",
        margin: 5,
        padding: 10,
        borderRadius: 10,
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
        textAlign: "auto",
    },
    textInfoValorations: {
        fontSize: 16,
        textAlign: "justify",
    },
    sectionValorations: {
        flex: 1,
        flexDirection: "column",
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
        flex: 1,
        width: 280,
        height: 200,
        resizeMode: "contain",
        borderRadius: 10,
    },
    memberContainer: {
        margin: 5,
        backgroundColor: "#C02830",
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
    },
});

export default ProjectDetails;
