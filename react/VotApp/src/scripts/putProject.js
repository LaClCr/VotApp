import axios from 'axios';

export async function putProject(name, valoracion) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/novaRessenya?name=' + name;

  try {
    const response = await axios.put(apiUrl, valoracion, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 201) {
      console.log("Reseña actualizada exitosamente.");
    } else {
      console.error("Error al actualizar la reseña. Código de estado:", response.status);
    }

    return response; // Devuelve la respuesta de la solicitud HTTP
  } catch (error) {
    console.error("Error al actualizar la reseña:");
    throw error; // Lanza el error para que sea capturado por el bloque catch
  }
}
