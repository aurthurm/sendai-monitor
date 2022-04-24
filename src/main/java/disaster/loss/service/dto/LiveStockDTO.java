package disaster.loss.service.dto;

public class LiveStockDTO {

	private String liveStockTypeId;

	private Integer died;

	private Integer missing;

	private Integer ill;

	private Float estimatedLoss;

	public String getLiveStockTypeId() {
		return liveStockTypeId;
	}

	public void setLiveStockTypeId(String liveStockTypeId) {
		this.liveStockTypeId = liveStockTypeId;
	}

	public Float getEstimatedLoss() {
		return estimatedLoss;
	}

	public void setEstimatedLoss(Float estimatedLoss) {
		this.estimatedLoss = estimatedLoss;
	}

	public Integer getDied() {
		return died;
	}

	public void setDied(Integer died) {
		this.died = died;
	}

	public Integer getMissing() {
		return missing;
	}

	public void setMissing(Integer missing) {
		this.missing = missing;
	}

	public Integer getIll() {
		return ill;
	}

	public void setIll(Integer ill) {
		this.ill = ill;
	}

	@Override
	public String toString() {
		return "LiveStockDTO [liveStockTypeId=" + liveStockTypeId + ", died=" + died + ", missing=" + missing + ", ill="
				+ ill + ", estimatedLoss=" + estimatedLoss + "]";
	}

}
