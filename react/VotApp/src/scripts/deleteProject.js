import axios from "axios";

export async function deleteProject(creator) {
  // Construye la URL de la API con el creador del proyecto como parámetro de consulta
  var apiUrl = 'http://107.21.99.46:8080/votApp/borrarProject?creator=' + creator;

  try {
    // Realiza la solicitud DELETE a la URL de la API
    const response = await axios.delete(apiUrl);
    
    // Maneja la respuesta según el estado recibido
    if (response.status === 200) {
      console.log("Proyecto borrado exitosamente.");
    } else if (response.status === 500) {
      console.error("No se ha encontrado ningún proyecto asignado a ese usuario.");
    }

    return response;
  } catch (error) {
    // Maneja los errores de la solicitud
    console.error("Error al intentar borrar el proyecto:", error);
  }
}
