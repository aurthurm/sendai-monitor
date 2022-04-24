package disaster.loss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Crop;
import disaster.loss.domain.HumanPopulationDisasterCategory;

/**
 * Spring Data SQL repository for the HumanPopulationDisasterCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HumanPopulationDisasterCategoryRepository extends JpaRepository<HumanPopulationDisasterCategory, String> {}
