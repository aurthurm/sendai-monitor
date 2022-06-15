package disaster.loss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.DonationItem;

/**
 * Spring Data SQL repository for the DonationItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DonationItemRepository extends JpaRepository<DonationItem, String> {

}
