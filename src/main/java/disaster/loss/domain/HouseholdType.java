package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A InfrastructureType.
 */
@Entity
@Table(name = "household_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class HouseholdType extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "household_type_id", updatable = false, nullable = false)
	private String householdTypeId;

	@Column(name = "name")
	private String name;

	// jhipster-needle-entity-add-field - JHipster will add fields here

	public String getName() {
		return this.name;
	}

	public String getHouseholdTypeId() {
		return householdTypeId;
	}

	public void setHouseholdTypeId(String householdTypeId) {
		this.householdTypeId = householdTypeId;
	}

	public HouseholdType name(String name) {
		this.setName(name);
		return this;
	}

	public void setName(String name) {
		this.name = name;
	}

	// jhipster-needle-entity-add-getters-setters - JHipster will add getters and
	// setters here

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof HouseholdType)) {
			return false;
		}
		return householdTypeId != null && householdTypeId.equals(((HouseholdType) o).householdTypeId);
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
		return "HouseholdType [householdTypeId=" + householdTypeId + ", name=" + name + "]";
	}

}
