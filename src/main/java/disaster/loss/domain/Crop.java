package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A Crop.
 */
@Entity
@Table(name = "crop")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Crop extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "crop_id", updatable = false, nullable = false)
    private String cropId;

    @Column(name = "disaster_id")
    private String disasterId;

    @Column(name = "casualty_id")
    private String casualtyId;

    @Column(name = "crop_type_id")
    private String cropTypeId;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "crop_type_id", referencedColumnName = "crop_type_id", insertable = false, updatable = false)
	private CropType cropType;

    @Column(name = "hecterage_affected")
    private Float hecterageAffected;

    @Column(name = "estimated_loss")
    private Float estimatedLoss;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getCropId() {
        return this.cropId;
    }

    public Crop cropId(String cropId) {
        this.setCropId(cropId);
        return this;
    }

    public void setCropId(String cropId) {
        this.cropId = cropId;
    }

    public String getDisasterId() {
        return this.disasterId;
    }

    public Crop disasterId(String disasterId) {
        this.setDisasterId(disasterId);
        return this;
    }

    public void setDisasterId(String disasterId) {
        this.disasterId = disasterId;
    }

    public String getCasualtyId() {
        return this.casualtyId;
    }

    public Crop casualtyId(String casualtyId) {
        this.setCasualtyId(casualtyId);
        return this;
    }

    public void setCasualtyId(String casualtyId) {
        this.casualtyId = casualtyId;
    }

    public String getCropTypeId() {
        return this.cropTypeId;
    }

    public Crop cropTypeId(String cropTypeId) {
        this.setCropTypeId(cropTypeId);
        return this;
    }

    public void setCropTypeId(String cropTypeId) {
        this.cropTypeId = cropTypeId;
    }

    public Float getHecterageAffected() {
        return this.hecterageAffected;
    }

    public Crop hecterageAffected(Float hecterageAffected) {
        this.setHecterageAffected(hecterageAffected);
        return this;
    }

    public void setHecterageAffected(Float hecterageAffected) {
        this.hecterageAffected = hecterageAffected;
    }

    public Float getEstimatedLoss() {
        return this.estimatedLoss;
    }

    public Crop estimatedLoss(Float estimatedLoss) {
        this.setEstimatedLoss(estimatedLoss);
        return this;
    }

    public void setEstimatedLoss(Float estimatedLoss) {
        this.estimatedLoss = estimatedLoss;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    public CropType getCropType() {
		return cropType;
	}

	public void setCropType(CropType cropType) {
		this.cropType = cropType;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Crop)) {
            return false;
        }
        return cropId != null && cropId.equals(((Crop) o).cropId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Crop{" +
            "cropId=" + getCropId() +
            ", disasterId='" + getDisasterId() + "'" +
            ", casualtyId='" + getCasualtyId() + "'" +
            ", cropTypeId='" + getCropTypeId() + "'" +
            ", hecterageAffected=" + getHecterageAffected() +
            ", estimatedLoss=" + getEstimatedLoss() +
            "}";
    }
}
