package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A Hazard.
 */
@Entity
@Table(name = "hazard")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Hazard extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "hazard_id", updatable = false, nullable = false)
    private String hazardId;

    @Column(name = "type")
    private String type;

    @Column(name = "location_id")
    private String locationId;

    @Column(name = "mitigation")
    private String mitigation;

    @Column(name = "description")
    private String description;

    @Column(name = "severity")
    private String severity;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getHazardId() {
        return this.hazardId;
    }

    public Hazard hazardId(String hazardId) {
        this.setHazardId(hazardId);
        return this;
    }

    public void setHazardId(String hazardId) {
        this.hazardId = hazardId;
    }

    public String getType() {
        return this.type;
    }

    public Hazard type(String type) {
        this.setType(type);
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLocationId() {
        return this.locationId;
    }

    public Hazard locationId(String locationId) {
        this.setLocationId(locationId);
        return this;
    }

    public void setLocationId(String locationId) {
        this.locationId = locationId;
    }

    public String getMitigation() {
        return this.mitigation;
    }

    public Hazard mitigation(String mitigation) {
        this.setMitigation(mitigation);
        return this;
    }

    public void setMitigation(String mitigation) {
        this.mitigation = mitigation;
    }

    public String getDescription() {
        return this.description;
    }

    public Hazard description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeverity() {
        return this.severity;
    }

    public Hazard severity(String severity) {
        this.setSeverity(severity);
        return this;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hazard)) {
            return false;
        }
        return hazardId != null && hazardId.equals(((Hazard) o).hazardId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Hazard{" +
            "hazardId=" + getHazardId() +
            ", type='" + getType() + "'" +
            ", locationId='" + getLocationId() + "'" +
            ", mitigation='" + getMitigation() + "'" +
            ", description='" + getDescription() + "'" +
            ", severity='" + getSeverity() + "'" +
            "}";
    }
}
