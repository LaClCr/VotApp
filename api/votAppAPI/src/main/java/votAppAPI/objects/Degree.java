package votAppAPI.objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection="degrees")
public class Degree {

	@Id
	private String id;
	private String name;
    private String abbreviation;
    private String code;
    

    
	public Degree() {
		super();
	}

	public Degree(String name, String abbreviation, String code) {
		super();
		this.name = name;
		this.abbreviation = abbreviation;
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
    
    
}
