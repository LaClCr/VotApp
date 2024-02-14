import axios from 'axios';

export async function postProject(data) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/nouProjecte';

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      console.log("Proyecto creado exitosamente");
    } else {
      console.error("Error al crear el proyecto. Código de estado:", response.status);
    }

    return response; // Devuelve la respuesta de la solicitud HTTP
  } catch (error) {
    console.error("Error al crear el proyecto:", error);
    throw error; // Lanza el error para que sea capturado por el bloque catch
  }
}

/* try {
  let response = await putProject(selectedProject.name, stringValorationJSON);
  if (response.status === 201) {
      navigation.navigate(ConfirmationScreen);
  } else {
      alert("No se puede valorar dos veces con el mismo documento de identificación");
  }
} catch (error) {
  console.error("Error al enviar la valoración:", error);
  alert("Hubo un error al enviar la valoración. Por favor, inténtalo de nuevo.");
} */
