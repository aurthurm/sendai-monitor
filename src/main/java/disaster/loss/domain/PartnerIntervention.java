package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A PartnerIntervention.
 */
@Entity
@Table(name = "partner_intervention")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PartnerIntervention extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "intevention_id", updatable = false, nullable = false)
    private String inteventionId;

    @Column(name = "partner_id")
    private String partnerId;

    @Column(name = "disaster_id")
    private String disasterId;

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "hazard_id")
    private String hazardId;

    @Column(name = "amount_received")
    private Float amountReceived;

    @Column(name = "assistance_offered")
    private String assistanceOffered;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getInteventionId() {
        return this.inteventionId;
    }

    public PartnerIntervention inteventionId(String inteventionId) {
        this.setInteventionId(inteventionId);
        return this;
    }

    public void setInteventionId(String inteventionId) {
        this.inteventionId = inteventionId;
    }

    public String getPartnerId() {
        return this.partnerId;
    }

    public PartnerIntervention partnerId(String partnerId) {
        this.setPartnerId(partnerId);
        return this;
    }

    public void setPartnerId(String partnerId) {
        this.partnerId = partnerId;
    }

    public String getDisasterId() {
        return this.disasterId;
    }

    public PartnerIntervention disasterId(String disasterId) {
        this.setDisasterId(disasterId);
        return this;
    }

    public void setDisasterId(String disasterId) {
        this.disasterId = disasterId;
    }

    public String getProjectId() {
        return this.projectId;
    }

    public PartnerIntervention projectId(String projectId) {
        this.setProjectId(projectId);
        return this;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getHazardId() {
        return this.hazardId;
    }

    public PartnerIntervention hazardId(String hazardId) {
        this.setHazardId(hazardId);
        return this;
    }

    public void setHazardId(String hazardId) {
        this.hazardId = hazardId;
    }

    public Float getAmountReceived() {
        return this.amountReceived;
    }

    public PartnerIntervention amountReceived(Float amountReceived) {
        this.setAmountReceived(amountReceived);
        return this;
    }

    public void setAmountReceived(Float amountReceived) {
        this.amountReceived = amountReceived;
    }

    public String getAssistanceOffered() {
        return this.assistanceOffered;
    }

    public PartnerIntervention assistanceOffered(String assistanceOffered) {
        this.setAssistanceOffered(assistanceOffered);
        return this;
    }

    public void setAssistanceOffered(String assistanceOffered) {
        this.assistanceOffered = assistanceOffered;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PartnerIntervention)) {
            return false;
        }
        return inteventionId != null && inteventionId.equals(((PartnerIntervention) o).inteventionId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PartnerIntervention{" +
            "inteventionId=" + getInteventionId() +
            ", partnerId='" + getPartnerId() + "'" +
            ", disasterId='" + getDisasterId() + "'" +
            ", projectId='" + getProjectId() + "'" +
            ", hazardId='" + getHazardId() + "'" +
            ", amountReceived=" + getAmountReceived() +
            ", assistanceOffered='" + getAssistanceOffered() + "'" +
            "}";
    }
}
