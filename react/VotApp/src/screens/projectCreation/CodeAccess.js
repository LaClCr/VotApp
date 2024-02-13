import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FloridaHeader from "../../components/FloridaHeader";
import { getDegree } from "../../scripts/getDegree";
import ScreensContext from "./projectCreationScreensContext";

const CodeAccess = () => {

    const { selectedDegree, setSelectedDegree } = useContext(ScreensContext);
    const navigation = useNavigation();
    const [code, setCode] = useState(''); 
    const [degreeData, setDegreeData] = useState([]);


    useEffect(() => {
        fetchDegrees();
    }, []);

    const fetchDegrees = async () => {
        try {
            const degrees = await getDegree("all");
            setDegreeData(degrees);
        } catch (error) {
            console.error("Error al obtener grados", error);
        }
    };

    const handleButtonPress = () => {
       
        let equals = false;

        degreeData.forEach(degree => {
            if (degree.code === code) {
                setSelectedDegree(degree);
                equals = true;
                navigation.navigate("ProjectCreation"); 
            }
        });

        if (!equals) {
            alert("Código de ciclo incorrecto");
        }
    };

    return (
        <ScrollView style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader />
            </View>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <View style={styles.sectionTitle}>
                            <Text style={styles.title}>Introduce código de ciclo:</Text>
                        </View>
                        <View style={styles.sectionInfo}>
                            <TextInput
                                label="Código de ciclo"	
                                value={code}
                                onChangeText={text => setCode(text)}
                                mode="outlined"
                                outlineColor="#C02830"
                                activeOutlineColor="#C02830"
                                style={{ flex: 1 }}
                            />
                        </View>
                        <Divider />
                        <View style={styles.sectionButton}>
                            <Button onPress={handleButtonPress} icon="check" mode="contained" buttonColor="#C02830">Continuar</Button>
                        </View>
                    </View>
                </View>
        </ScrollView>
    );
};

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
});

export default CodeAccess;
