export async function getProject(name) {
    var apiUrl = "http://107.21.99.46:8080/votApp/project?nom=" + name;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else if (response.status === 404) {
            console.error("No se encontró el proyecto");
        } else {
            console.error(
                "Error al buscar. Código de estado: " + response.status
            );
        }
    } catch (error) {
        console.error("Error al buscar." + error);
    }
}

export async function getProjectFilter(degree) {
    console.log("Grado: " + degree);
    var apiUrl = "http://107.21.99.46:8080/votApp/project?nom=all";

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            if (degree === "all") {
                console.log("Proyectos encontrados");
                return data;
            } else {
                var filteredProjects = data.filter(
                    (project) => project.degree === degree
                );
                if (filteredProjects.length > 0) {
                    console.log("Proyectos encontrados");
                    return filteredProjects;
                } else {
                    alert("No existen proyectos en este grado.");
                    console.log("El array de proyectos está vacío para esete grado.");
                    return [];
                }
            }
        } else if (response.status === 404) {
            alert("No se encontró el proyecto");
            console.error("No se encontró el proyecto");
        } else {
            alert("Error al buscar. Código de estado: " + response.status);
            console.error(
                "Error al buscar. Código de estado: " + response.status
            );
        }
    } catch (error) {
        alert("Error al buscar." + error);
        console.error("Error al buscar." + error);
        return [];
    }
}
