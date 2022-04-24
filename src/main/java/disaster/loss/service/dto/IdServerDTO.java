package disaster.loss.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link disaster.loss.domain.IdServer} entity.
 */
public class IdServerDTO implements Serializable {

    private Long id;

    private String name;

    private String type;

    private String prefix;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPrefix() {
        return prefix;
    }

    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof IdServerDTO)) {
            return false;
        }

        return id != null && id.equals(((IdServerDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "IdServerDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", prefix='" + getPrefix() + "'" +
            "}";
    }
}
