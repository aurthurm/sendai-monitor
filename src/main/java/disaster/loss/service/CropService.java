package disaster.loss.service;

import disaster.loss.domain.Crop;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Crop}.
 */
public interface CropService {
    /**
     * Save a crop.
     *
     * @param crop the entity to save.
     * @return the persisted entity.
     */
    Crop save(Crop crop);

    /**
     * Partially updates a crop.
     *
     * @param crop the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Crop> partialUpdate(Crop crop);

    /**
     * Get all the crops.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Crop> findAll(Pageable pageable);

    /**
     * Get the "id" crop.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Crop> findOne(String id);

    /**
     * Delete the "id" crop.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    Page<Crop> findByDisasterId(String disasterId, Pageable pageable);
}
