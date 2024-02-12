function deleteProjectByCreator(creator) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/borrarProject?creator=' + creator;

  axios.delete(apiUrl)
    .then(function (response) {
      if (response.status === 200) {
        console.error("Proyecto borrado exitosamente.");
      } else if (response.status === 500) {
        console.error("No se ha encontrado ningún proyecto asignado a ese usuario.");
      }
    })
    .catch(function (error) {
      console.error("Error al intentar borrar el proyecto:", error);
    });
}
