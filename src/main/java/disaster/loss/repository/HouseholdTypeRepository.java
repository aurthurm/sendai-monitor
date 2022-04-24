package disaster.loss.repository;

import disaster.loss.domain.HouseholdType;
import disaster.loss.domain.InfrastructureType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the HouseholdType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HouseholdTypeRepository extends JpaRepository<HouseholdType, String> {
}
