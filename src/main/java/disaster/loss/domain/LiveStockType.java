package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A LiveStockType.
 */
@Entity
@Table(name = "live_stock_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LiveStockType extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "live_stock_type_id", updatable = false, nullable = false)
    private String liveStockTypeId;

    @Column(name = "name")
    private String name;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getLiveStockTypeId() {
        return this.liveStockTypeId;
    }

    public LiveStockType liveStockTypeId(String liveStockTypeId) {
        this.setLiveStockTypeId(liveStockTypeId);
        return this;
    }

    public void setLiveStockTypeId(String liveStockTypeId) {
        this.liveStockTypeId = liveStockTypeId;
    }

    public String getName() {
        return this.name;
    }

    public LiveStockType name(String name) {
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
        if (!(o instanceof LiveStockType)) {
            return false;
        }
        return liveStockTypeId != null && liveStockTypeId.equals(((LiveStockType) o).liveStockTypeId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LiveStockType{" +
            "liveStockTypeId=" + getLiveStockTypeId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
