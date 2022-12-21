package disaster.loss.service.dto;

public class HouseholdCustomReportDTO {

	private String name;
	private int numberOfHouseholds;
	private int numberChildHeaded;
	private int numberFemaleHeaded;
	private int numberOfPeopleAffected;

	public HouseholdCustomReportDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public HouseholdCustomReportDTO(String name, int numberOfHouseholds, int numberChildHeaded, int numberFemaleHeaded,
			int numberOfPeopleAffected) {
		super();
		this.name = name;
		this.numberOfHouseholds = numberOfHouseholds;
		this.numberChildHeaded = numberChildHeaded;
		this.numberFemaleHeaded = numberFemaleHeaded;
		this.numberOfPeopleAffected = numberOfPeopleAffected;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getNumberOfHouseholds() {
		return numberOfHouseholds;
	}

	public void setNumberOfHouseholds(int numberOfHouseholds) {
		this.numberOfHouseholds = numberOfHouseholds;
	}

	public int getNumberChildHeaded() {
		return numberChildHeaded;
	}

	public void setNumberChildHeaded(int numberChildHeaded) {
		this.numberChildHeaded = numberChildHeaded;
	}

	public int getNumberFemaleHeaded() {
		return numberFemaleHeaded;
	}

	public void setNumberFemaleHeaded(int numberFemaleHeaded) {
		this.numberFemaleHeaded = numberFemaleHeaded;
	}

	public int getNumberOfPeopleAffected() {
		return numberOfPeopleAffected;
	}

	public void setNumberOfPeopleAffected(int numberOfPeopleAffected) {
		this.numberOfPeopleAffected = numberOfPeopleAffected;
	}

	@Override
	public String toString() {
		return "HouseholdCustomReportDTO [name=" + name + ", numberOfHouseholds=" + numberOfHouseholds
				+ ", numberChildHeaded=" + numberChildHeaded + ", numberFemaleHeaded=" + numberFemaleHeaded
				+ ", numberOfPeopleAffected=" + numberOfPeopleAffected + "]";
	}

}
