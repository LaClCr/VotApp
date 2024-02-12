import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Divider, Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import FloridaHeader from "../../components/FloridaHeader";
import ScreensContext from "./projectViewScreensContext";

const ProjectValoration = () => {

    const { selectedProject } = useContext(ScreensContext);
    const [innovationValoration, setInnovationValoration] = useState(0);
    const [originalityValoration, setOriginalityValoration] = useState(0);
    const [odsValoration, setOdsValoration] = useState(0);

    const handleOriginalityChange = (value) => {
        setOriginalityValoration(value.toFixed(2));
    };

    const handleInnovationChange = (value) => {
        setInnovationValoration(value.toFixed(2));
    };

    const handleOdsChange = (value) => {
        setOdsValoration(value.toFixed(2));
    };

    return (
        <ScrollView style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader />
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>{selectedProject.name}</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <View style={styles.sectionInfoSmall}>
                            <Text style={styles.subtitle}>VALORA ESTE PROYECTO:</Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text style={styles.textInfoValorations}>Originalidad:</Text>
                            <Text style={styles.textInfoValorations}>{originalityValoration} / 10</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <Slider
                                style={{ width: 280, height: 40 }}
                                minimumValue={0}
                                maximumValue={10}
                                minimumTrackTintColor="#bc9c1c"
                                maximumTrackTintColor="#ffffff"
                                onValueChange={handleOriginalityChange}
                            />
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text style={styles.textInfoValorations}>Innovación:</Text>
                            <Text style={styles.textInfoValorations}>{innovationValoration} / 10</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <Slider
                                style={{ width: 280, height: 40 }}
                                minimumValue={0}
                                maximumValue={10}
                                minimumTrackTintColor="#bc9c1c"
                                maximumTrackTintColor="#ffffff"
                                onValueChange={handleInnovationChange}
                            />
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionValorations}>
                        <View style={styles.valoration}>
                            <Text style={styles.textInfoValorations}>ODS:</Text>
                            <Text style={styles.textInfoValorations}>{odsValoration} / 10</Text>
                        </View>
                        <View style={styles.progressBarContainer}>
                            <Slider
                                style={{ width: 280, height: 40 }}
                                minimumValue={0}
                                maximumValue={10}
                                minimumTrackTintColor="#bc9c1c"
                                maximumTrackTintColor="#ffffff"
                                onValueChange={handleOdsChange}
                            />
                        </View>
                    </View>
                    <View style={styles.sectionButton}>
                        <Button icon="star" mode="contained" buttonColor="#C02830">ENVIAR VALORACIÓN</Button>
                    </View>
                </View>
            </View>
        </ScrollView>
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
    cardContainer: {
        flex: 1,
    },
    card: {
        margin: 20,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitle: {
        margin: 5,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#C02830",
        justifyContent: "center",
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: 'white',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        color: 'black',
    },
    sectionInfo: {
        flex: 1,
        flexDirection: "row",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
        elevation: 5,
    },
    sectionButton: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'center',
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
        flexDirection: 'column',
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
