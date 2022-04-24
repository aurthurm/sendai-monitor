package disaster.loss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.HumanPopulation;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Repository
public interface SendaiMonitorAggregateTartgetARepository extends JpaRepository<HumanPopulation, Integer> {

	final static String injuries = "113b3ae1-a5b8-11ec-adfd-90ccdfa85f11";

	final static String deaths = "1edabdc2-a5b8-11ec-adfd-90ccdfa85f11";

	final static String missing = "186894a2-a5b8-11ec-adfd-90ccdfa85f11";

	final static String displaced = "0850d6f2-a5b8-11ec-adfd-90ccdfa85f11";

	final static String ill = "f026ee93-a5b7-11ec-adfd-90ccdfa85f11";

	// Global target A: Substantially reduce global disaster mortality by 2030,
	// aiming to lower average per 100,000 global mortality between 2020-2030
	// compared with 2005-2015.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'A-1 (compound) Number of deaths and missing persons attributed to disasters, per 100,000 population.' AS title\n"
			+ "FROM public.human_population AS c \n" + "where human_population_disaster_category_id in "
			+ "('1edabdc2-a5b8-11ec-adfd-90ccdfa85f11','186894a2-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO numberOfDeathsAndMissingPersons();

	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'A-2 Number of deaths attributed to disasters, per 100,000 population.' AS title\n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id = '1edabdc2-a5b8-11ec-adfd-90ccdfa85f11'\n"
			+ "GROUP BY name", nativeQuery = true)
	ISendaiAggregateDTO numberOfDeaths();

	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'A-3 Number of missing persons attributed to disasters, per 100,000 population.' AS title\n"
			+ "FROM public.human_population AS c \n" + "where human_population_disaster_category_id in "
			+ "('186894a2-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO numberOfMissingPersons();

}
