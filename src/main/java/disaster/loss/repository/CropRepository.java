package disaster.loss.repository;

import disaster.loss.domain.Crop;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Crop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CropRepository extends JpaRepository<Crop, String> {
	Page<Crop> findByDisasterId(String disasterId, Pageable pageable);

	List<Crop> findByDisasterIdAndHecterageAffectedIsNotNullOrEstimatedLossIsNotNull(String disasterId);
}
