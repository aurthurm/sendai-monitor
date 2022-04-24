package disaster.loss.repository;

import disaster.loss.domain.Casualty;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Casualty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CasualtyRepository extends JpaRepository<Casualty, String> {

	Page<Casualty> findByDisasterId(String disasterId, Pageable pageable);}
