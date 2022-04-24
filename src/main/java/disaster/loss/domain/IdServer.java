package disaster.loss.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A IdServer.
 */
@Entity
@Table(name = "id_server")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class IdServer implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "prefix")
    private String prefix;

    @Column(name = "description")
    private String description;

    @Column(name = "number")
    private int number;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IdServer)) {
            return false;
        }
        return id != null && id.equals(((IdServer) o).id);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
	@Override
	public String toString() {
		return "IdServer [id=" + id + ", prefix=" + prefix + ", description=" + description + ", number=" + number
				+ "]";
	}
}
