package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A CropType.
 */
@Entity
@Table(name = "crop_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CropType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "crop_type_id", updatable = false, nullable = false)
    private String cropTypeId;

    @Column(name = "name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getCropTypeId() {
        return this.cropTypeId;
    }

    public CropType cropTypeId(String cropTypeId) {
        this.setCropTypeId(cropTypeId);
        return this;
    }

    public void setCropTypeId(String cropTypeId) {
        this.cropTypeId = cropTypeId;
    }

    public String getName() {
        return this.name;
    }

    public CropType name(String name) {
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
        if (!(o instanceof CropType)) {
            return false;
        }
        return cropTypeId != null && cropTypeId.equals(((CropType) o).cropTypeId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CropType{" +
            "cropTypeId=" + getCropTypeId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
