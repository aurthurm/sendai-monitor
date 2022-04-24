package disaster.loss.repository;

import disaster.loss.domain.Province;

import org.slf4j.Logger;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Province entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProvinceRepository extends JpaRepository<Province, String> {

	Province getByProvinceId(String locationId);
}
