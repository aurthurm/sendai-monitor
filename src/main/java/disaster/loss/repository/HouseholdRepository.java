package disaster.loss.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Household;

/**
 * Spring Data SQL repository for the Household entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HouseholdRepository extends JpaRepository<Household, String> {

	Page<Household> findByDisasterId(String disasterId, Pageable pageable);

	Household findByDisasterIdAndHouseholdTypeId(String disasterId, String householdTypeId);

}
