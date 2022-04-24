package disaster.loss.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.DisasterApproval;

/**
 * Spring Data SQL repository for the DisasterApproval entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisasterApprovalRepository extends JpaRepository<DisasterApproval, String> {

	Page<DisasterApproval> findByDisasterId(String disasterId, Pageable pageable);
}
