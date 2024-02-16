import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Divider, TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import GeneralView from "../projectView/GeneralProjectsView";
import FloridaHeader from "../../components/FloridaHeader";


const Terms = () => {

    const navigation = useNavigation();

    const handleButtonPress = () => {
        navigation.navigate(GeneralView);
    };

    return (
        <ScrollView style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader />
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>Términos y condiciones</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.textInfoTitle}>
                                Uso de la Aplicación:
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                Esta aplicación está destinada exclusivamente para uso interno de la comunidad universitaria.
                                La aplicación se utiliza para votar y clasificar proyectos presentados por estudiantes y personal de la universidad.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.textInfoTitle}>Privacidad:</Text>
                            <Text style={styles.text}>Respetamos tu privacidad y protegemos tus datos personales de acuerdo con nuestra política de privacidad.
                                La información que proporcionas al utilizar la aplicación se utiliza únicamente con el propósito de facilitar el proceso de votación y no será compartida con terceros sin tu consentimiento.</Text>
                        </View>
                        <View>
                            <Text style={styles.textInfoTitle}>Uso Adecuado:</Text>
                            <Text style={styles.text}>No debes utilizar la aplicación de manera que pueda dañar, deshabilitar, sobrecargar o deteriorar el funcionamiento de la misma.
                                No debes intentar obtener acceso no autorizado a la aplicación ni a los sistemas relacionados.</Text>
                        </View>
                        <Divider />
                        <View>
                            <Text style={{ ...styles.textInfoTitle, textAlign: 'justify' }}>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigencia inmediatamente después de su publicación en la aplicación.</Text>
                        </View>
                    </View>
                    <View style={styles.sectionButton}>
                        <Button onPress={handleButtonPress} icon="arrow-collapse-left" mode="contained" buttonColor="#C02830">Ir a proyectos</Button>
                    </View>
                </View>
            </View>
        </ScrollView>
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
        color: 'white',
    },
    textContainer: {
        flexDirection: 'column',
        margin: 5,
        padding: 10,
    },
    text: {
        padding: 5,
        margin: 5,
        textAlign: "justify",
    },
    sectionButton: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    textInfoTitle: {
        fontSize: 16,
        margin: 5,
        padding: 5,
        fontWeight: "bold",
        textAlign: "left",
    },
});

export default Terms;
