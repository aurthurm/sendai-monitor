package disaster.loss.service.dto;

import disaster.loss.domain.enumeration.APPROVALSTATUS;

public class IDisasterApprovalDTO {

    private String disasterId;

   private APPROVALSTATUS approval;

   private String comment;

    public String getDisasterId() {
        return disasterId;
    }

    public void setDisasterId(String disasterId) {
        this.disasterId = disasterId;
    }

    public APPROVALSTATUS getApproval() {
        return approval;
    }

    public void setApproval(APPROVALSTATUS approval) {
        this.approval = approval;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "IDisasterApprovalDTO{" +
            "disasterId='" + disasterId + '\'' +
            ", approval=" + approval +
            ", comment='" + comment + '\'' +
            '}';
    }
}
