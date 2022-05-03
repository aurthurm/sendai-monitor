package disaster.loss.service.dto;

import disaster.loss.domain.enumeration.APPROVALSTATUS;

public class DisasterSimpleCountDTO {

	private Long total;

	private Long declared;

	private Long notDeclared;

    private Long approved;

	private Long notApproved;

    private Long requestChanges;

    public Long getApproved() {
        return approved;
    }

    public void setApproved(Long approved) {
        this.approved = approved;
    }

    public Long getRequestChanges() {
        return requestChanges;
    }

    public void setRequestChanges(Long requestChanges) {
        this.requestChanges = requestChanges;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public Long getDeclared() {
        return declared;
    }

    public void setDeclared(Long declared) {
        this.declared = declared;
    }

    public Long getNotDeclared() {
        return notDeclared;
    }

    public void setNotDeclared(Long notDeclared) {
        this.notDeclared = notDeclared;
    }

    public Long getNotApproved() {
        return notApproved;
    }

    public void setNotApproved(Long notApproved) {
        this.notApproved = notApproved;
    }

    @Override
    public String toString() {
        return "DisasterSimpleCountDTO{" +
            "total=" + total +
            ", declared=" + declared +
            ", notDeclared=" + notDeclared +
            ", approved=" + approved +
            ", notApproved=" + notApproved +
            ", requestChanges=" + requestChanges +
            '}';
    }
}

