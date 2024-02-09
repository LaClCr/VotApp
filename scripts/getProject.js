function getProject(name) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/project?nom=' + name;

  axios.get(apiUrl)
    .then(function (response) {
      if (response.status === 200) {
        var data = response.data;
        if (data && Array.isArray(data) && data.length > 0) {
          console.log("Proyectos encontrados");
          return data;
        } else {
          console.error("El array de proyectos está vacío");
        }
      }
    })
    .catch(function (error) {
      if (error.response.status === 404) {
        console.error("No se encontró el proyecto");
      } else {
        alert("Error al buscar.");
        console.error(error);
      }
    });
}


function getProjectFilter(degree) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/project?nom=all';

  axios.get(apiUrl)
    .then(function (response) {
      if (response.status === 200) {
        var data = response.data;
        if (data && Array.isArray(data) && data.length > 0) {
          console.log("Proyectos encontrados");
          var filteredProjects = []; // Array para almacenar proyectos filtrados
          // Iterar sobre cada proyecto
          data.forEach(function(project) {
            if (project.degree === degree) {
              filteredProjects.push(project); // Agregar proyecto al arreglo filtrado
            }
          });
          return filteredProjects;
        } else {
          console.error("El array de proyectos está vacío");
        }
      }
    })
    .catch(function (error) {
        alert("Error al buscar.");
        console.error(error);
    });
}
