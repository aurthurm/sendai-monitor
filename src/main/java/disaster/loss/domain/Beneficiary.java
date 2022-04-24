package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A Beneficiary.
 */
@Entity
@Table(name = "beneficiary")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Beneficiary extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "beneficiary_id", updatable = false, nullable = false)
    private String beneficiaryId;

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "amount_received")
    private Float amountReceived;

    @Column(name = "value_of_goods_received")
    private Float valueOfGoodsReceived;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getBeneficiaryId() {
        return this.beneficiaryId;
    }

    public Beneficiary beneficiaryId(String beneficiaryId) {
        this.setBeneficiaryId(beneficiaryId);
        return this;
    }

    public void setBeneficiaryId(String beneficiaryId) {
        this.beneficiaryId = beneficiaryId;
    }

    public String getProjectId() {
        return this.projectId;
    }

    public Beneficiary projectId(String projectId) {
        this.setProjectId(projectId);
        return this;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public Float getAmountReceived() {
        return this.amountReceived;
    }

    public Beneficiary amountReceived(Float amountReceived) {
        this.setAmountReceived(amountReceived);
        return this;
    }

    public void setAmountReceived(Float amountReceived) {
        this.amountReceived = amountReceived;
    }

    public Float getValueOfGoodsReceived() {
        return this.valueOfGoodsReceived;
    }

    public Beneficiary valueOfGoodsReceived(Float valueOfGoodsReceived) {
        this.setValueOfGoodsReceived(valueOfGoodsReceived);
        return this;
    }

    public void setValueOfGoodsReceived(Float valueOfGoodsReceived) {
        this.valueOfGoodsReceived = valueOfGoodsReceived;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Beneficiary)) {
            return false;
        }
        return beneficiaryId != null && beneficiaryId.equals(((Beneficiary) o).beneficiaryId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Beneficiary{" +
            "beneficiaryId=" + getBeneficiaryId() +
            ", projectId='" + getProjectId() + "'" +
            ", amountReceived=" + getAmountReceived() +
            ", valueOfGoodsReceived=" + getValueOfGoodsReceived() +
            "}";
    }
}
