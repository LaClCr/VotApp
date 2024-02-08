import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

// Este es el componente que representa la tarjeta del proyecto
const ProjectDetailsCard = ({ project }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{project.name}</Text>
            <Text style={styles.subtitle}>
                Titulación: {project.qualification}
            </Text>
            <Text style={styles.subtitle}>Valoraciones: {project.rating}%</Text>
            <Text style={styles.subtitle}>Descripción:</Text>
            <Text style={styles.description}>{project.description}</Text>
            <Text style={styles.subtitle}>Participantes:</Text>
            <Text style={styles.participants}>
                {project.participants.join(", ")}
            </Text>
            <Button
                title="+ Valora Proyecto"
                color="#f00"
                onPress={() => {
                    // Aquí puedes definir la lógica para navegar a otra pantalla
                    // Por ejemplo, usando React Navigation
                    // navigation.navigate('RateProject', { project: project });
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        margin: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#eee",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    participants: {
        fontSize: 14,
        marginBottom: 20,
    },
    footer: {
        height: 60,
        backgroundColor: "#eee",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
});
export default ProjectDetailsCard;
