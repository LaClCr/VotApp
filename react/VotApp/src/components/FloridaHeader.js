import { Image, StyleSheet, View } from "react-native";
import React from "react";
import FloridaStandardLogo from "../assets/floridaLogoBlanco.png";

const FloridaHeader = () => {

    return (
        <Image
            source={FloridaStandardLogo}
            style={styles.standardLogo}
        />
    );
};

export default FloridaHeader;

const styles = StyleSheet.create({
    standardLogo: {
        resizeMode: "contain",
        height: 60,
        marginBottom: 20,
    },

});
