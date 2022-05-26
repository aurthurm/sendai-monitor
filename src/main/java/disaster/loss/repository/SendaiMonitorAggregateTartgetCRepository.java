package disaster.loss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.HumanPopulation;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Repository
public interface SendaiMonitorAggregateTartgetCRepository extends JpaRepository<HumanPopulation, Integer> {

	@Query(value = "SELECT SUM(c.direct_economic_loss) AS totalCount,\n"
			+ "'C-1 (compound) Direct economic loss attributed to disasters in relation to global gross domestic product.' AS title\n"
			+ "FROM public.disaster AS c \n", nativeQuery = true)
	ISendaiAggregateDTO economicLoss();

	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'C-2 Direct agricultural loss attributed to disasters.' AS title\n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id = '1edabdc2-a5b8-11ec-adfd-90ccdfa85f11'\n"
			+ "GROUP BY name", nativeQuery = true)
	ISendaiAggregateDTO agriculturlLoss();

	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'C-3 Direct economic loss to all other damaged or destroyed productive assets attributed to disasters.' AS title\n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id in "
			+ "('186894a2-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO damagedOrDestroyedProductiveAssets();

	//Global target B: Substantially reduce the number of affected people globally by 2030, aiming to lower the average global figure per 100,000 between 2020-2030 compared with 2005-2015.

	//B-1 (compound) Number of directly affected people attributed to disasters, per 100,000 population.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'C-4 Direct economic loss in the housing sector attributed to disasters.' AS title\n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id in "
			+ "('f026ee93-a5b7-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO econonicLossInHousingSector();

	//B-2 Number of injured or ill people attributed to disasters, per 100,000 population.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount, \n "
			+ "'C-5 Direct economic loss resulting \from damaged or destroyed critical infrastructure attributed to disasters' AS title \n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id in "
			+ "('f026ee93-a5b7-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO economicLossToInfrastructure();


	//B-3	Number of people whose damaged dwellings were attributed to disasters.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'C-6 Direct economic loss to cultural heritage damaged or destroyed attributed to disasters.' AS title\n"
			+ "FROM public.human_population AS c \n"
			+ "where human_population_disaster_category_id in "
			+ "('113b3ae1-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
			ISendaiAggregateDTO culturalHeritageEconomicLoss ();


}
