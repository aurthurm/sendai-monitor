package disaster.loss.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Infrastructure;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Repository
public interface SendaiMonitorAggregateTartgetERepository extends JpaRepository<Infrastructure, Integer> {

	// Global target A: Substantially reduce global disaster mortality by 2030, aiming to lower average per 100,000 global mortality between 2020-2030 compared with 2005-2015.
	@Query(value = "SELECT SUM(i.value) AS totalCount,\n"
			+ "'E-1 Number of countries that adopt and implement national disaster risk reduction "
			+ "strategies in line with the Sendai Framework for Disaster Risk Reduction 2015-2030.' AS title\n"
			+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
			+ "where d.incident_date BETWEEN :from AND :to", nativeQuery = true)
	ISendaiAggregateDTO damagedToCriticalInfrastucture(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	// D-2 Number of destroyed or damaged health facilities attributed to disasters.
	@Query(value = "SELECT SUM(i.value) AS totalCount,\n"
			+ "'E-2 Percentage of local governments that adopt and implement local disaster risk "
			+ "reduction strategies in line with national strategies.' AS title\n"
			+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
			+ "where i.infractructure_type_id in ('85f753c8-a495-11ec-b375-90ccdfa85f13') \n"
			+ " and d.incident_date BETWEEN :from AND :to", nativeQuery = true)
	ISendaiAggregateDTO destroyedOrDamagedHealthFacilities(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	
}
