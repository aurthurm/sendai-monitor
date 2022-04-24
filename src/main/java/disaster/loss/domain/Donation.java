package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A Donation.
 */
@Entity
@Table(name = "donation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Donation extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "donor_id", updatable = false, nullable = false)
    private String donorId;

    @Column(name = "disaster_id")
    private String disasterId;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "value_of_donation")
    private Float valueOfDonation;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getDonorId() {
        return this.donorId;
    }

    public Donation donorId(String donorId) {
        this.setDonorId(donorId);
        return this;
    }

    public void setDonorId(String donorId) {
        this.donorId = donorId;
    }

    public String getDisasterId() {
        return this.disasterId;
    }

    public Donation disasterId(String disasterId) {
        this.setDisasterId(disasterId);
        return this;
    }

    public void setDisasterId(String disasterId) {
        this.disasterId = disasterId;
    }

    public String getName() {
        return this.name;
    }

    public Donation name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return this.type;
    }

    public Donation type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Float getValueOfDonation() {
        return this.valueOfDonation;
    }

    public Donation valueOfDonation(Float valueOfDonation) {
        this.setValueOfDonation(valueOfDonation);
        return this;
    }

    public void setValueOfDonation(Float valueOfDonation) {
        this.valueOfDonation = valueOfDonation;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Donation)) {
            return false;
        }
        return donorId != null && donorId.equals(((Donation) o).donorId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Donation{" +
            "donorId=" + getDonorId() +
            ", disasterId='" + getDisasterId() + "'" +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", valueOfDonation=" + getValueOfDonation() +
            "}";
    }
}
