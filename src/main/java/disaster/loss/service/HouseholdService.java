package disaster.loss.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import disaster.loss.domain.Household;
import disaster.loss.domain.Infrastructure;

/**
 * Service Interface for managing {@link Infrastructure}.
 */
public interface HouseholdService {
    /**
     * Save a infrastructure.
     *
     * @param infrastructure the entity to save.
     * @return the persisted entity.
     */
	Household save(Household infrastructure);

    /**
     * Partially updates a infrastructure.
     *
     * @param infrastructure the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Household> partialUpdate(Household infrastructure);

    /**
     * Get all the infrastructures.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Household> findAll(Pageable pageable);

    /**
     * Get the "id" infrastructure.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Household> findOne(String id);

    /**
     * Delete the "id" infrastructure.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    Page<Household> findByDisasterId(String disasterId, Pageable pageable);
}
