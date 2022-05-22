package disaster.loss.repository;

import disaster.loss.domain.Province;
import disaster.loss.service.dto.ISendaiAggregateDTO;

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
	
	@Query(value = "SELECT count(d.disaster_id), p.alias FROM public.province p\n"
			+ "left join public.disaster d on d.location_id = p.province_id group by  p.alias\n"
			+ "", nativeQuery = true)
	ISendaiAggregateDTO zimbaweMapByProvince();
}
