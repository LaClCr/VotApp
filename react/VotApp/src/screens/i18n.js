import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Tus recursos de traducción
const resources = {
  en: {
    translation: {
      "Settings": "Settings",
      "Modo Oscuro": "Dark Mode",
      "Modo Claro": "Light Mode",
      "Idioma": "Language",
      "Español": "Spanish",
      "English": "English",
      "Proyecto Actual:": "Current Project:",
      "Eliminar Proyecto": "Delete Project",
      "¿Estás seguro de que quieres eliminar este proyecto?": "Are you sure you want to delete this project?",
      "Cancelar": "Cancel",
      "Eliminar": "Delete",
      "Introduce el código de acceso:": "Please enter the access code:",
      "Acceso denegado": "Access denied",
      "Acceder": "Submit",
      "Código...": "Code...",
      "El código introducido no es correcto.": "The enter code is not correct.",
      "Crear un Proyecto:" : "Create a Project:",
      "Logo del Proyecto" : "Project Logo",
      "Cargado" : "Loaded",
      "Nombre":"Name",
      "Descripción":"Description",
      "DNI del Representante": "Representative DNI",
      "Añadir Participante": "Add Participant",
      "Crear Proyecto":"Create Project",
      "Eliminar Participante" : "Delete Participant",
      "Estás seguro de eliminar a ${participant}?" : "Are you sure you want to remove ${participant}",
      "Permiso Denegado" : "Permission Denied",
      "Tienes que conceder acceso a la galería para elegir una imagen." : "You need to grant gallery access to choose an image.",
      "Buscar..." : "Search...",
      "Grado" : "Degree",
      "TITULACIÓN" : "DEGREE",
      "DESCRIPCIÓN": "DESCRIPTION",
      "INTEGRANTES": "MEMBERS",
      "VALORACIONES": "VALUATIONS",
      "Originalidad": "Originality",
      "Innovación" : "Innovation",
      "VALORAR" : "EVALUATE",
      "VALORA ESTE PROYECTO" :  "VALUE THIS PROJECT",
      "ENVIAR VALORACIÓN" : "SEND RATING",
      "Configuración" : "Settings",
      "Inicio" : "Home",
      "Scanner" : "Scanner",
      "Crear" : "Create",
      "Solicitando permiso para acceder a la cámara..." : "Requesting permission to access the chamber...",
      "No se ha concedido acceso a la cámara" : "Access to the chamber has not been granted",
      "Escanear de nuevo" : "Scan again",
      // Añade más traducciones aquí
    }
  },
  es: {
    translation: {
      "Settings": "Configuración",
      "Modo Oscuro": "Modo Oscuro",
      "Modo Claro": "Modo Claro",
      "Idioma": "Idioma",
      "Español": "Español",
      "English": "Inglés",
      "Eliminar Proyecto": "Eliminar Proyecto",
      "Proyecto Actual:": "Proyecto Actual:",
      "¿Estás seguro de que quieres eliminar este proyecto?": "¿Estás seguro de que quieres eliminar este proyecto?",
      "Cancelar": "Cancelar",
      "Eliminar": "Eliminar",
      "Introduce el código de acceso:": "Introduce el código de acceso:",
      "Acceso denegado": "Acceso denegado",
      "Acceder": "Acceder",
      "Código...": "Código...",
      "El código introducido no es correcto.": "El código introducido no es correcto.",
      "Crear un Proyecto:" : "Crear un Proyecto:",
      "Logo del Proyecto" : "Logo del Proyecto",
      "Cargado" : "Cargado",
      "Nombre":"Nombre",
      "Descripción":"Descripción",
      "DNI del Representante": "DNI del Representante",
      "Añadir Participante": "Añadir Participante",
      "Crear Proyecto":"Crear Proyecto",
      "Eliminar Participante" : "Eliminar Participante",
      "Estás seguro de eliminar a ${participant}?" : "Estás seguro de eliminar a ${participant}? ",
      "Permiso Denegado" : "Permiso Denegado",
      "Tienes que conceder acceso a la galería para elegir una imagen." : "Tienes que conceder acceso a la galería para elegir una imagen.",
      "Buscar..." : "Buscar...",
      "Grado" : "Grado",
      "TITULACIÓN" : "TITULACIÓN",
      "DESCRIPCIÓN": "DESCRIPCIÓN",
      "INTEGRANTES": "INTEGRANTES",
      "VALORACIONES" : "VALORACIONES",
      "Originalidad":"Originalidad",
      "Innovación" :"Innovación",
      "VALORAR" : "VALORAR",
      "VALORA ESTE PROYECTO" : "VALORA ESTE PROYECTO",
      "ENVIAR VALORACIÓN" : "ENVIAR VALORACIÓN", 
      "Configuración" : "Configuración",
      "Inicio" : "Inicio",
      "Scanner" : "Scanner",
      "Crear" : "Crear",
      "Solicitando permiso para acceder a la cámara..." : "Solicitando permiso para acceder a la cámara...",
      "No se ha concedido acceso a la cámara" :  "No se ha concedido acceso a la cámara",
      "Escanear de nuevo" : "Escanear de nuevo",
      // Añade más traducciones aquí
    }
  },
  // Añade otros idiomas aquí
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
