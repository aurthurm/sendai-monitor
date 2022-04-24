package disaster.loss.repository;

import disaster.loss.domain.LiveStock;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LiveStock entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LiveStockRepository extends JpaRepository<LiveStock, String> {
    Page<LiveStock> findByDisasterId(String disasterId, Pageable pageable);

	//List<LiveStock> findByDisasterIdAndLiveStockAffectedIsNotNullOrEstimatedLossIsNotNull(String disasterId);
}
