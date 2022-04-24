package disaster.loss.repository;

import disaster.loss.domain.Village;
import disaster.loss.service.dto.VillageDTO;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Village entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VillageRepository extends JpaRepository<Village, String> {

	List<Village> findByWardId(String wardId);

	Village getByVillageId(String locationId);

}
