package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A InfrastructureType.
 */
@Entity
@Table(name = "infrastructure_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InfrastructureType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "infractructure_type_id", updatable = false, nullable = false)
    private String infractructureTypeId;

    @Column(name = "name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getInfractructureTypeId() {
        return this.infractructureTypeId;
    }

    public InfrastructureType infractructureTypeId(String infractructureTypeId) {
        this.setInfractructureTypeId(infractructureTypeId);
        return this;
    }

    public void setInfractructureTypeId(String infractructureTypeId) {
        this.infractructureTypeId = infractructureTypeId;
    }

    public String getName() {
        return this.name;
    }

    public InfrastructureType name(String name) {
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
        if (!(o instanceof InfrastructureType)) {
            return false;
        }
        return infractructureTypeId != null && infractructureTypeId.equals(((InfrastructureType) o).infractructureTypeId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InfrastructureType{" +
            "infractructureTypeId=" + getInfractructureTypeId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
