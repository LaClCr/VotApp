import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider, ProgressBar } from 'react-native-paper';

// Este es el componente que representa la tarjeta del proyecto
const ProjectDetailsCard = ({ project }) => {

    const [averageOriginalidad, setAverageOriginalidad] = useState(0);
    const [averageInnovacion, setAverageInnovacion] = useState(0);
    const [averageOds, setAverageOds] = useState(0);

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
                <View style={styles.sectionInfoSmall}>
                    <Text style={styles.textInfoTitle}>TITULACIÓN:</Text>
                </View>
                <View style={styles.sectionInfoSmall}>
                    <Text style={styles.textInfoDescription}>{project.degree}</Text>
                </View>
            </View>
            <Divider />
            <View style={styles.sectionInfo}>
                <View style={styles.sectionInfoSmall}>
                    <Text style={styles.textInfoTitle}>VALORACIONES:</Text>
                </View>
            </View>
            <View style={styles.sectionValorations}>
                <View style={styles.progressBar}>
                    <Text style={styles.textInfoValorations}>Originalidad:</Text>
                </View>
                <View style={styles.progressBar}>
                    <ProgressBar color="#bc9c1c" progress={averageOriginalidad} indeterminate={false} />
                    <Text>{averageOriginalidad * 10}</Text>
                </View>
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
    sectionInfoSmall: {
        flex: 1,
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
        textAlign: "left",
    },
    sectionValorations: {
        flex: 1,
        margin: 5,
        padding: 10,
    },
    progressBar: {
        flexDirection: "row",
        alignItems: "center",
        padding: 3,
    }
});
export default ProjectDetailsCard;
