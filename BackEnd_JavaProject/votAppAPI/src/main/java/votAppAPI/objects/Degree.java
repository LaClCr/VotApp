package votAppAPI.objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 * Represents a degree entity.
 */

@Document(collection="degrees")
public class Degree {

	@Id
	private String id;
	private String name;
    private String abbreviation;
    private String code;
    

    /**
     * Default constructor for the Degree class.
     */
    public Degree() {
        super();
    }

    /**
     * Parameterized constructor for the Degree class.
     *
     * @param name The full name of the degree.
     * @param abbreviation The abbreviation of the degree.
     * @param code The code associated with the degree.
     */
    public Degree(String name, String abbreviation, String code) {
        super();
        this.name = name;
        this.abbreviation = abbreviation;
        this.code = code;
    }

    /**
     * Retrieves the full name of the degree.
     *
     * @return The full name of the degree.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the full name of the degree.
     *
     * @param name The full name of the degree to set.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Retrieves the abbreviation of the degree.
     *
     * @return The abbreviation of the degree.
     */
    public String getAbbreviation() {
        return abbreviation;
    }

    /**
     * Sets the abbreviation of the degree.
     *
     * @param abbreviation The abbreviation of the degree to set.
     */
    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    /**
     * Retrieves the code associated with the degree.
     *
     * @return The code associated with the degree.
     */
    public String getCode() {
        return code;
    }

    /**
     * Sets the code associated with the degree.
     *
     * @param code The code associated with the degree to set.
     */
    public void setCode(String code) {
        this.code = code;
    }
    
    
}
