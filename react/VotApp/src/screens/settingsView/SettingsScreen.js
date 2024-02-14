import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import {
    Switch,
    RadioButton,
    Divider,
    IconButton,
    Button,
    useTheme,
} from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext";
import FloridaHeader from "../../components/FloridaHeader";
import { useNavigation } from '@react-navigation/native';


const SettingsScreen = () => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [language, setLanguage] = useState("English");
    const navigation = useNavigation();

    const handleDeleteProject = () => {
        navigation.navigate("DeleteInputData");
    };

    const handleTermsPress = () => {
        navigation.navigate("Terms");
    }

    const theme = useTheme();

    return (
        <ScrollView style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader />
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.sectionTitle}>
                        <Text style={styles.title}>CONFIGURACIÓN</Text>
                    </View>
                    <View style={styles.sectionInfo}>
                        <View style={styles.switchContainer}>
                            <Text
                                style={[
                                    styles.radioButtonLabel,
                                    { color: theme.colors.text },
                                ]}
                            >
                                {isDarkMode ? "Modo Oscuro" : "Modo Claro"}
                            </Text>
                            <IconButton
                                icon={
                                    isDarkMode
                                        ? "weather-night"
                                        : "white-balance-sunny"
                                }
                                color="#C02830"
                                size={20}
                            />
                            <Switch
                                value={isDarkMode}
                                onValueChange={toggleDarkMode}
                                color="#C02830"
                            />
                        </View>
                    </View>
                    <Divider />
                    <View style={styles.sectionInfo}>
                        <View style={styles.sectionInfoSmall}>
                            <Text style={styles.textInfoTitle}>Idioma / Language:</Text>
                        </View>
                    </View>

                    <RadioButton.Group
                        onValueChange={(newValue) => setLanguage(newValue)}
                        value={language}
                    >
                        <View style={styles.sectionRadioButton}>
                            <View style={styles.radioButtonContainer}>
                                <Text
                                    style={[
                                        styles.radioButtonLabel,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    Español 🇪🇸
                                </Text>
                                <RadioButton value="Español" color="#C02830" />
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <Text
                                    style={[
                                        styles.radioButtonLabel,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    English 🇬🇧
                                </Text>
                                <RadioButton value="English" color="#C02830" />
                            </View>
                            <View style={styles.radioButtonContainer}>
                                <View style={styles.sectionInfoSmall}>
                                    <Text style={[styles.radioButtonLabel, { color: theme.colors.text }]}>
                                        Valenciano
                                    </Text>
                                    <Image
                                        source={require("../../assets/banderaCV.png")}
                                        style={{ width: 20, height: 15, margin: 5, }}
                                    />
                                </View>
                                <RadioButton value="Valenciano" color="#C02830" />
                            </View>
                        </View>
                    </RadioButton.Group>
                    <Divider />
                    <View style={{...styles.sectionInfo, justifyContent:'center'}}>
                        <TouchableOpacity onPress={handleTermsPress}>
                            <Text style={styles.termsText}>Ir a Términos y condiciones de uso</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider />
                    <View style={styles.sectionButton}>
                        <Button onPress={handleDeleteProject} icon="trash-can-outline" mode="contained" buttonColor="#C02830">BORRAR PROYECTO</Button>
                    </View>
                </View>
            </View >
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    termsText: {
        textAlign:'center',
        textDecorationLine: 'underline',
    },
    sectionRadioButton: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#ede5c8",
        elevation: 5,
    },
    radioButtonContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
    },
    radioButtonLabel: {
        fontSize: 16,
        color: "#C02830",
    },
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
    sectionInfoSmall: {
        flex: 1,
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
    },
    textInfoTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
    },
});

export default SettingsScreen;
