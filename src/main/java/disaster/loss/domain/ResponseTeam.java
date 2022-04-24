package disaster.loss.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

/**
 * A ResponseTeam.
 */
@Entity
@Table(name = "response_team")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ResponseTeam extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "response_team_id", updatable = false, nullable = false)
    private String responseTeamId;

    @Column(name = "disaster_id")
    private String disasterId;

    @Column(name = "name")
    private String name;

    @Column(name = "team_lead")
    private String teamLead;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getResponseTeamId() {
        return this.responseTeamId;
    }

    public ResponseTeam responseTeamId(String responseTeamId) {
        this.setResponseTeamId(responseTeamId);
        return this;
    }

    public void setResponseTeamId(String responseTeamId) {
        this.responseTeamId = responseTeamId;
    }

    public String getDisasterId() {
        return this.disasterId;
    }

    public ResponseTeam disasterId(String disasterId) {
        this.setDisasterId(disasterId);
        return this;
    }

    public void setDisasterId(String disasterId) {
        this.disasterId = disasterId;
    }

    public String getName() {
        return this.name;
    }

    public ResponseTeam name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTeamLead() {
        return this.teamLead;
    }

    public ResponseTeam teamLead(String teamLead) {
        this.setTeamLead(teamLead);
        return this;
    }

    public void setTeamLead(String teamLead) {
        this.teamLead = teamLead;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResponseTeam)) {
            return false;
        }
        return responseTeamId != null && responseTeamId.equals(((ResponseTeam) o).responseTeamId);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ResponseTeam{" +
            "responseTeamId=" + getResponseTeamId() +
            ", disasterId='" + getDisasterId() + "'" +
            ", name='" + getName() + "'" +
            ", teamLead='" + getTeamLead() + "'" +
            "}";
    }
}
