import { View, Image, StyleSheet } from "react-native";
import React from "react";
import FloridaLogo from "../assets/florida.jpg";

const FloridaHeader = () => {
    return (
        <View style={styles.logoContainer}>
            <Image source={FloridaLogo} style={styles.logo} />
        </View>
    );
};

export default FloridaHeader;

const styles = StyleSheet.create({
    logoContainer: {
        flex: 0.15,
        marginTop: 10,
    },
    logo: {
        width: 400, // Ajusta el ancho según tus necesidades
        height: 100, // Ajusta la altura según tus necesidades
    },
});
