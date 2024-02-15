import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider, Button, Card } from "react-native-paper";
import Slider from "@react-native-community/slider";
import FloridaHeader from "../../components/FloridaHeader";
import ScreensContext from "./projectViewScreensContext";
import { useNavigation } from "@react-navigation/native";
import ConfirmationScreen from "./ConfirmationScreen";
import { putProject } from "../../scripts/putProject";

const ProjectValoration = () => {
    const { selectedProject } = useContext(ScreensContext);
    const { nieValoration, setNieValoration } = useContext(ScreensContext);
    const [innovationValoration, setInnovationValoration] = useState(0);
    const [originalityValoration, setOriginalityValoration] = useState(0);
    const [odsValoration, setOdsValoration] = useState(0);

    const navigation = useNavigation();

    const handleOriginalityChange = (value) => {
        setOriginalityValoration(value.toFixed(0));
    };

    const handleInnovationChange = (value) => {
        setInnovationValoration(value.toFixed(0));
    };

    const handleOdsChange = (value) => {
        setOdsValoration(value.toFixed(0));
    };

    const handlePressSendValoration = async () => {
        if (
            originalityValoration === 0 &&
            innovationValoration === 0 &&
            odsValoration === 0
        ) {
            alert("Debe asignar al menos una valoración para enviar.");
        } else {
            const originality = Math.trunc(originalityValoration);
            console.log(originality);
            const innovation = Math.trunc(innovationValoration);
            console.log(innovation);
            const ods = Math.trunc(odsValoration);
            console.log(ods);

            const valorationJSON = {
                nie: nieValoration,
                originality: originality,
                innovation: innovation,
                ods: ods,
            };
            const stringValorationJSON = JSON.stringify(valorationJSON);
            console.log(stringValorationJSON);

            try {
                let response = await putProject(
                    selectedProject.name,
                    stringValorationJSON
                );
                if (response.status === 201) {
                    navigation.navigate(ConfirmationScreen);
                } else {
                    alert(
                        "No se puede valorar dos veces con el mismo documento de identificación"
                    );
                }
            } catch (error) {
                console.error("Error al enviar la valoración:", error);
                alert("No se puede valorar dos veces con el mismo documento de identificación");
            }
        }
    };

    return (
        <ScrollView style={styles.generalContainer}>
            <View>
                <View style={styles.logoContainer}>
                    <FloridaHeader />
                </View>
                <Card
                    style={[
                        styles.card,
                    ]}
                >
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>{selectedProject.name}</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <View style={styles.sectionInfoSmall}>
                            <Text
                                style={[
                                    styles.subtitle,
                                ]}
                            >
                                {nieValoration}
                            </Text>
                            <Text
                                style={[
                                    styles.subtitle,
                                ]}
                            >
                                VALORA ESTE PROYECTO:
                            </Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text
                                style={[
                                    styles.textInfoValorations,
                                ]}
                            >
                                Originalidad:
                            </Text>
                            <Text
                                style={[
                                    styles.textInfoValorations,
                                ]}
                            >
                                {originalityValoration} / 10
                            </Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <Slider
                                style={{ width: 280, height: 40 }}
                                minimumValue={0}
                                maximumValue={10}
                                minimumTrackTintColor="#C02830"
                                maximumTrackTintColor="#ffffff"
                                onValueChange={handleOriginalityChange}
                            />
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text
                                style={[
                                    styles.textInfoValorations,
                                ]}
                            >
                                Innovación:
                            </Text>
                            <Text
                                style={[
                                    styles.textInfoValorations,
                                ]}
                            >
                                {innovationValoration} / 10
                            </Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <Slider
                                style={{ width: 280, height: 40 }}
                                minimumValue={0}
                                maximumValue={10}
                                minimumTrackTintColor="#C02830"
                                maximumTrackTintColor="#ffffff"
                                onValueChange={handleInnovationChange}
                            />
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text
                                style={[
                                    styles.textInfoValorations,
                                ]}
                            >
                                ODS:
                            </Text>
                            <Text
                                style={[
                                    styles.textInfoValorations,
                                ]}
                            >
                                {odsValoration} / 10
                            </Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <Slider
                                style={{ width: 280, height: 40 }}
                                minimumValue={0}
                                maximumValue={10}
                                minimumTrackTintColor="#C02830"
                                maximumTrackTintColor="#ffffff"
                                onValueChange={handleOdsChange}
                            />
                        </View>
                    </View>
                    <View style={styles.sectionButton}>
                        <Button
                            textColor="#fff"
                            onPress={handlePressSendValoration}
                            icon="star"
                            mode="contained"
                            buttonColor="#C02830"
                        >
                            ENVIAR VALORACIÓN
                        </Button>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
};

export default ProjectValoration;

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        backgroundColor: "#C02830",
    },
    logoContainer: {
        flex: 0.15,
        backgroundColor: "#C02830",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        paddingTop: 60,
    },
    card: {
        flex: 1,
    },
    card: {
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    sectionTitle: {
        margin: 5,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#C02830",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "white",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: "black",
    },
    sectionInfo: {
        flex: 1,
        flexDirection: "row",
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    sectionButton: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
    },
    sectionInfoSmall: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    textInfoValorations: {
        fontSize: 16,
        textAlign: "justify",
    },
    sectionValorations: {
        flex: 1,
        flexDirection: "column",
        margin: 5,
    },
    valoration: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    progressBarContainer: {
        flex: 1,
        margin: 10,
    },
});
