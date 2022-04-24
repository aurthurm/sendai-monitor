package disaster.loss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.RequiredDisasterIntervention;

/**
 * Spring Data SQL repository for the DisasterIntervention entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequiredDisasterInterventionRepository extends JpaRepository<RequiredDisasterIntervention, String> {

	void deleteByDisasterId(String disasterId);

	List<RequiredDisasterIntervention> findByDisasterId(String disasterId);
}
