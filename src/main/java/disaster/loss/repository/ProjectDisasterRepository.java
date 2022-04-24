package disaster.loss.repository;

import disaster.loss.domain.ProjectDisaster;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProjectDisaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjectDisasterRepository extends JpaRepository<ProjectDisaster, String> {}
