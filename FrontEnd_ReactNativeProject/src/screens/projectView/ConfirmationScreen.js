import React, { useEffect, useRef, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import GeneralView from "./GeneralProjectsView";
import { useTranslation } from "react-i18next";

export default function ConfirmationScreen() {
    const lottieAnimationRef = useRef(null);
    const navigation = useNavigation();
    const { t } = useTranslation();

    useEffect(() => {
        lottieAnimationRef.current.play();
    }, []);

    const handleOKpress = () => {
        navigation.navigate(GeneralView);
    };

    return (
        <View style={styles.container}>
            <View style={styles.animationContainer}>
                <LottieView
                    ref={lottieAnimationRef}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={require("../../assets/animations/TickAnimation.json")}
                />
                <Text
                    style={[
                        styles.confirmationText,
                    ]}
                >
                    {t("¡Valoración enviada!")}
                </Text>
            </View>
            <View style={styles.sectionButton}>
                <Button
                    onPress={handleOKpress}
                    icon="home"
                    mode="contained"
                    textColor="#fff"
                    buttonColor="#C02830"
                >
                    {t("IR A PROYECTOS")}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    animationContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    confirmationText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    sectionButton: {
        flex: 0.2,
        margin: 5,
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
    },
});
