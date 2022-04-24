package disaster.loss.service.dto;

public class HumanPopulationFaltenerDTO {

	public HumanPopulationFaltenerDTO(String populationType, String disability, Integer displacedValue,
			Integer injuriesValue, Integer missingValue, Integer deathsValue, Integer illValue) {
		super();
		this.populationType = populationType;
		this.disability = disability;
		this.displacedValue = displacedValue;
		this.injuriesValue = injuriesValue;
		this.missingValue = missingValue;
		this.deathsValue = deathsValue;
		this.illValue = illValue;
	}

	public HumanPopulationFaltenerDTO() {
		super();
	}

	private String populationType;

	private String disability;

	private Integer displacedValue;

	private Integer injuriesValue;

	private Integer missingValue;

	private Integer deathsValue;

	private Integer illValue;

	public String getPopulationType() {
		return populationType;
	}

	public void setPopulationType(String populationType) {
		this.populationType = populationType;
	}

	public String getDisability() {
		return disability;
	}

	public void setDisability(String disablity) {
		this.disability = disablity;
	}

	public Integer getDisplacedValue() {
		return displacedValue;
	}

	public void setDisplacedValue(Integer displacedValue) {
		this.displacedValue = displacedValue;
	}

	public Integer getInjuriesValue() {
		return injuriesValue;
	}

	public void setInjuriesValue(Integer injuriesValue) {
		this.injuriesValue = injuriesValue;
	}

	public Integer getMissingValue() {
		return missingValue;
	}

	public void setMissingValue(Integer missingValue) {
		this.missingValue = missingValue;
	}

	public Integer getDeathsValue() {
		return deathsValue;
	}

	public void setDeathsValue(Integer deathsValue) {
		this.deathsValue = deathsValue;
	}

	public Integer getIllValue() {
		return illValue;
	}

	public void setIllValue(Integer illValue) {
		this.illValue = illValue;
	}

	@Override
	public String toString() {
		return "HumanPopulationFaltenerDTO [populationType=" + populationType + ", disablity=" + disability
				+ ", displacedValue=" + displacedValue + ", injuriesValue=" + injuriesValue + ", missingValue="
				+ missingValue + ", deathsValue=" + deathsValue + ", illValue=" + illValue + "]";
	}

}
