package disaster.loss.service;

import disaster.loss.domain.DevelopmentPartner;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link DevelopmentPartner}.
 */
public interface DevelopmentPartnerService {
    /**
     * Save a developmentPartner.
     *
     * @param developmentPartner the entity to save.
     * @return the persisted entity.
     */
    DevelopmentPartner save(DevelopmentPartner developmentPartner);

    /**
     * Partially updates a developmentPartner.
     *
     * @param developmentPartner the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DevelopmentPartner> partialUpdate(DevelopmentPartner developmentPartner);

    /**
     * Get all the developmentPartners.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DevelopmentPartner> findAll(Pageable pageable);

    /**
     * Get the "id" developmentPartner.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DevelopmentPartner> findOne(String id);

    /**
     * Delete the "id" developmentPartner.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
