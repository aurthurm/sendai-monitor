package disaster.loss.service.dto;

import java.util.Objects;

public class DonationLineListDTO {
	
	private String donorId;
	
	private String developmentPartnerName;
	
	private String projectName;
	
	private String disasterCode;
	
	private String dateIssued;
	
	private String value;
	
	private String valueUtelized;
	
	private String comment;

	public String getDevelopmentPartnerName() {
		return developmentPartnerName;
	}

	public void setDevelopmentPartnerName(String developmentPartnerName) {
		this.developmentPartnerName = developmentPartnerName;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getDisasterCode() {
		return disasterCode;
	}

	public void setDisasterCode(String disasterCode) {
		this.disasterCode = disasterCode;
	}

	public String getDateIssued() {
		return dateIssued;
	}

	public void setDateIssued(String dateIssued) {
		this.dateIssued = dateIssued;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getValueUtelized() {
		return valueUtelized;
	}

	public void setValueUtelized(String valueUtelized) {
		this.valueUtelized = valueUtelized;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getDonorId() {
		return donorId;
	}

	public void setDonorId(String donorId) {
		this.donorId = donorId;
	}

	@Override
	public int hashCode() {
		return Objects.hash(donorId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DonationLineListDTO other = (DonationLineListDTO) obj;
		return Objects.equals(donorId, other.donorId);
	}

	@Override
	public String toString() {
		return "DonationLineListDTO [donorId=" + donorId + ", developmentPartnerName=" + developmentPartnerName
				+ ", projectName=" + projectName + ", disasterCode=" + disasterCode + ", dateIssued=" + dateIssued
				+ ", value=" + value + ", valueUtelized=" + valueUtelized + ", comment=" + comment + "]";
	}

}
