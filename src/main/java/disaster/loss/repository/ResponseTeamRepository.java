package disaster.loss.repository;

import disaster.loss.domain.ResponseTeam;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ResponseTeam entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ResponseTeamRepository extends JpaRepository<ResponseTeam, String> {}
