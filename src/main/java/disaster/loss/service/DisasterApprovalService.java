package disaster.loss.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import disaster.loss.domain.Crop;
import disaster.loss.domain.DisasterApproval;

/**
 * Service Interface for managing {@link DisasterApproval}.
 */
public interface DisasterApprovalService {
    /**
     * Save a crop.
     *
     * @param crop the entity to save.
     * @return the persisted entity.
     */
	DisasterApproval save(DisasterApproval crop);

    /**
     * Partially updates a crop.
     *
     * @param crop the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DisasterApproval> partialUpdate(DisasterApproval crop);

    /**
     * Get all the crops.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DisasterApproval> findAll(Pageable pageable);

    /**
     * Get the "id" crop.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DisasterApproval> findOne(String id);

    /**
     * Delete the "id" crop.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    Page<DisasterApproval> findByDisasterId(String disasterId, Pageable pageable);
}
