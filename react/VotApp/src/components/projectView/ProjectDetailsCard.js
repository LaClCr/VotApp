import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Divider, ProgressBar, Surface, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


// Este es el componente que representa la tarjeta del proyecto
const ProjectDetailsCard = ({ project }) => {

    const [averageOriginalidad, setAverageOriginalidad] = useState(0);
    const [averageInnovacion, setAverageInnovacion] = useState(0);
    const [averageOds, setAverageOds] = useState(0);

    const navigation = useNavigation();


    useEffect(() => {
        calculateAverage();
    }, [project]);

    const calculateAverage = () => {

        let sumOriginalidad = 0;
        let sumInnovacion = 0;
        let sumOds = 0;

        let cantProjects = project.valorations.length;

        project.valorations.forEach((valoracion) => {
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
        console.log(value / 10);
        return value / 10;
    }

    return (
        <ScrollView style={styles.card}>
            <View style={styles.sectionTitle}>
                <Text style={styles.title}>{project.name}</Text>
            </View>
            <View style={styles.sectionInfo}>
                <Image style={styles.image} source={{ uri: project.picture }} />
            </View>
            <Divider />
            <View style={styles.sectionInfo}>
                <View style={styles.sectionInfoSmall}>
                    <Text style={styles.textInfoTitle}>TITULACIÓN:</Text>
                </View>
                <View style={styles.sectionInfoSmall}>
                    <Text style={styles.textInfoDescription}>{project.degree}</Text>
                </View>
            </View>
            <Divider />
            <View style={styles.sectionDegreeDescription}>
                <View style={styles.sectionInfoSmall}>
                    <Text style={styles.textInfoTitle}>DESCRIPCIÓN:</Text>
                </View>
                <View style={styles.sectionInfoSmall}>
                    <Text>{project.description}</Text>
                </View>
            </View>
            <Divider />
            <View style={styles.sectionDegreeDescription}>
                <View style={styles.sectionInfoSmall}>
                    <Text style={styles.textInfoTitle}>INTEGRANTES:</Text>
                </View>
                <View style={styles.sectionInfoSmall}>
                    {project.teamMembers.map((member, index) => (
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
                <Button onPress={() => navigation.navigate('ProjectValoration', { project: project })} icon="star" mode="contained" buttonColor="#C02830">VALORAR</Button>
            </View>

        </ScrollView>
    );
};
const styles = StyleSheet.create({
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
export default ProjectDetailsCard;
