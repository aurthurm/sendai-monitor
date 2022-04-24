package disaster.loss.repository;

import disaster.loss.domain.InfrastructureType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the InfrastructureType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InfrastructureTypeRepository extends JpaRepository<InfrastructureType, String> {}
