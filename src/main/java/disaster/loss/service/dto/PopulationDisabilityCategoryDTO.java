package disaster.loss.service.dto;

import disaster.loss.domain.enumeration.DISABILITY;
import disaster.loss.domain.enumeration.HUMAN_POPULATION;

public class PopulationDisabilityCategoryDTO {

	private HUMAN_POPULATION populationType;

	private String disablity;

	private String ageRange;

	public PopulationDisabilityCategoryDTO(HUMAN_POPULATION populationType, String disablity, String ageRange) {
		super();
		this.populationType = populationType;
		this.disablity = disablity;
		this.ageRange = ageRange;
	}

	public HUMAN_POPULATION getPopulationType() {
		return populationType;
	}

	public void setPopulationType(HUMAN_POPULATION populationType) {
		this.populationType = populationType;
	}

	public String getDisablity() {
		return disablity;
	}

	public void setDisablity(String disablity) {
		this.disablity = disablity;
	}

	public String getAgeRange() {
		return ageRange;
	}

	public void setAgeRange(String ageRange) {
		this.ageRange = ageRange;
	}

	@Override
	public String toString() {
		return "PopulationDisabilityCategoryDTO [populationType=" + populationType + ", disablity=" + disablity
				+ ", ageRange=" + ageRange + "]";
	}

}
