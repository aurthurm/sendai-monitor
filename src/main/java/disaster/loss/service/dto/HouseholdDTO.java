package disaster.loss.service.dto;

public class HouseholdDTO {

	private String householdTypeName;

	private Integer numberOfHouseholds;

	private Integer numberChildHeaded;

	private Integer numberFemaleHeaded;

	private Integer numberOfPeopleAffected;

	public String getHouseholdTypeName() {
		return householdTypeName;
	}

	public void setHouseholdTypeName(String householdTypeName) {
		this.householdTypeName = householdTypeName;
	}

	public Integer getNumberOfHouseholds() {
		return numberOfHouseholds;
	}

	public void setNumberOfHouseholds(Integer numberOfHouseholds) {
		this.numberOfHouseholds = numberOfHouseholds;
	}

	public Integer getNumberChildHeaded() {
		return numberChildHeaded;
	}

	public void setNumberChildHeaded(Integer numberChildHeaded) {
		this.numberChildHeaded = numberChildHeaded;
	}

	public Integer getNumberFemaleHeaded() {
		return numberFemaleHeaded;
	}

	public void setNumberFemaleHeaded(Integer numberFemaleHeaded) {
		this.numberFemaleHeaded = numberFemaleHeaded;
	}

	public Integer getNumberOfPeopleAffected() {
		return numberOfPeopleAffected;
	}

	public void setNumberOfPeopleAffected(Integer numberOfPeopleAffected) {
		this.numberOfPeopleAffected = numberOfPeopleAffected;
	}

	@Override
	public String toString() {
		return "HouseholdDTO [householdTypeName=" + householdTypeName + ", numberOfHouseholds=" + numberOfHouseholds
				+ ", numberChildHeaded=" + numberChildHeaded + ", numberFemaleHeaded=" + numberFemaleHeaded
				+ ", numberOfPeopleAffected=" + numberOfPeopleAffected + "]";
	}

}
