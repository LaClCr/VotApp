function getDegree(abbreviation) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/degree?abbreviation=' + abbreviation;

  axios.get(apiUrl)
    .then(function (response) {
      if (response.status === 200) {
        var data = response.data;
        if (data && Array.isArray(data) && data.length > 0) {
          console.log("Grados encontrados");
          return data;
        } else {
          console.error("El array de grados está vacío");
        }
      }
    })
    .catch(function (error) {
      if (error.response.status === 404) {
        console.error("No se encontró el grado");
      } else {
        alert("Error al buscar.");
        console.error(error);
      }
    });
  }
