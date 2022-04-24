package disaster.loss.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A LiveStock.
 */
@Entity
@Table(name = "live_stock")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LiveStock extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "live_stock_id", updatable = false, nullable = false)
	private String liveStockId;

	@Column(name = "disaster_id")
	private String disasterId;

	@Column(name = "casualty_id")
	private String casualtyId;

	@Column(name = "live_stock_type_id")
	private String liveStockTypeId;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "live_stock_type_id", referencedColumnName = "live_stock_type_id", insertable = false, updatable = false)
	private LiveStockType liveStockType;

	@Column(name = "died")
	private Integer died;

	@Column(name = "missing")
	private Integer missing;

	@Column(name = "injured")
	private Integer injured;

	@Column(name = "ill")
	private Integer ill;

	@Column(name = "estimated_loss")
	private Float estimatedLoss;

	// jhipster-needle-entity-add-field - JHipster will add fields here

	public String getLiveStockId() {
		return this.liveStockId;
	}

	public LiveStock liveStockId(String liveStockId) {
		this.setLiveStockId(liveStockId);
		return this;
	}

	public void setLiveStockId(String liveStockId) {
		this.liveStockId = liveStockId;
	}

	public String getDisasterId() {
		return this.disasterId;
	}

	public LiveStock disasterId(String disasterId) {
		this.setDisasterId(disasterId);
		return this;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public String getCasualtyId() {
		return this.casualtyId;
	}

	public LiveStock casualtyId(String casualtyId) {
		this.setCasualtyId(casualtyId);
		return this;
	}

	public void setCasualtyId(String casualtyId) {
		this.casualtyId = casualtyId;
	}

	public String getLiveStockTypeId() {
		return this.liveStockTypeId;
	}

	public LiveStock liveStockTypeId(String liveStockTypeId) {
		this.setLiveStockTypeId(liveStockTypeId);
		return this;
	}

	public void setLiveStockTypeId(String liveStockTypeId) {
		this.liveStockTypeId = liveStockTypeId;
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

	public Integer getInjured() {
		return injured;
	}

	public void setInjured(Integer injured) {
		this.injured = injured;
	}

	public Integer getIll() {
		return ill;
	}

	public void setIll(Integer ill) {
		this.ill = ill;
	}

	public Float getEstimatedLoss() {
		return this.estimatedLoss;
	}

	public LiveStock estimatedLoss(Float estimatedLoss) {
		this.setEstimatedLoss(estimatedLoss);
		return this;
	}

	public void setEstimatedLoss(Float estimatedLoss) {
		this.estimatedLoss = estimatedLoss;
	}

	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof LiveStock)) {
			return false;
		}
		return liveStockId != null && liveStockId.equals(((LiveStock) o).liveStockId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	public LiveStockType getLiveStockType() {
		return liveStockType;
	}

	public void setLiveStockType(LiveStockType liveStockType) {
		this.liveStockType = liveStockType;
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "LiveStock [liveStockId=" + liveStockId + ", disasterId=" + disasterId + ", casualtyId=" + casualtyId
				+ ", liveStockTypeId=" + liveStockTypeId + ", liveStockType=" + liveStockType + ", died=" + died
				+ ", missing=" + missing + ", injured=" + injured + ", ill=" + ill + ", estimatedLoss=" + estimatedLoss
				+ "]";
	}

}
