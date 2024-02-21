import axios from "axios";

export async function getProject(name) {
  var apiUrl = 'http://107.21.99.46:8080/votApp/project?nom=' + name;

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      var data = response.data;
      if (data) {
        return data;
      } else {
        console.error("El array de proyectos está vacío");
        return []; // Devuelve un array vacío si no hay datos
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error("No se encontró el proyecto" + error);
    } else {
      alert("Error al buscar." +  error);
      console.error(error);
    }
    return []; // Maneja el error devolviendo un array vacío
  }
}

export async function getProjectFilter(degree) {
  console.log("Grado: " + degree);
  var apiUrl = 'http://107.21.99.46:8080/votApp/project?nom=all';

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      var data = response.data;
      // Si el parámetro es all devolverá todos los proyectos
      if (degree === "all") {
        console.log("Proyectos encontrados");
        return data
      } else {
        var filteredProjects = data.filter(project => project.degree === degree);
        // Si existen proyectos con ese grado, los devolverá
        if (filteredProjects && Array.isArray(filteredProjects) && filteredProjects.length > 0) {
          console.log("Proyectos encontrados");
          return filteredProjects;
        } else {
          // En caso contrario devolverá un array vacío
          console.log("El array de proyectos está vacío");
          return [];
        }
      }
    }
  } catch (error) {
    alert("Error al buscar. " + error);
    console.error(error);
    return [];
  }
}
