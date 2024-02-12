import React, { useState, useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
} from "react-native";
import {
    Card,
    Switch,
    RadioButton,
    IconButton,
    Button,
    useTheme,
} from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext";
import FloridaHeader from "../../components/FloridaHeader";

const Settings = () => {
    const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
    const [language, setLanguage] = useState("English");
    const [project, setProject] = useState({
        id: "1",
        name: "Mi Proyecto",
        logoUri: require("../../assets/logo.png"),
    });

    const handleDeleteProject = (projectId) => {
        Alert.alert(
            "Eliminar Proyecto",
            "¿Estás seguro de que quieres eliminar este proyecto?",
            [
                { text: "Cancelar" },
                {
                    text: "Eliminar",
                    onPress: () => setProject(null),
                },
            ]
        );
    };

    const renderProject = ({ item }) => (
        <View style={styles.projectItem}>
            <Text style={styles.projectText}>{item.name}</Text>
            <IconButton
                icon="delete"
                color="#C02830"
                size={20}
                onPress={() => handleDeleteProject(item.id)}
            />
        </View>
    );
    const theme = useTheme();

    return (
        <ScrollView
            style={[
                styles.scrollView,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <View style={styles.container}>
                <FloridaHeader />
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={[styles.header, { color: "#C02830" }]}>
                            Settings
                        </Text>

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

                        <Text style={[styles.text, { color: "#C02830" }]}>
                            Idioma / Language
                        </Text>
                        <RadioButton.Group
                            onValueChange={(newValue) => setLanguage(newValue)}
                            value={language}
                        >
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
                        </RadioButton.Group>
                        {project && (
                            <View style={styles.projectSection}>
                                <Text
                                    style={[
                                        styles.header,
                                        { color: theme.colors.text },
                                    ]}
                                >
                                    Proyecto Actual: {project.name}
                                </Text>
                                <View
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Image
                                        source={project.logoUri}
                                        style={styles.projectLogo}
                                    />
                                    <Button
                                        textColor={theme.colors.text}
                                        icon="delete"
                                        mode="contained"
                                        style={{ backgroundColor: "#B58933" }}
                                        onPress={handleDeleteProject}
                                    >
                                        Eliminar Proyecto
                                    </Button>
                                </View>
                            </View>
                        )}
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        paddingTop: 60,
    },
    logo: {
        width: 500, // Ajusta el ancho según tus necesidades
        height: 100, // Ajusta la altura según tus necesidades
        marginBottom: 20,
    },
    projectLogo: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    card: {
        width: "90%",
        padding: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    radioButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    radioButtonLabel: {
        fontSize: 16,
        color: "#C02830",
    },
    projectList: {
        marginTop: 10,
    },
    projectItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    projectText: {
        fontSize: 16,
        color: "#C02830",
    },
});

export default Settings;
