package disaster.loss.service.dto;

import java.io.Serializable;
import java.util.Arrays;

/**
 * A LiveStock.
 */

public class LiveStockMultipleDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private String liveStockId;

	private String disasterId;

	private String casualtyId;

	private LiveStockDTO[] liveStockes;

	public String getLiveStockId() {
		return liveStockId;
	}

	public void setLiveStockId(String liveStockId) {
		this.liveStockId = liveStockId;
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

	public LiveStockDTO[] getLiveStockes() {
		return liveStockes;
	}

	public void setLiveStockes(LiveStockDTO[] liveStockes) {
		this.liveStockes = liveStockes;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof LiveStockMultipleDTO)) {
			return false;
		}
		return liveStockId != null && liveStockId.equals(((LiveStockMultipleDTO) o).liveStockId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	@Override
	public String toString() {
		return "LiveStockMultipleDTO [liveStockId=" + liveStockId + ", disasterId=" + disasterId + ", casualtyId="
				+ casualtyId + ", liveStockes=" + Arrays.toString(liveStockes) + "]";
	}

}
