package disaster.loss.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.HumanPopulation;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Repository
public interface SendaiMonitorAggregateTartgetCRepository extends JpaRepository<HumanPopulation, Integer> {

	@Query(value = "SELECT SUM(d.direct_economic_loss) AS totalCount,\n"
			+ "'C-1 (compound) Direct economic loss attributed to disasters in relation to global gross domestic product.' AS title\n"
			+ "FROM public.disaster AS d where d.incident_date BETWEEN :from AND :to  \n", nativeQuery = true)
	ISendaiAggregateDTO economicLoss(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	@Query(value = "SELECT SUM(c.estimated_loss) AS totalCount,\n"
			+ "'C-2 Direct agricultural loss attributed to disasters.' AS title\n"
			+ "FROM public.live_stock AS c \n", nativeQuery = true)
	ISendaiAggregateDTO livestockLoss(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	@Query(value = "SELECT  SUM(c.estimated_loss) AS totalCount,\n"
			+ "'C-2 Direct agricultural loss attributed to disasters.' AS title\n"
			+ "FROM public.crop AS c \n", nativeQuery = true)
	ISendaiAggregateDTO crops(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	@Query(value = "SELECT  SUM(c.value) AS totalCount,\n"
			+ "'C-3 Direct economic loss to all other damaged or destroyed productive assets attributed to disasters.' AS title\n"
			+ "FROM public.infrastructure AS c \n", nativeQuery = true)
	ISendaiAggregateDTO infrastructureLoss(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'C-3 Direct economic loss to all other damaged or destroyed productive assets attributed to disasters.' AS title\n"
			+ "FROM public.human_population AS c \n" + "where human_population_disaster_category_id in "
			+ "('186894a2-a5b8-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO damagedOrDestroyedProductiveAssets(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	// C-4 Direct economic loss in the housing sector attributed to disasters.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'C-4 Direct economic loss in the housing sector attributed to disasters.' AS title\n"
			+ "FROM public.infrastructure AS c \n" + "where infractructure_type_id in \n"
			+ "('85f753c8-a495-11ec-b375-90ccdfa85f12')", nativeQuery = true)
	ISendaiAggregateDTO econonicLossInHousingSector(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	// C-5 Direct economic loss resulting /from damaged or destroyed critical
	// infrastructure attributed to disasters
	@Query(value = "SELECT  SUM(c.value) AS totalCount,\n"
			+ "'C-5 Direct economic loss resulting /from damaged or destroyed critical infrastructure attributed to disasters' AS title\n"
			+ "FROM public.infrastructure AS c \n", nativeQuery = true)
	ISendaiAggregateDTO economicLossFromCriticalInfrastructure(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

	// C-6 Direct economic loss to cultural heritage damaged or destroyed attributed to disasters.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'C-6 Direct economic loss to cultural heritage damaged or destroyed attributed to disasters.' AS title\n"
			+ "FROM public.infrastructure AS c \n" + "where infractructure_type_id in "
			+ "('85f753c8-a495-11ec-b375-90ccdfa85f17')", nativeQuery = true)
	ISendaiAggregateDTO culturalHeritageEconomicLoss(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

}
