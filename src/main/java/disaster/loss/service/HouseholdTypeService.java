package disaster.loss.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import disaster.loss.domain.HouseholdType;
import disaster.loss.domain.InfrastructureType;

/**
 * Service Interface for managing {@link InfrastructureType}.
 */
public interface HouseholdTypeService {
    /**
     * Save a infrastructureType.
     *
     * @param infrastructureType the entity to save.
     * @return the persisted entity.
     */
	HouseholdType save(HouseholdType infrastructureType);

    /**
     * Partially updates a infrastructureType.
     *
     * @param infrastructureType the entity to update partially.
     * @return the persisted entity.
     */
    Optional<HouseholdType> partialUpdate(HouseholdType infrastructureType);

    /**
     * Get all the infrastructureTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HouseholdType> findAll(Pageable pageable);

    /**
     * Get the "id" infrastructureType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HouseholdType> findOne(String id);

    /**
     * Delete the "id" infrastructureType.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
