package disaster.loss.repository;

import disaster.loss.domain.District;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the District entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DistrictRepository extends JpaRepository<District, String> {

	List<District> findByProvinceId(String provinceId);

	District getByDistrictId(String locationId);

	Page<District> findByProvinceId(String provinceId, Pageable pageable);
}
