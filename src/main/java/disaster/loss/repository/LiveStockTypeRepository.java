package disaster.loss.repository;

import disaster.loss.domain.LiveStockType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LiveStockType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LiveStockTypeRepository extends JpaRepository<LiveStockType, String> {}
