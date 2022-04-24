package disaster.loss.service;

import disaster.loss.domain.Hazard;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Hazard}.
 */
public interface HazardService {
    /**
     * Save a hazard.
     *
     * @param hazard the entity to save.
     * @return the persisted entity.
     */
    Hazard save(Hazard hazard);

    /**
     * Partially updates a hazard.
     *
     * @param hazard the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Hazard> partialUpdate(Hazard hazard);

    /**
     * Get all the hazards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Hazard> findAll(Pageable pageable);

    /**
     * Get the "id" hazard.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Hazard> findOne(String id);

    /**
     * Delete the "id" hazard.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
