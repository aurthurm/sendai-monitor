package disaster.loss.service.dto;

import disaster.loss.domain.enumeration.DATA_APPROVAL;

public class IDisasterApprovalDTO {

    private String disasterId;

   private DATA_APPROVAL approval;

   private String comment;

    public String getDisasterId() {
        return disasterId;
    }

    public void setDisasterId(String disasterId) {
        this.disasterId = disasterId;
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
    public String toString() {
        return "IDisasterApprovalDTO{" +
            "disasterId='" + disasterId + '\'' +
            ", approval=" + approval +
            ", comment='" + comment + '\'' +
            '}';
    }
}
