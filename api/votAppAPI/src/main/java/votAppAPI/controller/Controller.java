package votAppAPI.controller;

import java.util.List;

import org.bson.json.JsonObject;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import votAppAPI.objects.Degree;
import votAppAPI.objects.Project;
import votAppAPI.objects.TeamMember;
import votAppAPI.objects.Valoration;
import votAppAPI.repository.DegreeRepository;
import votAppAPI.repository.ProjectRepository;

@RestController
public class Controller {

	@Autowired
	private DegreeRepository degreeRepository;
	@Autowired
	private ProjectRepository projectRepository;

	@GetMapping("/votApp/project")
	public ResponseEntity<String> tornaInfoProjecte(@RequestParam(value = "nom") String strVariable) {

		if (strVariable.equals("all")) {
			List<Project> listAllProjects = projectRepository.findAll();
			String json = "[";

			for (Project project : listAllProjects) {
				String name = project.getName();
				String degree = project.getDegree();
				String description = project.getDescription();
				String picture = project.getPicture();
				String creator = project.getCreator();
				List<TeamMember> teamMembers = project.getTeamMembers();
				List<Valoration> valorations = project.getValorations();

				json += "{\"name\": \"" + name + "\", \"degree\": \"" + degree + "\", \"description\": \"" + description
						+ "\", \"picture\": \"" + picture + "\", \"creator\": \"" + creator + "\"teamMembers\": [";

				for (TeamMember teamMember : teamMembers) {
					json += "{\"name\": \"" + teamMember.getName() + "\"},";
				}

				if (!teamMembers.isEmpty()) {
					json = json.substring(0, json.length() - 1); // Eliminar la coma extra al final
				}

				json += "], \"valorations\": [";

				for (Valoration valoration : valorations) {
					String nie = valoration.getNie();
					int originality = valoration.getOriginality();
					int innovation = valoration.getInnovation();
					int ods = valoration.getOds();

					json += "{\"nie\": \"" + nie + "\", \"originality\": " + originality + ", \"innovation\": "
							+ innovation + ", \"ods\": " + ods + "},";
				}

				if (!valorations.isEmpty()) {
					json = json.substring(0, json.length() - 1); // Eliminar la coma extra al final
				}

				json += "]},";
			}

			if (!listAllProjects.isEmpty()) {
				json = json.substring(0, json.length() - 1); // Eliminar la coma extra al final
			}

			json += "]";

			return ResponseEntity.status(HttpStatus.OK).body(json);
		} else {
			Project project = projectRepository.findByName(strVariable);

			if (project != null) {
				String name = project.getName();
				String degree = project.getDegree();
				String description = project.getDescription();
				String picture = project.getPicture();
				String creator = project.getCreator();
				List<TeamMember> teamMembers = project.getTeamMembers();
				List<Valoration> valorations = project.getValorations();

				String json = "{\"name\": \"" + name + "\", \"degree\": \"" + degree + "\", \"description\": \"" + description
						+ "\", \"picture\": \"" + picture + "\", \"creator\": \"" + creator + "\"teamMembers\": [";

				for (TeamMember teamMember : teamMembers) {
					json += "{\"name\": \"" + teamMember.getName() + "\"},";
				}

				if (!teamMembers.isEmpty()) {
					json = json.substring(0, json.length() - 1); // Eliminar la coma extra al final
				}

				json += "], \"valorations\": [";

				for (Valoration valoration : valorations) {
					String nie = valoration.getNie();
					int originality = valoration.getOriginality();
					int innovation = valoration.getInnovation();
					int ods = valoration.getOds();

					json += "{\"nie\": \"" + nie + "\", \"originality\": " + originality + ", \"innovation\": "
							+ innovation + ", \"ods\": " + ods + "},";
				}

				if (!valorations.isEmpty()) {
					json = json.substring(0, json.length() - 1); // Eliminar la coma extra al final
				}

				json += "]}";

				return ResponseEntity.status(HttpStatus.OK).body(json);
			} else {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Project not found");
			}
		}
	}

	@GetMapping("/votApp/degree")
	public ResponseEntity<String> tornaInfoDegree(@RequestParam(value = "abbreviation") String strVariable) {

		if (strVariable.equals("all")) {
			List<Degree> listAllDegrees = degreeRepository.findAll();
			String json = "[";

			for (Degree degree : listAllDegrees) {
				String name = degree.getName();
				String abbreviation = degree.getAbbreviation();
				String code = degree.getCode();

				json += "{\"name\": \"" + name + "\", \"abbreviation\": \"" + abbreviation + "\", \"code\": \"" + code
						+ "\"},"; // Agregar coma para separar elementos
			}

			if (!listAllDegrees.isEmpty()) {
				json = json.substring(0, json.length() - 1); // Eliminar la coma extra al final
			}

			json += "]";

			return ResponseEntity.status(HttpStatus.OK).body(json);
		} else {
			Degree degree = degreeRepository.findByAbbreviation(strVariable);
			String json = "";

			String name = degree.getName();
			String abbreviation = degree.getAbbreviation();
			String code = degree.getCode();

			json += "{\"name\": \"" + name + "\", \"abbreviation\": \"" + abbreviation + "\", \"code\": \"" + code
					+ "\"}"; // Agregar coma para separar elementos

			return ResponseEntity.status(HttpStatus.OK).body(json);
		}
	}


	@PostMapping("votApp/nouProjecte")
	ResponseEntity<String> postNouProjecte(@RequestBody Project project) {

		String name = project.getName();
		if (!projectExists(name)) {
			projectRepository.save(project);
			return ResponseEntity.status(HttpStatus.OK).build();
		} else {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("El proyecto con el nombre " + name + " ya existe.");
		}

	}
	
	@PutMapping("votApp/novaRessenya")
	public ResponseEntity<String> putNovaRessenya(@RequestParam(value = "name") String projectName, @RequestBody String valuationJSON) {
		try {

	        Project project = projectRepository.findByName(projectName);
	        
	        if (project != null) {
	            // Parsear la nueva valoración
	            JSONObject valuationObj = new JSONObject(valuationJSON);
	            String nie = valuationObj.getString("nie");
	            int originality = valuationObj.getInt("originality");
	            int innovation = valuationObj.getInt("innovation");
	            int ods = valuationObj.getInt("ods");
	            
	            if (!valorationExistsWithNie(nie, project)) {					
	            	// Crear la nueva valoración
	            	Valoration novaValoracio = new Valoration(nie, originality, innovation, ods);

	            	// Agregar la nueva valoración al proyecto
	            	project.getValorations().add(novaValoracio);

	            	// Actualizar el proyecto en el repositorio
	            	projectRepository.save(project);
	            	return ResponseEntity.status(HttpStatus.OK).build();
				} else {
					return ResponseEntity.status(HttpStatus.CONFLICT).body(nie + " ya ha valorado este proyecto.");
				}
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("El proyecto con el nombre " + projectName + " no se encontró.");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
		
	}
	
	


	public boolean projectExists(String nom) {
		boolean exists = false;
		List<Project> listAllProjects = projectRepository.findAll();

		for (Project project : listAllProjects) {
			if (project.getName().equals(nom)) {
				exists = true;
			}
		}
		return exists;
	}
	
	public boolean valorationExistsWithNie(String nie, Project project) {
		boolean exists = false;
		List<Valoration> valorations = project.getValorations();
		for (Valoration valoration : valorations) {
			if (valoration.getNie().equals(nie)) {
				exists = true;
			}
		}
		return exists;
	}
}
