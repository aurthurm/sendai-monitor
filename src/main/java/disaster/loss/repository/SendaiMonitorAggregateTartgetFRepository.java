package disaster.loss.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Infrastructure;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Repository
public interface SendaiMonitorAggregateTartgetFRepository extends JpaRepository<Infrastructure, Integer> {

	// Global target A: Substantially reduce global disaster mortality by 2030, aiming to lower average per 100,000 global mortality between 2020-2030 compared with 2005-2015.
	@Query(value = "SELECT SUM(i.value) AS totalCount,\n"
			+ "'F-1 Total official international support, (official development assistance (ODA) plus other official flows), for national disaster risk reduction actions.\n"
			+ "Reporting of the provision or receipt of international cooperation for disaster risk reduction shall be done in accordance with the modalities applied in "
			+ "respective countries. Recipient countries are encouraged to provide information on the estimated amount of national disaster risk reduction expenditure.' AS title\n"
			+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
			+ "where d.incident_date BETWEEN :from AND :to", nativeQuery = true)
	ISendaiAggregateDTO damagedToCriticalInfrastucture(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	// F-2 Number of destroyed or damaged health facilities attributed to disasters.
	@Query(value = "SELECT SUM(i.value) AS totalCount,\n"
			+ "'F-2 Total official international support (ODA plus other official flows) for national disaster risk reduction actions provided by multilateral agencies.' AS title\n"
			+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
			+ "where i.infractructure_type_id in ('85f753c8-a495-11ec-b375-90ccdfa85f13') \n"
			+ " and d.incident_date BETWEEN :from AND :to", nativeQuery = true)
	ISendaiAggregateDTO destroyedOrDamagedHealthFacilities(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	// D-3 Number of destroyed or damaged educational facilities attributed to disasters.
	@Query(value = "SELECT GREATEST(0, SUM(i.damaged + i.destroyed)) AS totalCount,\n"
			+ "'F-3 Total official international support (ODA plus other official flows) for national disaster risk reduction actions provided bilaterally.' AS title\n"
			+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
			+ "where infractructure_type_id in "
			+ "('85f753c8-a495-11ec-b375-90ccdfa85f23','85f753c8-a495-11ec-b375-90ccdfa85f11')"
			+ "", nativeQuery = true)
	ISendaiAggregateDTO damagedOrDestroyedEducationalFacilities(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);


	// D-4 Number of other destroyed or damaged critical infrastructure units and facilities attributed to disasters.
		@Query(value = "SELECT GREATEST(0, SUM(i.damaged + i.destroyed)) AS totalCount,\n"
				+ "'F-4 Total official international support (ODA plus other official flows) for the transfer and exchange of disaster risk reduction-related technology.' AS title\n"
				+ "FROM public.infrastructure AS i inner join disaster AS d on d.disaster_id = i.disaster_id \n" 
				+ "where infractructure_type_id in "
				+ "('85f753c8-a495-11ec-b375-90ccdfa85f19')"
				+ " and d.incident_date BETWEEN :from AND :to", nativeQuery = true)
	ISendaiAggregateDTO OtherdamagedOrDestroyed(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	//B-2 Number of injured or ill people attributed to disasters, per 100,000 population.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount, \n "
			+ "'F-5 Number of international, regional and bilateral programmes and initiatives for the transfer and exchange of science, technology and innovation in disaster risk reduction for developing countries.' AS title \n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id in "
			+ "('f026ee93-a5b7-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO disruptionsToBasicDervices(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);


	//B-3	Number of people whose damaged dwellings were attributed to disasters.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'F-6 Total official international support (ODA plus other official flows) for disaster risk reduction capacity-building.' AS title\n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id in "
			+ "('113b3ae1-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
			ISendaiAggregateDTO disruptionsToEducationalServices (@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	//B-3	Number of people whose damaged dwellings were attributed to disasters.
		@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
				+ "'F-7 Number of international, regional and bilateral programmes and initiatives for disaster risk reduction-related capacity-building in developing countries.' AS title\n"
				+ "FROM public.human_population AS c \n"
				+ "where human_population_disaster_category_id in "
				+ "('113b3ae1-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
				ISendaiAggregateDTO disruptionsToHeathServices (@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);



		//B-3	Number of people whose damaged dwellings were attributed to disasters.
		@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
				+ "'F-8 Number of developing countries supported by international, regional and bilateral initiatives to strengthen their disaster risk reduction-related statistical capacity.' AS title\n"
				+ "FROM public.human_population AS c \n"
				+ "where human_population_disaster_category_id in "
				+ "('113b3ae1-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
				ISendaiAggregateDTO disruptionsToOtherBasicServices (@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);



}
