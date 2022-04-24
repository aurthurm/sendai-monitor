package disaster.loss.repository;

import disaster.loss.domain.Ward;
import disaster.loss.service.dto.VillageDTO;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Ward entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WardRepository extends JpaRepository<Ward, String> {

	List<Ward> findByDistrictId(String districtId);

	Ward getByWardId(String locationId);

}
