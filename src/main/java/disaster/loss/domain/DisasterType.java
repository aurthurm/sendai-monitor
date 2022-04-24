package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A DisasterType.
 */
@Entity
@Table(name = "disaster_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DisasterType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "disaster_type_id", updatable = false, nullable = false)
    private String disasterTypeId;

    @Column(name = "disaster_category_id")
    private String disasterCategoryId;

    @Column(name = "name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getDisasterTypeId() {
        return this.disasterTypeId;
    }

    public DisasterType disasterTypeId(String disasterTypeId) {
        this.setDisasterTypeId(disasterTypeId);
        return this;
    }

    public void setDisasterTypeId(String disasterTypeId) {
        this.disasterTypeId = disasterTypeId;
    }

    public String getDisasterCategoryId() {
        return this.disasterCategoryId;
    }

    public DisasterType disasterCategoryId(String disasterCategoryId) {
        this.setDisasterCategoryId(disasterCategoryId);
        return this;
    }

    public void setDisasterCategoryId(String disasterCategoryId) {
        this.disasterCategoryId = disasterCategoryId;
    }

    public String getName() {
        return this.name;
    }

    public DisasterType name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DisasterType)) {
            return false;
        }
        return disasterTypeId != null && disasterTypeId.equals(((DisasterType) o).disasterTypeId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DisasterType{" +
            "disasterTypeId=" + getDisasterTypeId() +
            ", disasterCategoryId='" + getDisasterCategoryId() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
