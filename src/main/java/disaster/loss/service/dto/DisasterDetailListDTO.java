package disaster.loss.service.dto;

import java.util.List;

public class DisasterDetailListDTO {

	private String disasterName;

	private String caseNumber;

	private String locationName;

	private String disasterCategory;

	private String disasterType;

	private String cause;

	private String interventions;

	private String description;

	private List<HumanPopulationFaltenerDTO> humanPopulation;

	private List<InfrastructureDTO> infrastructure;

	private List<LiveStockDTO> liveStocks;

	private List<CropDTO> crops;

	public String getDisasterName() {
		return disasterName;
	}

	public void setDisasterName(String disasterName) {
		this.disasterName = disasterName;
	}

	public String getCause() {
		return cause;
	}

	public void setCause(String cause) {
		this.cause = cause;
	}

	public String getInterventions() {
		return interventions;
	}

	public void setInterventions(String interventions) {
		this.interventions = interventions;
	}

	public List<HumanPopulationFaltenerDTO> getHumanPopulation() {
		return humanPopulation;
	}

	public void setHumanPopulation(List<HumanPopulationFaltenerDTO> humanPopulation) {
		this.humanPopulation = humanPopulation;
	}

	public String getCaseNumber() {
		return caseNumber;
	}

	public void setCaseNumber(String caseNumber) {
		this.caseNumber = caseNumber;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

	public String getDisasterCategory() {
		return disasterCategory;
	}

	public void setDisasterCategory(String disasterCategory) {
		this.disasterCategory = disasterCategory;
	}

	public String getDisasterType() {
		return disasterType;
	}

	public void setDisasterType(String disasterType) {
		this.disasterType = disasterType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<InfrastructureDTO> getInfrastructure() {
		return infrastructure;
	}

	public void setInfrastructure(List<InfrastructureDTO> infrastructure) {
		this.infrastructure = infrastructure;
	}

	public List<LiveStockDTO> getLiveStocks() {
		return liveStocks;
	}

	public void setLiveStocks(List<LiveStockDTO> liveStocks) {
		this.liveStocks = liveStocks;
	}

	public List<CropDTO> getCrops() {
		return crops;
	}

	public void setCrops(List<CropDTO> crops) {
		this.crops = crops;
	}

}
