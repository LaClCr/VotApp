function updateReview(name, valoracion) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/novaRessenya?name=' + name;

  axios.put(apiUrl, valoracion, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function (response) {
    if (response.status === 200) {
      console.log("Reseña actualizada exitosamente.");
    } else {
      console.error("Error al actualizar la reseña. Código de estado:", response.status);
    }
  })
  .catch(function (error) {
    console.error("Error al actualizar la reseña:", error);
  });
}
