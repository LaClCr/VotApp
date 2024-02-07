package votAppAPI.objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;


@Document(collection="projects")
public class Project {
	
	@Id
	private String id;
	private String name;
    private String degree;
    private String description;
    private String picture;
    private List<TeamMember> teamMembers;
    private String projectRepresentative;
    private List<Valoration> valorations;
    
    
	public Project() {
		super();
	}


	public Project(String name, String degree, String description, String picture, List<TeamMember> teamMembers,
			String projectRepresentative, List<Valoration> valorations) {
		super();
		this.name = name;
		this.degree = degree;
		this.description = description;
		this.picture = picture;
		this.teamMembers = teamMembers;
		this.projectRepresentative = projectRepresentative;
		this.valorations = valorations;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDegree() {
		return degree;
	}


	public void setDegree(String degree) {
		this.degree = degree;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getPicture() {
		return picture;
	}


	public void setPicture(String picture) {
		this.picture = picture;
	}


	public List<TeamMember> getTeamMembers() {
		return teamMembers;
	}


	public void setTeamMembers(List<TeamMember> teamMembers) {
		this.teamMembers = teamMembers;
	}


	public String getProjectRepresentative() {
		return projectRepresentative;
	}


	public void setProjectRepresentative(String projectRepresentative) {
		this.projectRepresentative = projectRepresentative;
	}


	public List<Valoration> getValorations() {
		return valorations;
	}


	public void setValorations(List<Valoration> valorations) {
		this.valorations = valorations;
	}
    
    
}
