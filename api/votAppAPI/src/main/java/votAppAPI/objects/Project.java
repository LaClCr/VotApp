package votAppAPI.objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;


/**
 * Represents a project entity.
 */

@Document(collection="projects")
public class Project {
	
	@Id
	private String id;
	private String name;
    private String degree;
    private String description;
    private String picture;
    private String creator;
    private List<TeamMember> teamMembers;
    private String projectRepresentative;
    private List<Valoration> valorations;
    
    
    /**
     * Default constructor for the Project class.
     */
    
    public Project() {
        super();
    }
    

    /**
     * Parameterized constructor for the Project class.
     *
     * @param id The identifier of the project.
     * @param name The name of the project.
     * @param degree The degree associated with the project.
     * @param description The description of the project.
     * @param picture The picture associated with the project.
     * @param creator The creator of the project.
     * @param teamMembers The team members associated with the project.
     * @param projectRepresentative The representative of the project.
     * @param valorations The valuations associated with the project.
     */

	public Project(String id, String name, String degree, String description, String picture, String creator,
			List<TeamMember> teamMembers, String projectRepresentative, List<Valoration> valorations) {
		super();
		this.id = id;
		this.name = name;
		this.degree = degree;
		this.description = description;
		this.picture = picture;
		this.creator = creator;
		this.teamMembers = teamMembers;
		this.projectRepresentative = projectRepresentative;
		this.valorations = valorations;
	}


	/**
     * Retrieves the name of the project.
     *
     * @return The name of the project.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the project.
     *
     * @param name The name of the project to set.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Retrieves the degree associated with the project.
     *
     * @return The degree associated with the project.
     */
    public String getDegree() {
        return degree;
    }

    /**
     * Sets the degree associated with the project.
     *
     * @param degree The degree associated with the project to set.
     */
    public void setDegree(String degree) {
        this.degree = degree;
    }

    /**
     * Retrieves the description of the project.
     *
     * @return The description of the project.
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the description of the project.
     *
     * @param description The description of the project to set.
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Retrieves the picture associated with the project.
     *
     * @return The picture associated with the project.
     */
    public String getPicture() {
        return picture;
    }

    /**
     * Sets the picture associated with the project.
     *
     * @param picture The picture associated with the project to set.
     */
    public void setPicture(String picture) {
        this.picture = picture;
    }


    /**
     * Retrieves the creator of the project.
     *
     * @return The creator of the project.
     */
    public String getCreator() {
        return creator;
    }

    /**
     * Sets the creator of the project.
     *
     * @param creator The creator of the project to set.
     */
    public void setCreator(String creator) {
        this.creator = creator;
    }

    /**
     * Retrieves the list of team members associated with the project.
     *
     * @return The list of team members associated with the project.
     */
    public List<TeamMember> getTeamMembers() {
        return teamMembers;
    }

    /**
     * Sets the list of team members associated with the project.
     *
     * @param teamMembers The list of team members to set.
     */
    public void setTeamMembers(List<TeamMember> teamMembers) {
        this.teamMembers = teamMembers;
    }

    /**
     * Retrieves the project representative.
     *
     * @return The project representative.
     */
    public String getProjectRepresentative() {
        return projectRepresentative;
    }

    /**
     * Sets the project representative.
     *
     * @param projectRepresentative The project representative to set.
     */
    public void setProjectRepresentative(String projectRepresentative) {
        this.projectRepresentative = projectRepresentative;
    }

    /**
     * Retrieves the list of valuations associated with the project.
     *
     * @return The list of valuations associated with the project.
     */
    public List<Valoration> getValorations() {
        return valorations;
    }

    /**
     * Sets the list of valuations associated with the project.
     *
     * @param valorations The list of valuations to set.
     */
    public void setValorations(List<Valoration> valorations) {
        this.valorations = valorations;
    }
    
    
}
