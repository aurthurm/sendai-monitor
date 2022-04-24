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
 * A Infrastructure.
 */
@Entity
@Table(name = "infrastructure")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Infrastructure extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "infractructure_id", updatable = false, nullable = false)
	private String infractructureId;

	@Column(name = "disaster_id")
	private String disasterId;

	@Column(name = "casualty_id")
	private String casualtyId;

	@Column(name = "infractructure_type_id")
	private String infractructureTypeId;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "infractructure_type_id", referencedColumnName = "infractructure_type_id", insertable = false, updatable = false)
	private InfrastructureType infractructureType;

	@Column(name = "damaged")
	private Integer damaged;

	@Column(name = "destroyed")
	private Integer destroyed;

	@Column(name = "value")
	private Float value;

	// jhipster-needle-entity-add-field - JHipster will add fields here

	public String getInfractructureId() {
		return this.infractructureId;
	}

	public Infrastructure infractructureId(String infractructureId) {
		this.setInfractructureId(infractructureId);
		return this;
	}

	public void setInfractructureId(String infractructureId) {
		this.infractructureId = infractructureId;
	}

	public String getDisasterId() {
		return this.disasterId;
	}

	public Infrastructure disasterId(String disasterId) {
		this.setDisasterId(disasterId);
		return this;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public String getCasualtyId() {
		return this.casualtyId;
	}

	public Infrastructure casualtyId(String casualtyId) {
		this.setCasualtyId(casualtyId);
		return this;
	}

	public void setCasualtyId(String casualtyId) {
		this.casualtyId = casualtyId;
	}

	public InfrastructureType getInfractructureType() {
		return infractructureType;
	}

	public void setInfractructureType(InfrastructureType infractructureType) {
		this.infractructureType = infractructureType;
	}

	public Integer getDamaged() {
		return this.damaged;
	}

	public Infrastructure damaged(Integer damaged) {
		this.setDamaged(damaged);
		return this;
	}

	public void setDamaged(Integer damaged) {
		this.damaged = damaged;
	}

	public Integer getDestroyed() {
		return this.destroyed;
	}

	public Infrastructure destroyed(Integer destroyed) {
		this.setDestroyed(destroyed);
		return this;
	}

	public void setDestroyed(Integer destroyed) {
		this.destroyed = destroyed;
	}

	public Float getValue() {
		return this.value;
	}

	public Infrastructure value(Float value) {
		this.setValue(value);
		return this;
	}

	public void setValue(Float value) {
		this.value = value;
	}

	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here

	public String getInfractructureTypeId() {
		return infractructureTypeId;
	}

	public void setInfractructureTypeId(String infractructureTypeId) {
		this.infractructureTypeId = infractructureTypeId;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Infrastructure)) {
			return false;
		}
		return infractructureId != null && infractructureId.equals(((Infrastructure) o).infractructureId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	@Override
	public String toString() {
		return "Infrastructure [infractructureId=" + infractructureId + ", disasterId=" + disasterId + ", casualtyId="
				+ casualtyId + ", infractructureTypeId=" + infractructureTypeId + ", infractructureType="
				+ infractructureType + ", damaged=" + damaged + ", destroyed=" + destroyed + ", value=" + value + "]";
	}

}
