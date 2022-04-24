package disaster.loss.service.dto;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

import disaster.loss.domain.CropType;

public class CropDTO {

	private String cropId;

	private String disasterId;

	private String casualtyId;

	private String cropTypeId;

	private CropType cropType;

	private Float hecterageAffected;

	private Float estimatedLoss;

	public String getCropId() {
		return cropId;
	}

	public void setCropId(String cropId) {
		this.cropId = cropId;
	}

	public String getDisasterId() {
		return disasterId;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public String getCasualtyId() {
		return casualtyId;
	}

	public void setCasualtyId(String casualtyId) {
		this.casualtyId = casualtyId;
	}

	public String getCropTypeId() {
		return cropTypeId;
	}

	public void setCropTypeId(String cropTypeId) {
		this.cropTypeId = cropTypeId;
	}

	public CropType getCropType() {
		return cropType;
	}

	public void setCropType(CropType cropType) {
		this.cropType = cropType;
	}

	public Float getHecterageAffected() {
		return hecterageAffected;
	}

	public void setHecterageAffected(Float hecterageAffected) {
		this.hecterageAffected = hecterageAffected;
	}

	public Float getEstimatedLoss() {
		return estimatedLoss;
	}

	public void setEstimatedLoss(Float estimatedLoss) {
		this.estimatedLoss = estimatedLoss;
	}

	@Override
	public String toString() {
		return "CropDTO [cropId=" + cropId + ", disasterId=" + disasterId + ", casualtyId=" + casualtyId
				+ ", cropTypeId=" + cropTypeId + ", cropType=" + cropType + ", hecterageAffected=" + hecterageAffected
				+ ", estimatedLoss=" + estimatedLoss + "]";
	}

}
