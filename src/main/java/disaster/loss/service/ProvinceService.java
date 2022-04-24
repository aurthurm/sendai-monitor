package disaster.loss.service;

import disaster.loss.domain.Province;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Province}.
 */
public interface ProvinceService {
    /**
     * Save a province.
     *
     * @param province the entity to save.
     * @return the persisted entity.
     */
    Province save(Province province);

    /**
     * Partially updates a province.
     *
     * @param province the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Province> partialUpdate(Province province);

    /**
     * Get all the provinces.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Province> findAll(Pageable pageable);

    /**
     * Get the "id" province.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Province> findOne(String id);

    /**
     * Delete the "id" province.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
