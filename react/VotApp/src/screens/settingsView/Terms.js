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
                            <Text style={{...styles.textInfoTitle, textAlign:'justify'}}>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigencia inmediatamente después de su publicación en la aplicación.</Text>
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
        flexDirection: "column",
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
    generalContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    textContainer: {
        flexDirection: 'column', 
        margin: 5,
        padding: 10,
    },
    text:{
        padding: 5,
        margin:5,
        textAlign: "justify",
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
    sectionDegreeDescription: {
        flex: 1,
        flexDirection: "column",
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
        elevation: 5,
    },
    sectionInfoSmall: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
    },
    textInfoTitle: {
        fontSize: 16,
        margin:5,
        padding:5,
        fontWeight: "bold",
        textAlign: "left",
    },
    textInfoDescription: {
        fontSize: 16,
        textAlign: "right",
        marginLeft: 10,
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
    image: {
        width: 280,
        height: 200,
        resizeMode: "contain",
        borderRadius: 10,
    },
    memberContainer: {
        margin: 5,
        backgroundColor: "#bc9c1c",
        borderRadius: 10,
        padding: 5,
        alignItems: "center",
    }
});

export default Terms;
