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

import disaster.loss.domain.enumeration.DATA_APPROVAL;

/**
 * A Crop.
 */
@Entity
@Table(name = "disaster_approval")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DisasterApproval extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "disaster_approval_id", updatable = false, nullable = false)
	private String disasterApprovalId;

	@Column(name = "disaster_id")
	private String disasterId;

	@Column(name = "status")
	private String status;

	@Enumerated(EnumType.STRING)
	@Column(name = "approval")
	private DATA_APPROVAL approval;

	@Column(name = "comment")
	private String comment;

	public String getDisasterApprovalId() {
		return disasterApprovalId;
	}

	public void setDisasterApprovalId(String disasterApprovalId) {
		this.disasterApprovalId = disasterApprovalId;
	}

	public String getDisasterId() {
		return disasterId;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public DATA_APPROVAL getApproval() {
		return approval;
	}

	public void setApproval(DATA_APPROVAL approval) {
		this.approval = approval;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof DisasterApproval)) {
			return false;
		}
		return disasterApprovalId != null && disasterApprovalId.equals(((DisasterApproval) o).disasterApprovalId);
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
		return "DisasterApproval [disasterApprovalId=" + disasterApprovalId + ", disasterId=" + disasterId + ", status="
				+ status + ", approval=" + approval + ", comment=" + comment + "]";
	}

}
