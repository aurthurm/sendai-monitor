package disaster.loss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Constant;

/**
 * Spring Data SQL repository for the Constant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ConstantRepository extends JpaRepository<Constant, String> {

}
