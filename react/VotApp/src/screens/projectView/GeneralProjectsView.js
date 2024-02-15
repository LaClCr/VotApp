import React, { useState, useEffect, useContext, useRef } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Keyboard,
    Image,
} from "react-native";
import { Searchbar, Card } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DropdownComponent from "../../components/projectView/DropdownComponent";
import ScreensContext from "./projectViewScreensContext";
import LottieView from 'lottie-react-native';
import { getProject, getProjectFilter } from "../../scripts/getProject";
import { getDegree } from "../../scripts/getDegree";
import FloridaHeader from "../../components/FloridaHeader";

const GeneralView = ({ navigation }) => {
    const { projectName, setProjectName } = useContext(ScreensContext);
    const [degreeData, setDegreeData] = useState([]);
    const [projectData, setProjectData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDegree, setSelectedDegree] = useState("all");
    const [loading, setLoading] = useState(true);

    const lottieAnimationRef = useRef(null);


    useEffect(() => {
        if (loading) {
            lottieAnimationRef.current.play();
        }
    }, []);


    useEffect(() => {
        fetchDegrees();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedDegree]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchDegrees = async () => {
        try {
            const degrees = await getDegree("all");
            let degreeDropdownData = degrees.map((degree) => ({
                label: degree.abbreviation,
                value: degree.abbreviation,
            }));
            degreeDropdownData.sort((a, b) =>
                a.label.localeCompare(b.label)
            );
            degreeDropdownData.unshift({ label: "Todos", value: "all" });
            setDegreeData(degreeDropdownData);
        } catch (error) {
            console.error("Error al obtener grados", error);
        }
    };

    const fetchData = async () => {
        try {
            let projects = [];
            if (searchQuery.trim() !== "") {
                projects = await getProject(searchQuery.trim());
                if (projects) {
                    setProjectData(projects);
                } else {
                    setProjectData([]);
                    alert(
                        "No se ha encontrado ningún proyecto con el nombre: " +
                        searchQuery.trim()
                    );
                }
            } else {
                projects = await getProjectFilter(selectedDegree);
                setProjectData(projects);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error al obtener proyectos", error);
        }
    };

    const handleSearch = () => {
        // Oculta el teclado
        Keyboard.dismiss();
        // Realiza la búsqueda
        fetchData();
    };

    const handleOnPress = (item) => {
        setProjectName(item.name);
        console.log("URI: " + item.picture);
        navigation.navigate("ProjectDetails");
    };

    return (
        <View style={styles.generalContainer}>
            <View style={styles.logoContainer}>
                <FloridaHeader/>
            </View>
            <View style={styles.searchAndFilterContainer}>
                <Searchbar
                    placeholder="Buscar..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    style={styles.searchbar}
                    inputStyle={styles.searchbarInput}
                    iconColor={"#C02830"}
                    clearIcon={() => (
                        <MaterialCommunityIcons
                            name="close-circle"
                            size={24}
                            color="#C02830"
                        />
                    )}
                    onSubmitEditing={handleSearch}
                />
                <DropdownComponent
                    data={degreeData}
                    selectedValue={selectedDegree}
                    onChange={(value) => setSelectedDegree(value)}
                />
            </View>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <LottieView
                        ref={lottieAnimationRef}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        source={require('../../assets/animations/LoadingAnimation.json')}
                    />
                </View>
            ) : (
                <FlatList
                    style={styles.flatListContainer}
                    data={projectData}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleOnPress(item)}
                            style={styles.cardTouch}
                        >
                            <Card style={styles.card}>
                                <Card.Title
                                    title={item.name}
                                    subtitle={item.degree}
                                    titleStyle={styles.cardTitle}
                                    subtitleStyle={styles.cardSubtitle}
                                />
                                <Card.Cover
                                    source={{ uri: item.picture }}
                                    style={styles.cardImage}
                                />
                            </Card>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.name}
                    contentContainerStyle={styles.listContentContainer}
                />)}
        </View>
    );
};

const styles = StyleSheet.create({
    generalContainer: {
        flex: 1,
        backgroundColor: "#C02830",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 60,
    },
    flatListContainer: {
        width: "100%", backgroundColor: "white", margin: 0, padding: 10,
    },
    standardLogo: {
        resizeMode: "contain",
        height: 60,
        marginBottom: 20,
    },
    logoContainer: {
        backgroundColor: "#C02830",
    },
    searchAndFilterContainer: {
        flexDirection: "row",
        backgroundColor: "#C02830",
        width: "120%",
        paddingHorizontal: 40,
        alignItems: "center",
        marginLeft: 15,
    },
    searchbar: {
        height: 60,
        flex: 1,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    searchbarInput: {
        fontSize: 16,
    },
    listContentContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    cardTouch: {
        marginBottom: 30,
    },
    card: {
        borderRadius: 8,
        elevation: 5,
        shadowColor: "#000",
        backgroundColor: "#bc9c1c",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000",
        textTransform: "uppercase",
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#000",
        textAlign: "center",
    },
    cardImage: {
        height: 150,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
});

export default GeneralView;
