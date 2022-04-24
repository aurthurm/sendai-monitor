package disaster.loss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.FulfilledDisasterIntervention;

/**
 * Spring Data SQL repository for the DisasterIntervention entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FulfilledDisasterInterventionRepository extends JpaRepository<FulfilledDisasterIntervention, String> {


}
