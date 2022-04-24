package disaster.loss.service;

import disaster.loss.domain.PartnerIntervention;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link PartnerIntervention}.
 */
public interface PartnerInterventionService {
    /**
     * Save a partnerIntervention.
     *
     * @param partnerIntervention the entity to save.
     * @return the persisted entity.
     */
    PartnerIntervention save(PartnerIntervention partnerIntervention);

    /**
     * Partially updates a partnerIntervention.
     *
     * @param partnerIntervention the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PartnerIntervention> partialUpdate(PartnerIntervention partnerIntervention);

    /**
     * Get all the partnerInterventions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PartnerIntervention> findAll(Pageable pageable);

    /**
     * Get the "id" partnerIntervention.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PartnerIntervention> findOne(String id);

    /**
     * Delete the "id" partnerIntervention.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
