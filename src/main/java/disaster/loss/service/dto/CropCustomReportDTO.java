package disaster.loss.service.dto;

import java.util.Objects;

public class CropCustomReportDTO {

	private String name;
	private int hecterageAffected;
	private int estimatedLoss;

	public CropCustomReportDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CropCustomReportDTO(String name, int hecterageAffected, int estimatedLoss) {
		super();
		this.name = name;
		this.hecterageAffected = hecterageAffected;
		this.estimatedLoss = estimatedLoss;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getHecterageAffected() {
		return hecterageAffected;
	}

	public void setHecterageAffected(int hecterageAffected) {
		this.hecterageAffected = hecterageAffected;
	}

	public int getEstimatedLoss() {
		return estimatedLoss;
	}

	public void setEstimatedLoss(int estimatedLoss) {
		this.estimatedLoss = estimatedLoss;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CropCustomReportDTO other = (CropCustomReportDTO) obj;
		return Objects.equals(name, other.name) && Objects.equals(hecterageAffected, other.hecterageAffected)
				&& Objects.equals(estimatedLoss, other.estimatedLoss);
	}

	@Override
	public String toString() {
		return "CropCustomReportDTO [name=" + name + ", hecterageAffected=" + hecterageAffected + ", estimatedLoss="
				+ estimatedLoss + "]";
	}

}
