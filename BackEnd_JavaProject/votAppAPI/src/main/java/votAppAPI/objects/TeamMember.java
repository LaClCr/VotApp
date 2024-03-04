package votAppAPI.objects;

/**
 * Represents a team member involved in a project.
 */
public class TeamMember {
    
    private String name;

    /**
     * Parameterized constructor for the TeamMember class.
     *
     * @param name The name of the team member.
     */
    public TeamMember(String name) {
        super();
        this.name = name;
    }
    
    /**
     * Default constructor for the TeamMember class.
     */
    public TeamMember() {

    }

    /**
     * Retrieves the name of the team member.
     *
     * @return The name of the team member.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the team member.
     *
     * @param name The name of the team member to set.
     */
    public void setName(String name) {
        this.name = name;
    }
}