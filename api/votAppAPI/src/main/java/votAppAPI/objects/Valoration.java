package votAppAPI.objects;

public class Valoration {
	
    private String nie;
    private int originality;
    private int innovation;
    private int ods;
        
    
    /**
     * Default constructor for the Valoration class.
     */
    public Valoration() {
        super();
    }

    /**
     * Parameterized constructor for the Valoration class.
     *
     * @param nie The NIE (identification number) associated with the valuation.
     * @param originality The originality score of the valuation.
     * @param innovation The innovation score of the valuation.
     * @param ods The ODS (Sustainable Development Goals) score of the valuation.
     */
    public Valoration(String nie, int originality, int innovation, int ods) {
        super();
        this.nie = nie;
        this.originality = originality;
        this.innovation = innovation;
        this.ods = ods;
    }

    /**
     * Retrieves the NIE (identification number) associated with the valuation.
     *
     * @return The NIE associated with the valuation.
     */
    public String getNie() {
        return nie;
    }

    /**
     * Sets the NIE (identification number) associated with the valuation.
     *
     * @param nie The NIE associated with the valuation to set.
     */
    public void setNie(String nie) {
        this.nie = nie;
    }

    /**
     * Retrieves the originality score of the valuation.
     *
     * @return The originality score of the valuation.
     */
    public int getOriginality() {
        return originality;
    }

    /**
     * Sets the originality score of the valuation.
     *
     * @param originality The originality score of the valuation to set.
     */
    public void setOriginality(int originality) {
        this.originality = originality;
    }

    /**
     * Retrieves the innovation score of the valuation.
     *
     * @return The innovation score of the valuation.
     */
    public int getInnovation() {
        return innovation;
    }

    /**
     * Sets the innovation score of the valuation.
     *
     * @param innovation The innovation score of the valuation to set.
     */
    public void setInnovation(int innovation) {
        this.innovation = innovation;
    }

    /**
     * Retrieves the ODS (Sustainable Development Goals) score of the valuation.
     *
     * @return The ODS score of the valuation.
     */
    public int getOds() {
        return ods;
    }

    /**
     * Sets the ODS (Sustainable Development Goals) score of the valuation.
     *
     * @param ods The ODS score of the valuation to set.
     */
    public void setOds(int ods) {
        this.ods = ods;
    }
    
    

}
