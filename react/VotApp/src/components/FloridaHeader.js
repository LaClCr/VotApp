import { Image, StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import React from "react";
import FloridaStandardLogo from "../assets/floridaLogoTransparenteV2.png";
import FloridaDarkLogo from "../assets/floridaLogoNegro.png";

const FloridaHeader = () => {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <Image
            source={isDarkMode ? FloridaDarkLogo : FloridaStandardLogo}
            style={styles.standardLogo}
        />
    );
};

export default FloridaHeader;

const styles = StyleSheet.create({
    standardLogo: {
        resizeMode: "contain",
        height: 50,
        marginBottom: 20,
    },
});
