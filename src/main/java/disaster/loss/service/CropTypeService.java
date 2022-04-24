package disaster.loss.service;

import disaster.loss.domain.CropType;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link CropType}.
 */
public interface CropTypeService {
    /**
     * Save a cropType.
     *
     * @param cropType the entity to save.
     * @return the persisted entity.
     */
    CropType save(CropType cropType);

    /**
     * Partially updates a cropType.
     *
     * @param cropType the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CropType> partialUpdate(CropType cropType);

    /**
     * Get all the cropTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CropType> findAll(Pageable pageable);

    /**
     * Get the "id" cropType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CropType> findOne(String id);

    /**
     * Delete the "id" cropType.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
