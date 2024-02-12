import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import ProjectCreation from "./ProjectCreation";
import { useTranslation } from 'react-i18next';

const CodeAccess = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const checkCode = () => {
    if (code === '12345') {
      // Navegar a ProjectCreation si el código es correcto
      navigation.navigate('ProjectCreation'); // Asegúrate de que 'Create' es el nombre correcto de la ruta en tu navigator
    } else {
      Alert.alert(t('Acceso denegado'), t('El código introducido no es correcto.'));
    }
  };

  return (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <View style={styles.card}>
        <Text style={styles.header}>{t('Introduce el código de acceso:')}</Text>
        <TextInput
          style={[styles.input, styles.inputMargin]}
          onChangeText={setCode}
          value={code}
          placeholder={t('Código...')}
          keyboardType="numeric"
          mode="outlined"
          secureTextEntry // Opcional: Oculta el texto introducido
        />
        <Button
          mode="contained"
          onPress={() => checkCode()}
          style={{ marginTop: 80, backgroundColor: "#B58933" }}
        >
          <Text style={styles.textStyle}>{t('Acceder')}</Text>
        </Button>
      </View>
    </View>
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
export default CodeAccess;
