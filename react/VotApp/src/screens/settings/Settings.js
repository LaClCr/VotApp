import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import {
  Card,
  RadioButton,
  Button,
  IconButton,
} from "react-native-paper";
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Asegúrate de usar los códigos de idioma aquí
  const [language, setLanguage] = useState(i18n.language);
  const [project, setProject] = useState({ id: "1", name: "Mi Proyecto", logoUri: require("../../assets/logo.png") });

  const handleLanguageChange = (value) => {
    // Ajusta la lógica para usar códigos de idioma
    const languageCode = value === 'Español' ? 'es' : 'en';
    setLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleDeleteProject = (projectId) => {
    Alert.alert(
      "Eliminar Proyecto",
      "¿Estás seguro de que quieres eliminar este proyecto?",
      [
        { text: "Cancelar" },
        {
          text: "Eliminar",
          onPress: () =>
            setProject(null),
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

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={require("../../assets/florida.jpg")} style={styles.logo} />
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.header}>{t('Settings')}</Text>
            <View style={styles.switchContainer}>
              <Text style={styles.radioButtonLabel}>
                {isDarkMode ? t("Modo Oscuro") : t("Modo Claro")}
              </Text>
              <IconButton
                icon={isDarkMode ? "weather-night" : "white-balance-sunny"}
                color="#C02830"
                size={20}
                onPress={() => {}}
              />
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                color="#C02830"
              />
            </View>
            <Text style={styles.text}>{t("Idioma / Language")}</Text>
            <RadioButton.Group
              onValueChange={handleLanguageChange}
              value={language === 'en' ? 'English' : 'Español'}
            >
              <View style={styles.radioButtonContainer}>
                <RadioButton value="Español" color="#C02830" />
                <Text style={styles.radioButtonLabel}>{t("Español")} 🇪🇸</Text>
              </View>
              <View style={styles.radioButtonContainer}>
                <RadioButton value="English" color="#C02830" />
                <Text style={styles.radioButtonLabel}>{t("English")} 🇬🇧</Text>
              </View>
            </RadioButton.Group>
             {project && (
              <View style={styles.projectSection}>
                <Text style={styles.header}>
                  {t("Proyecto Actual:")} {project.name}
                </Text>
                <View style={{alignItems: "center", justifyContent: "center"}}>
                  <Image
                    source={project.logoUri}
                    style={styles.projectLogo}
                  />
                  <Button
                    icon="delete"
                    mode="contained"
                    style={{ backgroundColor: "#B58933" }}
                    onPress={handleDeleteProject}
                  >
                    {t("Eliminar Proyecto")}
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
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    marginBottom: 10
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
    color: "#000",
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: "#000",
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
