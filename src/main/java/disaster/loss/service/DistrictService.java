package disaster.loss.service;

import disaster.loss.domain.District;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link District}.
 */
public interface DistrictService {
    /**
     * Save a district.
     *
     * @param district the entity to save.
     * @return the persisted entity.
     */
    District save(District district);

    /**
     * Partially updates a district.
     *
     * @param district the entity to update partially.
     * @return the persisted entity.
     */
    Optional<District> partialUpdate(District district);

    /**
     * Get all the districts.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<District> findAll(Pageable pageable);

    /**
     * Get the "id" district.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<District> findOne(String id);

    /**
     * Delete the "id" district.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
