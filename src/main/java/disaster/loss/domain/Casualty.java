package disaster.loss.domain;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import disaster.loss.domain.enumeration.SEX;

/**
 * A Casualty.
 */
@Entity
@Table(name = "casualty")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Casualty extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "casualty_id", updatable = false, nullable = false)
    private String casualtyId;

    @Column(name = "disaster_id")
    private String disasterId;

    @Column(name = "national_id")
    private String nationalId;

    @Column(name = "anonymous")
    private Boolean anonymous;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "mobile_phone")
    private String mobilePhone;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "dob_estimated")
    private Boolean dobEstimated;

    @Column(name = "age")
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex")
    private SEX sex;

    @Column(name = "dependents")
    private Integer dependents;

    @Column(name = "occupation")
    private String occupation;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "displaced")
    private Boolean displaced;

    @Column(name = "affected")
    private Boolean affected;

    @Column(name = "injured")
    private Boolean injured;

    @Column(name = "missing")
    private Boolean missing;

    @Column(name = "dead")
    private Boolean dead;

    @Column(name = "disability_before")
    private Boolean disabilityBefore;

    @Column(name = "disability_after")
    private Boolean disabilityAfter;

    @Column(name = "replay")
    private Boolean replay;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getCasualtyId() {
        return this.casualtyId;
    }

    public Casualty casualtyId(String casualtyId) {
        this.setCasualtyId(casualtyId);
        return this;
    }

    public void setCasualtyId(String casualtyId) {
        this.casualtyId = casualtyId;
    }

    public String getDisasterId() {
        return this.disasterId;
    }

    public Casualty disasterId(String disasterId) {
        this.setDisasterId(disasterId);
        return this;
    }

    public void setDisasterId(String disasterId) {
        this.disasterId = disasterId;
    }

    public String getNationalId() {
        return this.nationalId;
    }

    public Casualty nationalId(String nationalId) {
        this.setNationalId(nationalId);
        return this;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public Boolean getAnonymous() {
        return this.anonymous;
    }

    public Casualty anonymous(Boolean anonymous) {
        this.setAnonymous(anonymous);
        return this;
    }

    public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setAnonymous(Boolean anonymous) {
        this.anonymous = anonymous;
    }

    public LocalDate getDob() {
        return this.dob;
    }

    public Casualty dob(LocalDate dob) {
        this.setDob(dob);
        return this;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Boolean getDobEstimated() {
        return this.dobEstimated;
    }

    public Casualty dobEstimated(Boolean dobEstimated) {
        this.setDobEstimated(dobEstimated);
        return this;
    }

    public void setDobEstimated(Boolean dobEstimated) {
        this.dobEstimated = dobEstimated;
    }

    public Integer getAge() {
        return this.age;
    }

    public Casualty age(Integer age) {
        this.setAge(age);
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public SEX getSex() {
        return this.sex;
    }

    public Casualty sex(SEX sex) {
        this.setSex(sex);
        return this;
    }

    public void setSex(SEX sex) {
        this.sex = sex;
    }

    public Integer getDependents() {
        return this.dependents;
    }

    public Casualty dependents(Integer dependents) {
        this.setDependents(dependents);
        return this;
    }

    public void setDependents(Integer dependents) {
        this.dependents = dependents;
    }

    public String getOccupation() {
        return this.occupation;
    }

    public Casualty occupation(String occupation) {
        this.setOccupation(occupation);
        return this;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getNationality() {
        return this.nationality;
    }

    public Casualty nationality(String nationality) {
        this.setNationality(nationality);
        return this;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public Boolean getDisplaced() {
        return this.displaced;
    }

    public Casualty displaced(Boolean displaced) {
        this.setDisplaced(displaced);
        return this;
    }

    public void setDisplaced(Boolean displaced) {
        this.displaced = displaced;
    }

    public Boolean getAffected() {
        return this.affected;
    }

    public Casualty affected(Boolean affected) {
        this.setAffected(affected);
        return this;
    }

    public void setAffected(Boolean affected) {
        this.affected = affected;
    }

    public Boolean getInjured() {
        return this.injured;
    }

    public Casualty injured(Boolean injured) {
        this.setInjured(injured);
        return this;
    }

    public void setInjured(Boolean injured) {
        this.injured = injured;
    }

    public Boolean getMissing() {
        return this.missing;
    }

    public Casualty missing(Boolean missing) {
        this.setMissing(missing);
        return this;
    }

    public void setMissing(Boolean missing) {
        this.missing = missing;
    }

    public Boolean getDead() {
        return this.dead;
    }

    public Casualty dead(Boolean dead) {
        this.setDead(dead);
        return this;
    }

    public void setDead(Boolean dead) {
        this.dead = dead;
    }

    public Boolean getDisabilityBefore() {
        return this.disabilityBefore;
    }

    public Casualty disabilityBefore(Boolean disabilityBefore) {
        this.setDisabilityBefore(disabilityBefore);
        return this;
    }

    public void setDisabilityBefore(Boolean disabilityBefore) {
        this.disabilityBefore = disabilityBefore;
    }

    public Boolean getDisabilityAfter() {
        return this.disabilityAfter;
    }

    public Casualty disabilityAfter(Boolean disabilityAfter) {
        this.setDisabilityAfter(disabilityAfter);
        return this;
    }

    public void setDisabilityAfter(Boolean disabilityAfter) {
        this.disabilityAfter = disabilityAfter;
    }

    public Boolean getReplay() {
        return this.replay;
    }

    public Casualty replay(Boolean replay) {
        this.setReplay(replay);
        return this;
    }

    public void setReplay(Boolean replay) {
        this.replay = replay;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Casualty)) {
            return false;
        }
        return casualtyId != null && casualtyId.equals(((Casualty) o).casualtyId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

	@Override
	public String toString() {
		return "Casualty [casualtyId=" + casualtyId + ", disasterId=" + disasterId + ", nationalId=" + nationalId
				+ ", anonymous=" + anonymous + ", firstName=" + firstName + ", lastName=" + lastName + ", mobilePhone="
				+ mobilePhone + ", dob=" + dob + ", dobEstimated=" + dobEstimated + ", age=" + age + ", sex=" + sex
				+ ", dependents=" + dependents + ", occupation=" + occupation + ", nationality=" + nationality
				+ ", displaced=" + displaced + ", affected=" + affected + ", injured=" + injured + ", missing="
				+ missing + ", dead=" + dead + ", disabilityBefore=" + disabilityBefore + ", disabilityAfter="
				+ disabilityAfter + ", replay=" + replay + "]";
	}

    // prettier-ignore

}
