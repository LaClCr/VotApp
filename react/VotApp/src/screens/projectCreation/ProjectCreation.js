import React, { useState, useContext } from "react";
import * as FileSystem from "expo-file-system";
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
import { TextInput, Button, Chip, Divider, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import ScreensContext from "./projectCreationScreensContext";
import FloridaHeader from "../../components/FloridaHeader";
import { postProject } from "../../scripts/postProject";
import { validateNIF } from "../../scripts/validateNIF";
import { useTranslation } from "react-i18next";

const ProjectCreation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

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
      t("Borrar miembro"),
      t("Estás seguro de que deseas borrar el miembro") + ` ${participant}?`,
      [
        { text: t("Cancelar") },
        { text: t("Continuar"), onPress: () => handleDeleteParticipant(index) },
      ]
    );
  };

  const handleCreateProject = async () => {
    if (
      !projectName ||
      !selectedDegree ||
      !description ||
      !projectLogo ||
      !representativeDNI ||
      participants.length === 0
    ) {
      alert(t("Por favor, completa todos los campos."));
      return;
    } else {
      if (representativeDNI.length !== 9) {
        alert(t("El DNI/NIE del representante debe tener 9 caracteres."));
        return;
      }

      if (!validateNIF(representativeDNI)) {
        alert(t("El DNI/NIE del representante no es válido."));
        return;
      }
    }

    const project = {
      name: projectName,
      degree: selectedDegree.abbreviation,
      description: description,
      picture: projectLogo.uri,
      creator: representativeDNI,
      teamMembers: participants.map((name) => ({ name })),
      valorations: [],
    };

    console.log(project);

    try {
      let response = await postProject(project);
      if (response.status === 201) {
        navigation.navigate("ConfirmationScreenCreation");
      } else if (response.status === 403) {
        alert(t("No puedes crear un proyecto si ya tienes uno en curso."));
      } else {
        alert(
          t("No se pudo crear el proyecto. Por favor, inténtalo de nuevo.")
        );
      }
    } catch (error) {
      console.error("Error al crear el proyecto", error);
      alert(t("No se pudo crear el proyecto. Por favor, inténtalo de nuevo."));
    }
  };

  const handleRequestGalleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        t("Sin permisos de galería"),
        t(
          "Necesitamos permisos para acceder a tu galería para seleccionar una imagen."
        )
      );
    }
  };

  // Función para convertir una imagen a base64
  const imageToBase64 = async (uri) => {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64}`;
  };

  const handleSelectLogo = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const selectedImage = pickerResult.assets[0];
      let base64Image;
      try {
        base64Image = await imageToBase64(selectedImage.uri);
      } catch (error) {
        console.error("Error al convertir la imagen a base64", error);
        alert(t("No se pudo cargar la imagen. Por favor, inténtalo de nuevo."));
        return;
      }
      setProjectLogo({ uri: base64Image });
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
      <Card style={[styles.card]}>
        <View style={styles.sectionTitle}>
          <Text style={styles.title}>{t("Crear proyecto")}</Text>
        </View>
        <View style={styles.sectionInfoSmall}>
          <Text style={[styles.textInfoTitle]}>{t("Imagen")}:</Text>
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
          <Text style={[styles.textInfoTitle]}>
            {t("Nombre del proyecto")}:
          </Text>
        </View>
        <View style={styles.sectionInfo}>
          <TextInput
            style={[styles.input, styles.inputMargin]}
            placeholder={t("Introduce nombre...")}
            value={projectName}
            onChangeText={(text) => setProjectName(text)}
            mode="outlined"
            outlineColor="#C02830"
            activeOutlineColor="#C02830"
            theme={{
              colors: {
                primary: "#C02830",
              },
            }}
          />
        </View>
        <Divider />
        <View style={styles.sectionInfoSmall}>
          <Text style={[styles.textInfoTitle]}>{t("Descripción")}:</Text>
        </View>
        <View style={styles.sectionInfo}>
          <TextInput
            style={[styles.input, styles.inputMargin, styles.descriptionInput]}
            placeholder={t("Describe tu proyecto...")}
            value={description}
            onChangeText={(text) => setDescription(text)}
            mode="outlined"
            multiline
            numberOfLines={4}
            outlineColor="#C02830"
            activeOutlineColor="#C02830"
          />
        </View>
        <Divider />
        <View style={styles.sectionInfoSmall}>
          <Text style={[styles.textInfoTitle]}>
            {t("Miembros del equipo")}:
          </Text>
        </View>
        <View style={styles.sectionInfo}>
          <TextInput
            style={styles.input}
            placeholder={t("Añadir miembro...")}
            value={participantName}
            onChangeText={(text) => setParticipantName(text)}
            mode="outlined"
            outlineColor="#C02830"
            activeOutlineColor="#C02830"
          />
          <Button
            textColor="#fff"
            mode="contained"
            onPress={handleAddParticipant}
            labelStyle={{ fontSize: 20, textAlign: "center" }}
            contentStyle={{
              justifyContent: "center",
              alignContent: "center",
            }}
            style={styles.addButton}
          >
            +
          </Button>
        </View>
        <View style={styles.sectionInfo}>
          <Text>{t("Presiona sobre un miembro para eliminarlo")}</Text>
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
          <Text style={[styles.textInfoTitle]}>
            {t("NIF/NIE del representante")}:
          </Text>
        </View>
        <View style={styles.sectionInfo}>
          <TextInput
            style={[styles.input, styles.inputMargin]}
            placeholder={t("DNI del representante")}
            value={representativeDNI}
            onChangeText={(text) => setRepresentativeDNI(text)}
            mode="outlined"
            outlineColor="#C02830"
            activeOutlineColor="#C02830"
          />
        </View>
        <View style={styles.sectionButton}>
          <Button
            textColor="#fff"
            onPress={handleCreateProject}
            icon="plus"
            mode="contained"
            buttonColor="#C02830"
          >
            {t("CREAR PROYECTO")}
          </Button>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    backgroundColor: "#C02830",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 0.15,
    backgroundColor: "#C02830",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 60,
  },
  card: {
    backgroundColor: "#ede5c8",
    margin: 5,
    borderRadius: 10,
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
    color: "white",
  },
  sectionInfo: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  sectionParticipants: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  sectionButton: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
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
  descriptionInput: {
    textAlignVertical: "top",
    height: 100,
  },
  inputMargin: {
    marginBottom: 15,
  },
  input: {
    fontSize: 18,
    flex: 1,
  },
  addButton: {
    backgroundColor: "#C02830",
    marginLeft: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  chipText: {
    fontSize: 14,
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
});

export default ProjectCreation;
