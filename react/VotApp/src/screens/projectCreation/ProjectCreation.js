import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Button, Chip, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import ScreensContext from "./projectCreationScreensContext";
import FloridaHeader from "../../components/FloridaHeader";
import { postProject } from "../../scripts/postProject";
import { validateNIF } from "../../scripts/validateNIF";


const ProjectCreation = () => {
  const navigation = useNavigation();

  const { selectedDegree, setSelectedDegree } = useContext(ScreensContext);

  const [projectName, setProjectName] = useState("");
  const [representativeDNI, setRepresentativeDNI] = useState("");
  const [description, setDescription] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [projectLogo, setProjectLogo] = useState(null);
  const [logoLoaded, setLogoLoaded] = useState(false);

  const handleAddParticipant = () => {
    if (participantName) {
      setParticipants([...participants, participantName]);
      setParticipantName("");
    }
  };

  const handleDeleteParticipant = (indexToDelete) => {
    setParticipants((currentParticipants) =>
      currentParticipants.filter((_, index) => index !== indexToDelete)
    );
  };

  const confirmDelete = (participant, index) => {
    Alert.alert(
      "Borrar miembro",
      `¿Estás seguro de que deseas borrar el miembro ${participant}?`,
      [
        { text: "Cancelar" },
        { text: "Continuar", onPress: () => handleDeleteParticipant(index) },
      ]
    );
  };


  const handleCreateProject = async () => {
    if (!projectName || !selectedDegree || !description || !projectLogo || !representativeDNI || participants.length === 0) {
      alert("Por favor, completa todos los campos.");
      return;
    } else {
      if (representativeDNI.length !== 9) {
        alert("El DNI/NIE del representante debe tener 9 caracteres.");
        return;
      }
      if(!validateNIF(representativeDNI)) {
        alert("El DNI/NIE del representante no es válido.");
        return;
      }

    }

    const project = {
      name: projectName,
      degree: selectedDegree.abbreviation,
      description: description,
      picture: projectLogo.uri,
      creator: representativeDNI,
      teamMembers: participants.map(name => ({ name })),
      valorations: []
    };

    console.log(project);

    try {
      let response = await postProject(project);
      if (response.status === 201) {
        navigation.navigate('ConfirmationScreenCreation');
      } else if (response.status === 403) {
        alert("No puedes crear un proyecto si ya tienes uno en curso.");
      }else{
        alert("No se pudo crear el proyecto. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al crear el proyecto", error);
      alert("No se pudo crear el proyecto. Por favor, inténtalo de nuevo.");
    }
  };


  const handleRequestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Sin permisos de galería",
        "Necesitamos permisos para acceder a tu galería para seleccionar una imagen."
      );
    }
  };

  const handleSelectLogo = async () => {

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (
      !pickerResult.cancelled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const selectedImage = pickerResult.assets[0];
      setProjectLogo({ uri: selectedImage.uri });
      setLogoLoaded(true);
    }
  };


  const renderParticipant = ({ item, index }) => (
    <TouchableOpacity onPress={() => confirmDelete(item, index)}>
      <Chip style={styles.chip} textStyle={styles.chipText} mode="outlined">
        {item}
      </Chip>
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.generalContainer}>
      <View style={styles.logoContainer}>
        <FloridaHeader />
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.sectionTitle}>
            <Text style={styles.title}>Crear proyecto</Text>
          </View>
          <View style={styles.sectionInfoSmall}>
            <Text style={styles.textInfoTitle}>Imagen:</Text>
          </View>
          <View style={styles.sectionInfo}>
            <View style={styles.sectionInfoSmall}>
              <TouchableOpacity
                onPress={handleSelectLogo}
                style={styles.logoButton}
              >
                {projectLogo ? (
                  <Image
                    source={{ uri: projectLogo.uri }}
                    style={styles.projectLogo}
                  />
                ) : (
                  <Image
                    source={require("../../assets/addImage.png")}
                    style={styles.projectLogo}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <Divider />
          <View style={styles.sectionInfoSmall}>
            <Text style={styles.textInfoTitle}>Nombre del proyecto:</Text>
          </View>
          <View style={styles.sectionInfo}>
            <TextInput
              style={[styles.input, styles.inputMargin]}
              placeholder="Introduce nombre..."
              value={projectName}
              onChangeText={(text) => setProjectName(text)}
              mode="outlined"
              outlineColor="#C02830"
              activeOutlineColor="#C02830"
              theme={{
                colors: {
                  primary: "#C02830",
                  underlineColor: "transparent",
                  background: "#ffffff",
                },
              }}
            />
          </View>
          <Divider />
          <View style={styles.sectionInfoSmall}>
            <Text style={styles.textInfoTitle}>Descripción:</Text>
          </View>
          <View style={styles.sectionInfo}>
            <TextInput
              style={[
                styles.input,
                styles.inputMargin,
                styles.descriptionInput,
              ]}
              placeholder="Describe tu proyecto..."
              value={description}
              onChangeText={(text) => setDescription(text)}
              mode="outlined"
              multiline
              numberOfLines={4}
              theme={{
                colors: {
                  primary: "#C02830",
                  underlineColor: "transparent",
                  background: "#ffffff",
                },
              }}
            />
          </View>
          <Divider />
          <View style={styles.sectionInfoSmall}>
            <Text style={styles.textInfoTitle}>Miembros del equipo:</Text>
          </View>
          <View style={styles.sectionInfo}>
            <TextInput
              style={styles.input}
              placeholder="Añadir miembro..."
              value={participantName}
              onChangeText={(text) => setParticipantName(text)}
              mode="outlined"
              theme={{
                colors: {
                  primary: "#C02830",
                  underlineColor: "transparent",
                  background: "#ffffff",
                },
              }}
            />
            <Button
              mode="contained"
              onPress={handleAddParticipant}
              labelStyle={{ fontSize: 20, textAlign: "center" }}
              contentStyle={{ justifyContent: "center", alignContent: "center" }}
              style={styles.addButton}
            >
              +
            </Button>
          </View>
          <View style={styles.sectionInfo}>
            <Text>Presiona sobre un miembro para eliminarlo</Text>
          </View>
          <View style={styles.sectionParticipants}>
            <FlatList
              data={participants}
              renderItem={renderParticipant}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1, flexWrap: "wrap" }}
            />
          </View>
          <View style={styles.sectionInfoSmall}>
            <Text style={styles.textInfoTitle}>NIF/NIE del representante:</Text>
          </View>
          <View style={styles.sectionInfo}>
            <TextInput
              style={[styles.input, styles.inputMargin]}
              placeholder="Representative DNI"
              value={representativeDNI}
              onChangeText={(text) => setRepresentativeDNI(text)}
              mode="outlined"
              theme={{
                colors: {
                  primary: "#C02830",
                  underlineColor: "transparent",
                  background: "#ffffff",
                },
              }}
            />
          </View>
          <View style={styles.sectionButton}>
            <Button onPress={handleCreateProject} icon="plus" mode="contained" buttonColor="#C02830">CREAR PROYECTO</Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  electLogoButton: {
    padding: 10, // Añadir padding para el área táctil
    borderRadius: 5, // Bordes redondeados
    backgroundColor: "#E1E1E1", // Color de fondo
    alignItems: "center",
    justifyContent: "center",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginBottom: 20,
  },
  logoButton: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  projectLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  logoText: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
  iconButton: {
    backgroundColor: "#E8E8E8", // Un color de fondo claro
    borderRadius: 50, // Hacer el botón completamente redondo
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  descriptionInput: {
    textAlignVertical: "top",
    height: 100,
  },
  inputMargin: {
    marginBottom: 15,
  },
  participantContainerMargin: {
    marginBottom: 12,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60,
  },
  card: {
    width: "90%",
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  logo: {
    width: 500, // Ajusta el ancho según tus necesidades
    height: 100, // Ajusta la altura según tus necesidades
    marginBottom: 20,
    // Añade resizeMode si es necesario, por ejemplo: resizeMode: 'contain'
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    backgroundColor: "white",
    fontSize: 18,
    flex: 1,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#e1e1e1", // Un color de fondo gris claro
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#B58933",
    marginLeft: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  participantInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
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
  sectionParticipants: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
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
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  textInfoTitle: {
    fontSize: 16,
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

export default ProjectCreation;
