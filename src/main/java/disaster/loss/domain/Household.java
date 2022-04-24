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
@Table(name = "household")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Household extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "household_id", updatable = false, nullable = false)
	private String householdId;

	@Column(name = "disaster_id")
	private String disasterId;

	@Column(name = "household_type_id")
	private String householdTypeId;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "household_type_id", referencedColumnName = "household_type_id", insertable = false, updatable = false)
	private HouseholdType householdType;

	@Column(name = "number_of_households")
	private Integer numberOfHouseholds;

	@Column(name = "number_child_headed")
	private Integer numberChildHeaded;

	@Column(name = "number_female_headed")
	private Integer numberFemaleHeaded;

	@Column(name = "number_of_people_affected")
	private Integer numberOfPeopleAffected;

	public String getHouseholdId() {
		return householdId;
	}

	public void setHouseholdId(String householdId) {
		this.householdId = householdId;
	}

	public String getDisasterId() {
		return disasterId;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public String getHouseholdTypeId() {
		return householdTypeId;
	}

	public void setHouseholdTypeId(String householdTypeId) {
		this.householdTypeId = householdTypeId;
	}

	public HouseholdType getHouseholdType() {
		return householdType;
	}

	public void setHouseholdType(HouseholdType householdType) {
		this.householdType = householdType;
	}

	public Integer getNumberChildHeaded() {
		return numberChildHeaded;
	}

	public void setNumberChildHeaded(Integer numberChildHeaded) {
		this.numberChildHeaded = numberChildHeaded;
	}

	public Integer getNumberFemaleHeaded() {
		return numberFemaleHeaded;
	}

	public void setNumberFemaleHeaded(Integer numberFemaleHeaded) {
		this.numberFemaleHeaded = numberFemaleHeaded;
	}

	public Integer getNumberOfPeopleAffected() {
		return numberOfPeopleAffected;
	}

	public void setNumberOfPeopleAffected(Integer numberOfPeopleAffected) {
		this.numberOfPeopleAffected = numberOfPeopleAffected;
	}

	public Integer getNumberOfHouseholds() {
		return numberOfHouseholds;
	}

	public void setNumberOfHouseholds(Integer numberOfHouseholds) {
		this.numberOfHouseholds = numberOfHouseholds;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Household)) {
			return false;
		}
		return householdId != null && householdId.equals(((Household) o).householdId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	@Override
	public String toString() {
		return "Household [householdId=" + householdId + ", disasterId=" + disasterId + ", householdTypeId="
				+ householdTypeId + ", householdType=" + householdType + ", numberOfHouseholds=" + numberOfHouseholds
				+ ", numberChildHeaded=" + numberChildHeaded + ", numberFemaleHeaded=" + numberFemaleHeaded
				+ ", numberOfPeopleAffected=" + numberOfPeopleAffected + "]";
	}

}
