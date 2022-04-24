package disaster.loss.repository;

import disaster.loss.domain.DisasterType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DisasterType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisasterTypeRepository extends JpaRepository<DisasterType, String> {}
