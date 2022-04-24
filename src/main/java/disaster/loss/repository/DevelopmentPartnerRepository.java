package disaster.loss.repository;

import disaster.loss.domain.DevelopmentPartner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DevelopmentPartner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DevelopmentPartnerRepository extends JpaRepository<DevelopmentPartner, String> {}
