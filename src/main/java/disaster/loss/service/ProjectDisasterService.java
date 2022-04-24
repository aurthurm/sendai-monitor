package disaster.loss.service;

import disaster.loss.domain.ProjectDisaster;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ProjectDisaster}.
 */
public interface ProjectDisasterService {
    /**
     * Save a projectDisaster.
     *
     * @param projectDisaster the entity to save.
     * @return the persisted entity.
     */
    ProjectDisaster save(ProjectDisaster projectDisaster);

    /**
     * Partially updates a projectDisaster.
     *
     * @param projectDisaster the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProjectDisaster> partialUpdate(ProjectDisaster projectDisaster);

    /**
     * Get all the projectDisasters.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProjectDisaster> findAll(Pageable pageable);

    /**
     * Get the "id" projectDisaster.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProjectDisaster> findOne(String id);

    /**
     * Delete the "id" projectDisaster.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
