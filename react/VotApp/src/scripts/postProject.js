function createProject(data) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/nouProjecte';

  axios.post(apiUrl, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function (response) {
    if (response.status === 201) {
      console.log("Proyecto creado exitosamente");
    } else {
      console.error("Error al crear el proyecto. Código de estado:", response.status);
    }
  })
  .catch(function (error) {
    console.error("Error al crear el proyecto:", error);
  });
}
