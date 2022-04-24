package disaster.loss.domain;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import disaster.loss.domain.enumeration.SEX;

/**
 * A Casualty.
 */
@Entity
@Table(name = "constant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Constant extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "constant_id", updatable = false, nullable = false)
	private String constantId;

	@Column(name = "name")
	private String name;

	@Column(name = "status")
	private String status;

	@Column(name = "estimated")
	private Boolean estimated;

	@Column(name = "description")
	private String description;

	@Column(name = "effective_date")
	private LocalDate effectiveDate;

	@Column(name = "close_date")
	private LocalDate closeDate;

	@Column(name = "value")
	private Float value;

	public String getConstantId() {
		return constantId;
	}

	public void setConstantId(String constantId) {
		this.constantId = constantId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Boolean getEstimated() {
		return estimated;
	}

	public void setEstimated(Boolean estimated) {
		this.estimated = estimated;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(LocalDate effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	public LocalDate getCloseDate() {
		return closeDate;
	}

	public void setCloseDate(LocalDate closeDate) {
		this.closeDate = closeDate;
	}

	public Float getValue() {
		return value;
	}

	public void setValue(Float value) {
		this.value = value;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Constant)) {
			return false;
		}
		return constantId != null && constantId.equals(((Constant) o).constantId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	@Override
	public String toString() {
		return "Constant [constantId=" + constantId + ", name=" + name + ", status=" + status + ", estimated="
				+ estimated + ", description=" + description + ", effectiveDate=" + effectiveDate + ", closeDate="
				+ closeDate + ", value=" + value + "]";
	}

}
