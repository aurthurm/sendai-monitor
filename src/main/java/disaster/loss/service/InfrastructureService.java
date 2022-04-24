package disaster.loss.service;

import disaster.loss.domain.Infrastructure;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Infrastructure}.
 */
public interface InfrastructureService {
    /**
     * Save a infrastructure.
     *
     * @param infrastructure the entity to save.
     * @return the persisted entity.
     */
    Infrastructure save(Infrastructure infrastructure);

    /**
     * Partially updates a infrastructure.
     *
     * @param infrastructure the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Infrastructure> partialUpdate(Infrastructure infrastructure);

    /**
     * Get all the infrastructures.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Infrastructure> findAll(Pageable pageable);

    /**
     * Get the "id" infrastructure.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Infrastructure> findOne(String id);

    /**
     * Delete the "id" infrastructure.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    Page<Infrastructure> findByDisasterId(String disasterId, Pageable pageable);
}
