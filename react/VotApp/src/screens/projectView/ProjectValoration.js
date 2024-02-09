import React from "react";
import { View, StyleSheet } from "react-native";
import FloridaHeader from "../../components/FloridaHeader";


const ProjectValoration = ({ project }) => {
    
    return (
        <View style={styles.generalContainer}>
            <View style={styles.logoContainer}>
            <FloridaHeader />
            </View>

        </View>
    );
};

export default ProjectValoration;
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
});
