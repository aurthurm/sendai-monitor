package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A ProjectDisaster.
 */
@Entity
@Table(name = "project_disaster")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProjectDisaster extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "project_disaster_id", updatable = false, nullable = false)
    private String projectDisasterId;

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "disastert_id")
    private String disastertId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getProjectDisasterId() {
        return this.projectDisasterId;
    }

    public ProjectDisaster projectDisasterId(String projectDisasterId) {
        this.setProjectDisasterId(projectDisasterId);
        return this;
    }

    public void setProjectDisasterId(String projectDisasterId) {
        this.projectDisasterId = projectDisasterId;
    }

    public String getProjectId() {
        return this.projectId;
    }

    public ProjectDisaster projectId(String projectId) {
        this.setProjectId(projectId);
        return this;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getDisastertId() {
        return this.disastertId;
    }

    public ProjectDisaster disastertId(String disastertId) {
        this.setDisastertId(disastertId);
        return this;
    }

    public void setDisastertId(String disastertId) {
        this.disastertId = disastertId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProjectDisaster)) {
            return false;
        }
        return projectDisasterId != null && projectDisasterId.equals(((ProjectDisaster) o).projectDisasterId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProjectDisaster{" +
            "projectDisasterId=" + getProjectDisasterId() +
            ", projectId='" + getProjectId() + "'" +
            ", disastertId='" + getDisastertId() + "'" +
            "}";
    }
}
