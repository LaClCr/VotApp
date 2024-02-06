import React from "react";
import { StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { Card, Text, View } from "react-native-paper";

const ProjectCard = ({ name, degree, logo }) => {
    return (
        <Card style={styles.card} mode="elevated">
            <TouchableOpacity style={styles.titleCardContainer}>
                <Card.Title titleStyle={styles.title} title={name} />
            </TouchableOpacity>
            <Card.Content style={styles.content}>
                <Text variant="bodyLarge">{degree}</Text>
            </Card.Content>
            <Card.Cover style={styles.logo} source={logo} />
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 180,
        height: 170,
        marginVertical: 20,
        marginHorizontal: 8,
        borderRadius: 8,
        elevation: 4,
    },
    logo: {
        height: 125,
        borderRadius: 8,
    },
    content: {},
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    titleCardContainer: {
        backgroundColor: "#B58933",
        borderRadius: 8,
    },
    grade: {
        fontSize: 16,
    },
});

export default ProjectCard;
