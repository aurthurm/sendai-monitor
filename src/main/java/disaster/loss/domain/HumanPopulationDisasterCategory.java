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
@Table(name = "human_population_disaster_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class HumanPopulationDisasterCategory extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "human_population_disaster_category_id", updatable = false, nullable = false)
	private String humanPopulationDisasterCategoryId;

	@Column(name = "name")
	private String name;

	@Column(name = "status")
	private String status;

	public String getHumanPopulationDisasterCategoryId() {
		return humanPopulationDisasterCategoryId;
	}

	public void setHumanPopulationDisasterCategoryId(String humanPopulationDisasterCategoryId) {
		this.humanPopulationDisasterCategoryId = humanPopulationDisasterCategoryId;
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

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof HumanPopulationDisasterCategory)) {
			return false;
		}
		return humanPopulationDisasterCategoryId != null && humanPopulationDisasterCategoryId
				.equals(((HumanPopulationDisasterCategory) o).humanPopulationDisasterCategoryId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	@Override
	public String toString() {
		return "HumanPopulationDisasterCategory [humanPopulationDisasterCategoryId=" + humanPopulationDisasterCategoryId
				+ ", name=" + name + ", status=" + status + "]";
	}

}
