package disaster.loss.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import disaster.loss.domain.DonationItem;

/**
 * Service Interface for managing {@link DonationItem}.
 */
public interface DonationItemService {
    /**
     * Save a donationItem.
     *
     * @param donation the entity to save.
     * @return the persisted entity.
     */
	DonationItem save(DonationItem donation);

    /**
     * Partially updates a donationItem.
     *
     * @param donationItem the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DonationItem> partialUpdate(DonationItem donation);

    /**
     * Get all the donationItem.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DonationItem> findAll(Pageable pageable);

    /**
     * Get the "id" donationItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DonationItem> findOne(String id);

    /**
     * Delete the "id" donationItem.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
