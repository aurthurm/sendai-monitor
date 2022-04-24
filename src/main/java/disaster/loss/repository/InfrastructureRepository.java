package disaster.loss.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Infrastructure;
import disaster.loss.domain.InfrastructureType;
import disaster.loss.domain.LiveStock;

/**
 * Spring Data SQL repository for the Infrastructure entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InfrastructureRepository extends JpaRepository<Infrastructure, String> {
	Page<Infrastructure> findByDisasterId(String disasterId, Pageable pageable);

	List<Infrastructure> findByDisasterIdAndDamagedIsNotNullOrDestroyedIsNotNullOrValueIsNotNullOrderByInfractructureType(
			String disasterId);

	Infrastructure findByDisasterIdAndInfractructureTypeId(String disasterId, String infractructureTypeId);

}
