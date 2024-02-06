import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";

const ProjectCard = ({ name, degree, logo }) => {
    return (
        <Card style={styles.card} mode="elevated">
            <Card.Title titleStyle={styles.title} title={name} />
            <Card.Content style={styles.content}>
                <Text variant="bodyMedium">{degree}</Text>
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
        backgroundColor: "#B58933",
        borderRadius: 8,
    },
    grade: {
        fontSize: 16,
    },
});

export default ProjectCard;
