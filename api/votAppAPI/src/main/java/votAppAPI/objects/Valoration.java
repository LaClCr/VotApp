package votAppAPI.objects;

public class Valoration {
	
    private String nie;
    private int originality;
    private int innovation;
    private int ods;
        
    
	public Valoration() {
		super();
	}

	public Valoration(String nie, int originality, int innovation, int ods) {
		super();
		this.nie = nie;
		this.originality = originality;
		this.innovation = innovation;
		this.ods = ods;
	}

	public String getNie() {
		return nie;
	}

	public void setNie(String nie) {
		this.nie = nie;
	}

	public int getOriginality() {
		return originality;
	}

	public void setOriginality(int originality) {
		this.originality = originality;
	}

	public int getInnovation() {
		return innovation;
	}

	public void setInnovation(int innovation) {
		this.innovation = innovation;
	}

	public int getOds() {
		return ods;
	}

	public void setOds(int ods) {
		this.ods = ods;
	}
    
    

}
