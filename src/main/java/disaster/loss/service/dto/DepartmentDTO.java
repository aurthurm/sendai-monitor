package disaster.loss.service.dto;

import java.io.Serializable;

import disaster.loss.domain.Department;
import disaster.loss.domain.enumeration.ELIGABLEFORVERIFICATION;

/**
 * A Department.
 */

public class DepartmentDTO  implements Serializable {

	private static final long serialVersionUID = 1L;

	
	private String departmentId;


	private String name;

	private ELIGABLEFORVERIFICATION verification;
	
	public DepartmentDTO() {
		// Empty constructor needed for Jackson.
	}

	
	public DepartmentDTO(Department dpt) {
		super();
		this.departmentId = dpt.getDepartmentId();
		this.name = dpt.getName();
		this.verification = dpt.getVerification();
	}

	public String getDepartmentId() {
		return this.departmentId;
	}

	public DepartmentDTO departmentId(String departmentId) {
		this.setDepartmentId(departmentId);
		return this;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getName() {
		return this.name;
	}

	public DepartmentDTO name(String name) {
		this.setName(name);
		return this;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ELIGABLEFORVERIFICATION getVerification() {
		return verification;
	}

	public void setVerification(ELIGABLEFORVERIFICATION verification) {
		this.verification = verification;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof DepartmentDTO)) {
			return false;
		}
		return departmentId != null && departmentId.equals(((DepartmentDTO) o).departmentId);
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
