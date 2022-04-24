package disaster.loss.service;

import disaster.loss.domain.Ward;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Ward}.
 */
public interface WardService {
    /**
     * Save a ward.
     *
     * @param ward the entity to save.
     * @return the persisted entity.
     */
    Ward save(Ward ward);

    /**
     * Partially updates a ward.
     *
     * @param ward the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Ward> partialUpdate(Ward ward);

    /**
     * Get all the wards.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Ward> findAll(Pageable pageable);

    /**
     * Get the "id" ward.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Ward> findOne(String id);

    /**
     * Delete the "id" ward.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
