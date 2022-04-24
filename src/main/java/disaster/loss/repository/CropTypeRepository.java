package disaster.loss.repository;

import disaster.loss.domain.CropType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CropType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CropTypeRepository extends JpaRepository<CropType, String> {}
