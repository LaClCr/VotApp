export async function getDegree(abbreviation) {
    var apiUrl =
        "http://107.21.99.46:8080/votApp/degree?abbreviation=" + abbreviation;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                console.log("Grados encontrados");
                return data;
            } else {
                console.error("El array de grados está vacío");
                return [];
            }
        } else if (response.status === 404) {
            alert("No se encontró el grado");
            console.error("No se encontró el grado");
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
