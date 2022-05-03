package disaster.loss.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import disaster.loss.domain.enumeration.APPROVALSTATUS;
import disaster.loss.domain.enumeration.LOCATION;
import disaster.loss.domain.enumeration.ELIGABLEFORVERIFICATION;

/**
 * A Disaster.
 */
@Entity
@Table(name = "disaster")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Disaster extends AbstractAuditingEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "disaster_id", updatable = false, nullable = false)
	private String disasterId;

	@Column(name = "department_id")
	private String departmentId;

	@Column(name = "name")
	private String name;

	@Column(name = "hazard_id")
	private String hazardId;

	@Column(name = "type")
	private String type;

	@Column(name = "cause")
	private String cause;

	@Enumerated(EnumType.STRING)
	@Column(name = "location")
	private LOCATION location;

	@Column(name = "currency")
	private String currency;

	@Column(name = "location_id")
	private String locationId;

	@Column(name = "description")
	private String description;

	@Column(name = "verification_mode")
	private String verification_mode;

	@Enumerated(EnumType.STRING)
	@Column(name = "eligible_for_approval")
	private ELIGABLEFORVERIFICATION eligibleForApproval;

	@Column(name = "disaster_category_id")
	private String disasterCategoryId;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "disaster_category_id", referencedColumnName = "disaster_category_id", insertable = false, updatable = false)
	private DisasterCategory disasterCategory;

	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "disaster_id", referencedColumnName = "disaster_id", insertable = false, updatable = false)
	private List<RequiredDisasterIntervention> disasterInterventionRequired;

	/*
	 * @OneToMany(fetch = FetchType.LAZY)
	 *
	 * @JoinColumn(name = "disaster_id", referencedColumnName = "disaster_id",
	 * insertable = false, updatable = false) private
	 * List<FulfilledDisasterIntervention> disasterInterventionFulfilled;
	 */

	@Column(name = "disaster_type_id")
	private String disasterTypeId;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "disaster_type_id", referencedColumnName = "disaster_type_id", insertable = false, updatable = false)
	private DisasterType disasterType;

	@Column(name = "case_id")
	private String caseId;

	@Column(name = "estimated_damage")
	private String estimatedDamage;

	@Column(name = "is_declared")
	private Boolean isDeclared;

	@Column(name = "declaration_date")
	private LocalDate declarationDate;

	@Column(name = "closure_date")
	private LocalDate closureDate;

	@Column(name = "incident_date")
	private LocalDate incidentDate;

	@Column(name = "population")
	private Integer population;

	@Column(name = "population_estimated")
	private Boolean PopulationEstimated;

	@Column(name = "affected_population")
	private Integer affectedPopulation;

	@Column(name = "affected_population_estimated")
	private Boolean affectedPopulationEstimated;

	@Column(name = "dip_tank")
	private String dipTank;

	@Column(name = "longitude")
	private String longitude;

	@Column(name = "latitude")
	private String latitude;

	public String getDisasterId() {
		return this.disasterId;
	}

	public Disaster disasterId(String disasterId) {
		this.setDisasterId(disasterId);
		return this;
	}

	public void setDisasterId(String disasterId) {
		this.disasterId = disasterId;
	}

	public String getDepartmentId() {
		return this.departmentId;
	}

	public Disaster departmentId(String departmentId) {
		this.setDepartmentId(departmentId);
		return this;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getHazardId() {
		return this.hazardId;
	}

	public Disaster hazardId(String hazardId) {
		this.setHazardId(hazardId);
		return this;
	}

	public void setHazardId(String hazardId) {
		this.hazardId = hazardId;
	}

	public String getType() {
		return this.type;
	}

	public Disaster type(String type) {
		this.setType(type);
		return this;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCause() {
		return this.cause;
	}

	public Disaster cause(String cause) {
		this.setCause(cause);
		return this;
	}

	public void setCause(String cause) {
		this.cause = cause;
	}

	public LOCATION getLocation() {
		return this.location;
	}

	public Disaster location(LOCATION location) {
		this.setLocation(location);
		return this;
	}

	public void setLocation(LOCATION location) {
		this.location = location;
	}

	public String getLocationId() {
		return this.locationId;
	}

	public Disaster locationId(String locationId) {
		this.setLocationId(locationId);
		return this;
	}

	public void setLocationId(String locationId) {
		this.locationId = locationId;
	}

	public String getDescription() {
		return this.description;
	}

	public Disaster description(String description) {
		this.setDescription(description);
		return this;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDisasterCategoryId() {
		return this.disasterCategoryId;
	}

	public Disaster disasterCategoryId(String disasterCategoryId) {
		this.setDisasterCategoryId(disasterCategoryId);
		return this;
	}

	public void setDisasterCategoryId(String disasterCategoryId) {
		this.disasterCategoryId = disasterCategoryId;
	}

	public String getDisasterTypeId() {
		return this.disasterTypeId;
	}

	public Disaster disasterTypeId(String disasterTypeId) {
		this.setDisasterTypeId(disasterTypeId);
		return this;
	}

	public void setDisasterTypeId(String disasterTypeId) {
		this.disasterTypeId = disasterTypeId;
	}

	public String getCaseId() {
		return this.caseId;
	}

	public Disaster caseName(String caseName) {
		this.setCaseId(caseName);
		return this;
	}

	public void setCaseId(String caseId) {
		this.caseId = caseId;
	}

	public String getEstimatedDamage() {
		return this.estimatedDamage;
	}

	public Disaster estimatedDamage(String estimatedDamage) {
		this.setEstimatedDamage(estimatedDamage);
		return this;
	}

	public void setEstimatedDamage(String estimatedDamage) {
		this.estimatedDamage = estimatedDamage;
	}

	public Boolean getIsDeclared() {
		return this.isDeclared;
	}

	public Disaster isDeclared(Boolean isDeclared) {
		this.setIsDeclared(isDeclared);
		return this;
	}

	public void setIsDeclared(Boolean isDeclared) {
		this.isDeclared = isDeclared;
	}

	public LocalDate getDeclarationDate() {
		return this.declarationDate;
	}

	public Disaster declarationDate(LocalDate declarationDate) {
		this.setDeclarationDate(declarationDate);
		return this;
	}

	public void setDeclarationDate(LocalDate declarationDate) {
		this.declarationDate = declarationDate;
	}

	public LocalDate getClosureDate() {
		return this.closureDate;
	}

	public Disaster closureDate(LocalDate closureDate) {
		this.setClosureDate(closureDate);
		return this;
	}

	public void setClosureDate(LocalDate closureDate) {
		this.closureDate = closureDate;
	}

	public LocalDate getIncidentDate() {
		return incidentDate;
	}

	public Boolean getPopulationEstimated() {
		return PopulationEstimated;
	}

	public void setPopulationEstimated(Boolean populationEstimated) {
		PopulationEstimated = populationEstimated;
	}

	public Boolean getAffectedPopulationEstimated() {
		return affectedPopulationEstimated;
	}

	public void setAffectedPopulationEstimated(Boolean affectedPopulationEstimated) {
		this.affectedPopulationEstimated = affectedPopulationEstimated;
	}

	public void setIncidentDate(LocalDate incidentDate) {
		this.incidentDate = incidentDate;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public Boolean getDeclared() {
		return isDeclared;
	}

	public void setDeclared(Boolean declared) {
		isDeclared = declared;
	}

	public DisasterCategory getDisasterCategory() {
		return disasterCategory;
	}

	public void setDisasterCategory(DisasterCategory disasterCategory) {
		this.disasterCategory = disasterCategory;
	}

	public DisasterType getDisasterType() {
		return disasterType;
	}

	public void setDisasterType(DisasterType disasterType) {
		this.disasterType = disasterType;
	}

	public ELIGABLEFORVERIFICATION getEligibleForApproval() {
		return eligibleForApproval;
	}

	public void setEligibleForApproval(ELIGABLEFORVERIFICATION eligibleForApproval) {
		this.eligibleForApproval = eligibleForApproval;
	}

	public List<RequiredDisasterIntervention> getDisasterInterventionRequired() {
		return disasterInterventionRequired;
	}

	public void setDisasterInterventionRequired(List<RequiredDisasterIntervention> disasterInterventionRequired) {
		this.disasterInterventionRequired = disasterInterventionRequired;
	}

	public Integer getAffectedPopulation() {
		return affectedPopulation;
	}

	public void setAffectedPopulation(Integer affectedPopulation) {
		this.affectedPopulation = affectedPopulation;
	}

	public String getVerification_mode() {
		return verification_mode;
	}

	public void setVerification_mode(String verification_mode) {
		this.verification_mode = verification_mode;
	}

	public String getDipTank() {
		return dipTank;
	}

	public void setDipTank(String dipTank) {
		this.dipTank = dipTank;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (!(o instanceof Disaster)) {
			return false;
		}
		return disasterId != null && disasterId.equals(((Disaster) o).disasterId);
	}

	@Override
	public int hashCode() {
		// see
		// https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
		return getClass().hashCode();
	}

	public Integer getPopulation() {
		return population;
	}

	public void setPopulation(Integer population) {
		this.population = population;
	}

	@Override
	public String toString() {
		return "Disaster [disasterId=" + disasterId + ", departmentId=" + departmentId + ", name=" + name
				+ ", hazardId=" + hazardId + ", type=" + type + ", cause=" + cause + ", location=" + location
				+ ", currency=" + currency + ", locationId=" + locationId + ", description=" + description
				+ ", verification_mode=" + verification_mode + ", eligibleForApproval=" + eligibleForApproval
				+ ", disasterCategoryId=" + disasterCategoryId + ", disasterCategory=" + disasterCategory
				+ ", disasterInterventionRequired=" + disasterInterventionRequired + ", disasterTypeId="
				+ disasterTypeId + ", disasterType=" + disasterType + ", caseId=" + caseId + ", estimatedDamage="
				+ estimatedDamage + ", isDeclared=" + isDeclared + ", declarationDate=" + declarationDate
				+ ", closureDate=" + closureDate + ", incidentDate=" + incidentDate + ", population=" + population
				+ ", PopulationEstimated=" + PopulationEstimated + ", affectedPopulation=" + affectedPopulation
				+ ", affectedPopulationEstimated=" + affectedPopulationEstimated + ", deepTank=" + dipTank
				+ ", longitude=" + longitude + ", latitude=" + latitude + "]";
	}

}
