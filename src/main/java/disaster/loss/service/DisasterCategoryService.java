package disaster.loss.service;

import disaster.loss.domain.DisasterCategory;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link DisasterCategory}.
 */
public interface DisasterCategoryService {
    /**
     * Save a disasterCategory.
     *
     * @param disasterCategory the entity to save.
     * @return the persisted entity.
     */
    DisasterCategory save(DisasterCategory disasterCategory);

    /**
     * Partially updates a disasterCategory.
     *
     * @param disasterCategory the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DisasterCategory> partialUpdate(DisasterCategory disasterCategory);

    /**
     * Get all the disasterCategories.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DisasterCategory> findAll(Pageable pageable);

    /**
     * Get the "id" disasterCategory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DisasterCategory> findOne(String id);

    /**
     * Delete the "id" disasterCategory.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
