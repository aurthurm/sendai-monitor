package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A Crop.
 */
@Entity
@Table(name = "fullfilled_disaster_intervention")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FulfilledDisasterIntervention extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "fullfilled_disaster_intervention_id", updatable = false, nullable = false)
	private String fullfilledDisasterInterventionId;

	@Column(name = "disaster_id")
	private String disasterId;

	@Column(name = "intervention_id")
	private String interventionId;

	@Column(name = "name")
	private String name;

	@Column(name = "status")
	private String status;

	@Column(name = "comment")
	private String comment;

	@Column(name = "budget_required")
	private Float budgetRequired;

	@Column(name = "budget_supplied")
	private Float budgetSupplied;

	@Column(name = "budget_spent")
	private Float budgetSpent;

	public String getFullfilledDisasterInterventionId() {
		return fullfilledDisasterInterventionId;
	}

	public void setFullfilledDisasterInterventionId(String fullfilledDisasterInterventionId) {
		this.fullfilledDisasterInterventionId = fullfilledDisasterInterventionId;
	}

	public String getDisasterId() {
		return disasterId;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public String getInterventionId() {
		return interventionId;
	}

	public void setInterventionId(String interventionId) {
		this.interventionId = interventionId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Float getBudgetRequired() {
		return budgetRequired;
	}

	public void setBudgetRequired(Float budgetRequired) {
		this.budgetRequired = budgetRequired;
	}

	public Float getBudgetSupplied() {
		return budgetSupplied;
	}

	public void setBudgetSupplied(Float budgetSupplied) {
		this.budgetSupplied = budgetSupplied;
	}

	public Float getBudgetSpent() {
		return budgetSpent;
	}

	public void setBudgetSpent(Float budgetSpent) {
		this.budgetSpent = budgetSpent;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof FulfilledDisasterIntervention)) {
			return false;
		}
		return fullfilledDisasterInterventionId != null && fullfilledDisasterInterventionId
				.equals(((FulfilledDisasterIntervention) o).fullfilledDisasterInterventionId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "FulfilledDisasterIntervention [fullfilledDisasterInterventionId=" + fullfilledDisasterInterventionId
				+ ", disasterId=" + disasterId + ", interventionId=" + interventionId + ", name=" + name + ", status="
				+ status + ", comment=" + comment + ", budgetRequired=" + budgetRequired + ", budgetSupplied="
				+ budgetSupplied + ", budgetSpent=" + budgetSpent + "]";
	}

}
