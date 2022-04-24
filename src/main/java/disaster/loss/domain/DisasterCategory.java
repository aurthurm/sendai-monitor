package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A DisasterCategory.
 */
@Entity
@Table(name = "disaster_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DisasterCategory extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "disaster_category_id", updatable = false, nullable = false)
    private String disasterCategoryId;

    @Column(name = "name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getDisasterCategoryId() {
        return this.disasterCategoryId;
    }

    public DisasterCategory disasterCategoryId(String disasterCategoryId) {
        this.setDisasterCategoryId(disasterCategoryId);
        return this;
    }

    public void setDisasterCategoryId(String disasterCategoryId) {
        this.disasterCategoryId = disasterCategoryId;
    }

    public String getName() {
        return this.name;
    }

    public DisasterCategory name(String name) {
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
        if (!(o instanceof DisasterCategory)) {
            return false;
        }
        return disasterCategoryId != null && disasterCategoryId.equals(((DisasterCategory) o).disasterCategoryId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DisasterCategory{" +
            "disasterCategoryId=" + getDisasterCategoryId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
