import { View, Image, StyleSheet } from "react-native";
import React from "react";
import FloridaLogo from "../assets/florida.jpg";

const FloridaHeader = () => {
    return (
            <Image source={FloridaLogo} style={styles.logo} />
    );
};

export default FloridaHeader;

const styles = StyleSheet.create({
    logo: {
        width: 500, // Ajusta el ancho según tus necesidades
        height: 100, // Ajusta la altura según tus necesidades
        marginBottom: 20,
        // Añade resizeMode si es necesario, por ejemplo: resizeMode: 'contain'
      }
});
