import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Searchbar, Card, Text, Drawer  } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Asegúrate de importar desde @expo/vector-icons si estás utilizando Expo
import DropdownComponent from "../../components/projectView/DropdownComponent";
import FloridaHeader from "../../components/FloridaHeader";
import Image1 from "../../assets/ProyectoImagePrueba.jpg";

const GeneralView = ({ navigation }) => {
  // Asegúrate de pasar navigation como prop si planeas utilizarlo
  const projectData = [
    {
        id: 1,
        name: "HomeAPP",
        degree: "DAM",
        logo: Image1,
    },
    {
        id: 2,
        name: "Votapp",
        degree: "ASIR",
        logo: Image1,
    },
    {
        id: 3,
        name: "Proyecto C",
        degree: "DAW",
        logo: Image1,
    },
    {
        id: 4,
        name: "Proyecto D",
        degree: "Grado 4",
        logo: Image1,
    },
    {
        id: 5,
        name: "Proyecto E",
        degree: "Grado 5",
        logo: Image1,
    },
    {
        id: 6,
        name: "Proyecto F",
        degree: "DAM",
        logo: Image1,
    },
    {
        id: 7,
        name: "Proyecto G",
        degree: "Grado 7",
        logo: Image1,
    }
  ];

  const exampleDropdownData = [
    { label: "DAM", value: "DAM" },
    { label: "DAW", value: "DAW" },
    { label: "ASIR", value: "ASIR" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
    // Otros items...
  ];

  const [searchQuery, setSearchQuery] = useState("");
  
  const handleOnPress = (name) => {
    navigation.navigate("ProjectDetails", { name });
  };


  return (
    <View style={styles.generalContainer}>
        <FloridaHeader />
        <View style={styles.searchAndFilterContainer}>
            <Searchbar
                placeholder="Buscar..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
                inputStyle={styles.searchbarInput}
                iconColor={"#C02830"}
                clearIcon={() => (
                    <MaterialCommunityIcons name="close-circle" size={24} color="#C02830" />
                )}
            />
            <DropdownComponent data={exampleDropdownData} />
        </View>
        <FlatList
        style={{width: '100%'}}
            data={projectData}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleOnPress(item.name)} style={styles.cardTouch}>
                    <Card style={styles.card}>
                        <Card.Title title={item.name} subtitle={item.degree} titleStyle={styles.cardTitle} subtitleStyle={styles.cardSubtitle} />
                        <Card.Cover source={item.logo} style={styles.cardImage} />
                    </Card>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContentContainer}
        />
    </View>
);
};

const styles = StyleSheet.create({
generalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60,
},
searchAndFilterContainer: {
    flexDirection: "row",
    backgroundColor: '#C02830',
    width: '130%',
    paddingHorizontal: 40,
    alignItems: 'center'
},
searchbar: {
    height: 60,
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff'
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
    elevation: 5, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    backgroundColor: '#B58933',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
},
cardTitle: {
    fontSize: 18,
    color: "#000",
},
cardSubtitle: {
    fontSize: 14,
    color: "#fff",
},
cardImage: {
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
},
});

export default GeneralView;
