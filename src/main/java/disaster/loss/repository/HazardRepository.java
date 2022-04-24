package disaster.loss.repository;

import disaster.loss.domain.Hazard;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Hazard entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HazardRepository extends JpaRepository<Hazard, String> {}
