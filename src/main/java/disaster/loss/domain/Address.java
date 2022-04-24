package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Address extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "address_id", updatable = false, nullable = false)
    private String addressId;

    @Column(name = "casualty_id")
    private String casualtyId;

    @Column(name = "street")
    private String street;

    @Column(name = "country_id")
    private String countryId;

    @Column(name = "province_id")
    private String provinceId;

    @Column(name = "district_id")
    private String districtId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getAddressId() {
        return this.addressId;
    }

    public Address addressId(String addressId) {
        this.setAddressId(addressId);
        return this;
    }

    public void setAddressId(String addressId) {
        this.addressId = addressId;
    }

    public String getCasualtyId() {
        return this.casualtyId;
    }

    public Address casualtyId(String casualtyId) {
        this.setCasualtyId(casualtyId);
        return this;
    }

    public void setCasualtyId(String casualtyId) {
        this.casualtyId = casualtyId;
    }

    public String getStreet() {
        return this.street;
    }

    public Address street(String street) {
        this.setStreet(street);
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCountryId() {
        return this.countryId;
    }

    public Address countryId(String countryId) {
        this.setCountryId(countryId);
        return this;
    }

    public void setCountryId(String countryId) {
        this.countryId = countryId;
    }

    public String getProvinceId() {
        return this.provinceId;
    }

    public Address provinceId(String provinceId) {
        this.setProvinceId(provinceId);
        return this;
    }

    public void setProvinceId(String provinceId) {
        this.provinceId = provinceId;
    }

    public String getDistrictId() {
        return this.districtId;
    }

    public Address districtId(String districtId) {
        this.setDistrictId(districtId);
        return this;
    }

    public void setDistrictId(String districtId) {
        this.districtId = districtId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Address)) {
            return false;
        }
        return addressId != null && addressId.equals(((Address) o).addressId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Address{" +
            "addressId=" + getAddressId() +
            ", casualtyId='" + getCasualtyId() + "'" +
            ", street='" + getStreet() + "'" +
            ", countryId='" + getCountryId() + "'" +
            ", provinceId='" + getProvinceId() + "'" +
            ", districtId='" + getDistrictId() + "'" +
            "}";
    }
}
