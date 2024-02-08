import React from "react";
import { StyleSheet, Touchable, TouchableOpacity } from "react-native";
import { Card, Text, View } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ProjectCard = ({ name, degree, logo }) => {
    const navigation = useNavigation();

    const handleOnPress = () => {
        navigation.navigate("ProjectDetails", { name });
    };
    return (
        <TouchableOpacity style={styles.card} onPress={handleOnPress}>
            <Card mode="elevated">
                <TouchableOpacity
                    style={styles.titleCardContainer}
                    onPress={handleOnPress}
                >
                    <Card.Title titleStyle={styles.title} title={name} />
                </TouchableOpacity>
                <Card.Content style={styles.content}>
                    <Text style={styles.gradeCardContainer}>{degree}</Text>
                </Card.Content>
                <Card.Cover
                    source={logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 180,
        height: 200,
        marginVertical: 10,
        marginHorizontal: 8,
        borderRadius: 8,
        elevation: 2,
    },
    logo: {
        //flex: 1,
        height: 110,
        borderRadius: 8,
    },
    content: {
        margin: 5,
    },
    title: {
        fontSize: 20,
        //color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    titleCardContainer: {
        marginTop: 6, // Margen superior
        marginHorizontal: 6, // Margen horizontal (izquierda y derecha)
        marginBottom: 0, // Sin margen inferior
        backgroundColor: "#DF9E1E",
        borderRadius: 8,
    },
    gradeCardContainer: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default ProjectCard;
