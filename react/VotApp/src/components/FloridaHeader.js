import { Image, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import React from "react";
import FloridaStandardLogo from "../assets/floridaLogoTransparente.png";
import FloridaDarkLogo from "../assets/floridaLogoNegro.png";

const FloridaHeader = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <Image
            source={isDarkMode ? FloridaDarkLogo : FloridaStandardLogo}
            style={isDarkMode ? styles.darkLogo : styles.standardLogo}
        />
    );
};

export default FloridaHeader;

const styles = StyleSheet.create({
    standardLogo: {
        resizeMode: "center",
        height: 50,
        marginBottom: 20,
    },
    darkLogo: {
        resizeMode: "contain",
        height: 50,
        marginBottom: 20,
    },
});
