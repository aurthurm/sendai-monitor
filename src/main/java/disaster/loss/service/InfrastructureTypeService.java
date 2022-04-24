package disaster.loss.service;

import disaster.loss.domain.InfrastructureType;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link InfrastructureType}.
 */
public interface InfrastructureTypeService {
    /**
     * Save a infrastructureType.
     *
     * @param infrastructureType the entity to save.
     * @return the persisted entity.
     */
    InfrastructureType save(InfrastructureType infrastructureType);

    /**
     * Partially updates a infrastructureType.
     *
     * @param infrastructureType the entity to update partially.
     * @return the persisted entity.
     */
    Optional<InfrastructureType> partialUpdate(InfrastructureType infrastructureType);

    /**
     * Get all the infrastructureTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<InfrastructureType> findAll(Pageable pageable);

    /**
     * Get the "id" infrastructureType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InfrastructureType> findOne(String id);

    /**
     * Delete the "id" infrastructureType.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
