import axios from "axios";

export async function getDegree(abbreviation) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/degree?abbreviation=' + abbreviation;

  return axios.get(apiUrl) // Devuelve la promesa resultante de axios.get
    .then(function (response) {
      if (response.status === 200) {
        var data = response.data;
        if (data && Array.isArray(data) && data.length > 0) {
          console.log("Grados encontrados");
          return data;
        } else {
          console.error("El array de grados está vacío");
          return []; // Devuelve un array vacío en caso de que no haya datos
        }
      }
    })
    .catch(function (error) {
      if (error.response && error.response.status === 404) {
        console.error("No se encontró el grado");
      } else {
        console.error("Error al buscar.", error);
      }
      return []; // Devuelve un array vacío en caso de error
    });
}
