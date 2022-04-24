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
@Table(name = "required_disaster_intervention")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RequiredDisasterIntervention extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "required_disaster_intervention_id", updatable = false, nullable = false)
	private String requiredDisasterInterventionId;

	@Column(name = "disaster_id")
	private String disasterId;

	@Column(name = "intervention_id")
	private String interventionId;

	@Column(name = "name")
	private String name;

	@Column(name = "status")
	private String status;

	public String getRequiredDisasterInterventionId() {
		return requiredDisasterInterventionId;
	}

	public void setRequiredDisasterInterventionId(String requiredDisasterInterventionId) {
		this.requiredDisasterInterventionId = requiredDisasterInterventionId;
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

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof RequiredDisasterIntervention)) {
			return false;
		}
		return requiredDisasterInterventionId != null && requiredDisasterInterventionId
				.equals(((RequiredDisasterIntervention) o).requiredDisasterInterventionId);
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
		return "RequiredDisasterIntervention [requiredDisasterInterventionId=" + requiredDisasterInterventionId
				+ ", disasterId=" + disasterId + ", interventionId=" + interventionId + ", name=" + name + ", status="
				+ status + "]";
	}

}
