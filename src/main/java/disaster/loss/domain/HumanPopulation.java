package disaster.loss.domain;

import java.io.Serializable;

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

import disaster.loss.domain.enumeration.DISABILITY;
import disaster.loss.domain.enumeration.HUMAN_POPULATION;

/**
 * A HumanPopulation.
 */
@Entity
@Table(name = "human_population")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class HumanPopulation extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "human_population_id", updatable = false, nullable = false)
	private String humanPopulationId;

	@Column(name = "disaster_id")
	private String disasterId;

	@Enumerated(EnumType.STRING)
	@Column(name = "population_type")
	private HUMAN_POPULATION populationType;

	@Enumerated(EnumType.STRING)
	@Column(name = "disability")
	private DISABILITY disabled;

	@Column(name = "human_population_disaster_category_id")
	private String humanPopulationDisasterCategoryId;

	@Column(name = "human_population_disaster_category_name")
	private String humanPopulationDisasterCategoryName;

	@Column(name = "value")
	private Integer value;

	public String getHumanPopulationId() {
		return humanPopulationId;
	}

	public void setHumanPopulationId(String humanPopulationId) {
		this.humanPopulationId = humanPopulationId;
	}

	public String getDisasterId() {
		return disasterId;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public HUMAN_POPULATION getPopulationType() {
		return populationType;
	}

	public void setPopulationType(HUMAN_POPULATION populationType) {
		this.populationType = populationType;
	}

	public DISABILITY getDisabled() {
		return disabled;
	}

	public void setDisabled(DISABILITY disabled) {
		this.disabled = disabled;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	public String getHumanPopulationDisasterCategoryId() {
		return humanPopulationDisasterCategoryId;
	}

	public void setHumanPopulationDisasterCategoryId(String humanPopulationDisasterCategoryId) {
		this.humanPopulationDisasterCategoryId = humanPopulationDisasterCategoryId;
	}

	public String getHumanPopulationDisasterCategoryName() {
		return humanPopulationDisasterCategoryName;
	}

	public void setHumanPopulationDisasterCategoryName(String humanPopulationDisasterCategoryName) {
		this.humanPopulationDisasterCategoryName = humanPopulationDisasterCategoryName;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof HumanPopulation)) {
			return false;
		}
		return humanPopulationId != null && humanPopulationId.equals(((HumanPopulation) o).humanPopulationId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	@Override
	public String toString() {
		return "HumanPopulation [humanPopulationId=" + humanPopulationId + ", disasterId=" + disasterId
				+ ", populationType=" + populationType + ", disabled=" + disabled
				+ ", humanPopulationDisasterCategoryId=" + humanPopulationDisasterCategoryId
				+ ", humanPopulationDisasterCategoryName=" + humanPopulationDisasterCategoryName + ", value=" + value
				+ "]";
	}

}
