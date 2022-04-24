package disaster.loss.service;

import disaster.loss.domain.DisasterType;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link DisasterType}.
 */
public interface DisasterTypeService {
    /**
     * Save a disasterType.
     *
     * @param disasterType the entity to save.
     * @return the persisted entity.
     */
    DisasterType save(DisasterType disasterType);

    /**
     * Partially updates a disasterType.
     *
     * @param disasterType the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DisasterType> partialUpdate(DisasterType disasterType);

    /**
     * Get all the disasterTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DisasterType> findAll(Pageable pageable);

    /**
     * Get the "id" disasterType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DisasterType> findOne(String id);

    /**
     * Delete the "id" disasterType.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
