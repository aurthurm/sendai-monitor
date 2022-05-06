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

import disaster.loss.domain.enumeration.VERIFICATION;

/**
 * A Department.
 */
@Entity
@Table(name = "department")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Department extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "department_id", updatable = false, nullable = false)
	private String departmentId;

	@Column(name = "name")
	private String name;

	@Enumerated(EnumType.STRING)
	@Column(name = "verification")
	private VERIFICATION verification;

	// jhipster-needle-entity-add-field - JHipster will add fields here

	public String getDepartmentId() {
		return this.departmentId;
	}

	public Department departmentId(String departmentId) {
		this.setDepartmentId(departmentId);
		return this;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getName() {
		return this.name;
	}

	public Department name(String name) {
		this.setName(name);
		return this;
	}

	public void setName(String name) {
		this.name = name;
	}

	public VERIFICATION getVerification() {
		return verification;
	}

	public void setVerification(VERIFICATION verification) {
		this.verification = verification;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Department)) {
			return false;
		}
		return departmentId != null && departmentId.equals(((Department) o).departmentId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	@Override
	public String toString() {
		return "Department [departmentId=" + departmentId + ", name=" + name + ", verification=" + verification + "]";
	}

}
