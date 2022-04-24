package disaster.loss.service;

import disaster.loss.domain.Beneficiary;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Beneficiary}.
 */
public interface BeneficiaryService {
    /**
     * Save a beneficiary.
     *
     * @param beneficiary the entity to save.
     * @return the persisted entity.
     */
    Beneficiary save(Beneficiary beneficiary);

    /**
     * Partially updates a beneficiary.
     *
     * @param beneficiary the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Beneficiary> partialUpdate(Beneficiary beneficiary);

    /**
     * Get all the beneficiaries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Beneficiary> findAll(Pageable pageable);

    /**
     * Get the "id" beneficiary.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Beneficiary> findOne(String id);

    /**
     * Delete the "id" beneficiary.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
