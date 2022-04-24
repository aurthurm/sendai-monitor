package disaster.loss.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import disaster.loss.domain.Intervention;

/**
 * Service Interface for managing {@link Intervention}.
 */
public interface InterventionService {
    /**
     * Save a Intervention.
     *
     * @param Intervention the entity to save.
     * @return the persisted entity.
     */
    Intervention save(Intervention Intervention);

    /**
     * Partially updates a Intervention.
     *
     * @param Intervention the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Intervention> partialUpdate(Intervention Intervention);

    /**
     * Get all the cropTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Intervention> findAll(Pageable pageable);

    /**
     * Get the "id" Intervention.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Intervention> findOne(String id);

    /**
     * Delete the "id" Intervention.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
