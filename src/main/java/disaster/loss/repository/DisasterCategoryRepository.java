package disaster.loss.repository;

import disaster.loss.domain.DisasterCategory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DisasterCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisasterCategoryRepository extends JpaRepository<DisasterCategory, String> {}
