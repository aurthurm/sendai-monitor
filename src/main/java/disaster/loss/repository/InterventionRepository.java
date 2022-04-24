package disaster.loss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Intervention;

/**
 * Spring Data SQL repository for the CropType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InterventionRepository extends JpaRepository<Intervention, String> {}
