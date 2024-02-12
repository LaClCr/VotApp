import axios from 'axios';

export async function putProject(name, valoracion) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/novaRessenya?name=' + name;

  return axios.put(apiUrl, valoracion, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function (response) {
    if (response.status === 201) {
      console.log("Reseña actualizada exitosamente.");
      return true;
    } else {
      console.error("Error al actualizar la reseña. Código de estado:", response.status);
      return false;
    }
  })
  .catch(function (error) {
    console.error("Error al actualizar la reseña:", error);
    return false;
  });
}
