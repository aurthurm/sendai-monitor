package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A CropType.
 */
@Entity
@Table(name = "intervention")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Intervention extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "intervention_id", updatable = false, nullable = false)
	private String interventionId;

	@Column(name = "name")
	private String name;

	public String getInterventionId() {
		return interventionId;
	}

	public void setInterventionId(String interventionId) {
		this.interventionId = interventionId;
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
		if (!(o instanceof Intervention)) {
			return false;
		}
		return interventionId != null && interventionId.equals(((Intervention) o).interventionId);
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
		return "Interventions [interventionId=" + interventionId + ", name=" + name + "]";
	}

}
