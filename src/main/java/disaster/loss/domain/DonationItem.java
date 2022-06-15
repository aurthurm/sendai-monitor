package disaster.loss.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A DonationItem.
 */
@Entity
@Table(name = "donation_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DonationItem extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "donor_item_id", updatable = false, nullable = false)
	private String donorItemId;

	@Column(name = "donor_id")
	private String donorId;

	@Column(name = "item_name")
	private String itemName;

	@Column(name = "currency")
	private String currency;

	@Column(name = "quantity_received")
	private Float quantityReceived;

	@Column(name = "quantity_issued")
	private Float quantityIssued;

	@Column(name = "value")
	private Float value;

	public String getDonorItemId() {
		return donorItemId;
	}

	public void setDonorItemId(String donorItemId) {
		this.donorItemId = donorItemId;
	}

	public String getDonorId() {
		return donorId;
	}

	public void setDonorId(String donorId) {
		this.donorId = donorId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public Float getQuantityReceived() {
		return quantityReceived;
	}

	public void setQuantityReceived(Float quantityReceived) {
		this.quantityReceived = quantityReceived;
	}

	public Float getQuantityIssued() {
		return quantityIssued;
	}

	public void setQuantityIssued(Float quantityIssued) {
		this.quantityIssued = quantityIssued;
	}

	public Float getValue() {
		return value;
	}

	public void setValue(Float value) {
		this.value = value;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof DonationItem)) {
			return false;
		}
		return donorItemId != null && donorItemId.equals(((DonationItem) o).donorItemId);
	}

	@Override
	public int hashCode() {
		return getClass().hashCode();
	}

	// prettier-ignore
	@Override
	public String toString() {
		return "DonationItem [donorItemId=" + donorItemId + ", donorId=" + donorId + ", itemName=" + itemName
				+ ", currency=" + currency + ", quantityReceived=" + quantityReceived + ", quantityIssued="
				+ quantityIssued + ", value=" + value + "]";
	}

}
