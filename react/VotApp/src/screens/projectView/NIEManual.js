import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import FloridaHeader from "../../components/FloridaHeader";
import ScreensContext from "./projectViewScreensContext";
import { validateNIF } from "../../scripts/validateNIF";


const NIEManual = () => {

    const { nieValoration, setNieValoration } = useContext(ScreensContext);
    const navigation = useNavigation();

    const handleButtonPress = () => {
        if (validateNIF(nieValoration)) {
            navigation.navigate("ProjectValoration");
        } else {
            alert("NIF/NIE inválido. Por favor, ingresa un NIF/NIE válido.");
        }
    };

    return (
        <View style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader />
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>Introduce tu NIF/NIE</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <TextInput
                            label="NIF/NIE"
                            value={nieValoration}
                            onChangeText={text => setNieValoration(text)}
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
        </View>
    );
};

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
    cardContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    card: {
        flex:0.5,
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

export default NIEManual;
