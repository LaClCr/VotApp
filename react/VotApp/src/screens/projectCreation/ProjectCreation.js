import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { TextInput, Button, Card, Chip, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";

const ProjectCreation = () => {
  const navigation = useNavigation();
  // Estados del proyecto
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
      "Delete participant",
      `Are you sure you want to remove ${participant}?`,
      [
        { text: "Cancel" },
        { text: "Yes", onPress: () => handleDeleteParticipant(index) },
      ]
    );
  };

  const handleCreateProject = () => {
    // Aquí iría la lógica para crear el proyecto, como validaciones y llamadas a APIs.
    console.log("Creando proyecto con los siguientes datos:");
    console.log("Nombre del Proyecto:", projectName);
    console.log("Descripción:", description);
    console.log("Participantes:", participants);
    console.log("Logo del Proyecto URI:", projectLogo?.uri);
  
    // Puedes añadir aquí una llamada a tu backend o lógica para guardar los datos del proyecto.
  };

  // asdasdasdasd
  

  const handleRequestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You need to grant gallery access to choose an image."
      );
    }
  };

  const handleSelectLogo = async () => {
    // Lanzar el selector de imágenes
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Asegura que solo se puedan seleccionar imágenes
      allowsEditing: true, // Permite al usuario editar la imagen
      aspect: [4, 3], // Aspecto para el editor de imágenes
      quality: 1, // Calidad de la imagen seleccionada
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

  // Añadir participante  a la lista de participantes y limpiar el input
  const renderParticipant = ({ item, index }) => (
    <TouchableOpacity onPress={() => confirmDelete(item, index)}>
      <Chip style={styles.chip} textStyle={styles.chipText} mode="outlined">
        {item}
      </Chip>
    </TouchableOpacity>
  );

  // El contenido principal de la pantalla se muestra solo si el usuario está autenticado
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/florida.jpg")}
          style={styles.logo}
        />
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.header}>Create a Project:</Text>
            <View style={styles.logoSection}>
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
                  <IconButton
                    icon="camera"
                    color="#C02830"
                    size={20}
                    style={styles.iconButton}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.logoText}>Project Logo</Text>
              {logoLoaded && <Text style={styles.loadedText}>Cargado</Text>}
            </View>
            <TextInput
              style={[styles.input, styles.inputMargin]}
              placeholder="Name"
              value={projectName}
              onChangeText={(text) => setProjectName(text)}
              mode="outlined"
              theme={{
                colors: {
                  primary: "#C02830",
                  underlineColor: "transparent",
                  background: "#ffffff",
                },
              }}
            />
            <TextInput
              style={[
                styles.input,
                styles.inputMargin,
                styles.descriptionInput,
              ]}
              placeholder="Description"
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
            <View
              style={[
                styles.participantInputContainer,
                styles.participantContainerMargin,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Add participant"
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
                style={styles.addButton}
              >
                +
              </Button>
            </View>
            <FlatList
              data={participants}
              renderItem={renderParticipant}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.participantList}
            />
            <Button
              mode="contained"
              onPress={handleCreateProject}
              style={{ marginTop: 15, backgroundColor: "#B58933" }}
            >
              Crear Proyecto
            </Button>
          </Card.Content>
        </Card>
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
    fontSize: 16,
    color: "#C02830",
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
  loadedText: {
    marginLeft: 10, // Espaciado desde el logo
    fontSize: 16, // Tamaño del texto
    color: "green", // Color del texto
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
  },
  participantInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  participantList: {
    marginTop: 10,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
  },
});

export default ProjectCreation;
