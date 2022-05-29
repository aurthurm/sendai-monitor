package disaster.loss.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Infrastructure;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Repository
public interface SendaiMonitorAggregateTartgetDRepository extends JpaRepository<Infrastructure, Integer> {

	// Global target A: Substantially reduce global disaster mortality by 2030, aiming to lower average per 100,000 global mortality between 2020-2030 compared with 2005-2015.
	@Query(value = "SELECT SUM(i.value) AS totalCount,\n"
			+ "'D-1 (compound) Damage to critical infrastructure attributed to disasters.' AS title\n"
			+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
			+ "where d.incident_date BETWEEN :from AND :to", nativeQuery = true)
	ISendaiAggregateDTO damagedToCriticalInfrastucture(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	// D-2 Number of destroyed or damaged health facilities attributed to disasters.
	@Query(value = "SELECT SUM(i.value) AS totalCount,\n"
			+ "'D-2 Number of destroyed or damaged health facilities attributed to disasters.' AS title\n"
			+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
			+ "where i.infractructure_type_id in ('85f753c8-a495-11ec-b375-90ccdfa85f13') \n"
			+ " and d.incident_date BETWEEN :from AND :to", nativeQuery = true)
	ISendaiAggregateDTO destroyedOrDamagedHealthFacilities(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	// D-3 Number of destroyed or damaged educational facilities attributed to disasters.
	@Query(value = "SELECT GREATEST(0, SUM(i.damaged + i.destroyed)) AS totalCount,\n"
			+ "'D-3 Number of destroyed or damaged educational facilities attributed to disasters.' AS title\n"
			+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
			+ "where infractructure_type_id in "
			+ "('85f753c8-a495-11ec-b375-90ccdfa85f23','85f753c8-a495-11ec-b375-90ccdfa85f11')"
			+ "", nativeQuery = true)
	ISendaiAggregateDTO damagedOrDestroyedEducationalFacilities(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);


	// D-4 Number of other destroyed or damaged critical infrastructure units and facilities attributed to disasters.
		@Query(value = "SELECT GREATEST(0, SUM(i.damaged + i.destroyed)) AS totalCount,\n"
				+ "'D-4 Number of other destroyed or damaged critical infrastructure units and facilities attributed to disasters.' AS title\n"
				+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
				+ "where infractructure_type_id in "
				+ "('85f753c8-a495-11ec-b375-90ccdfa85f19')"
				+ " and d.incident_date BETWEEN :from AND :to", nativeQuery = true)
	ISendaiAggregateDTO OtherdamagedOrDestroyed(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	//B-2 Number of injured or ill people attributed to disasters, per 100,000 population.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount, \n "
			+ "'D-5 (compound) Number of disruptions to basic services attributed to disasters.' AS title \n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id in "
			+ "('f026ee93-a5b7-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO disruptionsToBasicDervices(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);


	//B-3	Number of people whose damaged dwellings were attributed to disasters.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'D-6 Number of disruptions to educational services attributed to disasters.' AS title\n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id in "
			+ "('113b3ae1-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
			ISendaiAggregateDTO disruptionsToEducationalServices (@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	//B-3	Number of people whose damaged dwellings were attributed to disasters.
		@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
				+ "'D-7 Number of disruptions to health services attributed to disasters.' AS title\n"
				+ "FROM public.human_population AS c \n"
				+ "where human_population_disaster_category_id in "
				+ "('113b3ae1-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
				ISendaiAggregateDTO disruptionsToHeathServices (@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);



		//B-3	Number of people whose damaged dwellings were attributed to disasters.
		@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
				+ "'D-8 Number of disruptions to other basic services attributed to disasters.' AS title\n"
				+ "FROM public.human_population AS c \n"
				+ "where human_population_disaster_category_id in "
				+ "('113b3ae1-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
				ISendaiAggregateDTO disruptionsToOtherBasicServices (@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);



}
