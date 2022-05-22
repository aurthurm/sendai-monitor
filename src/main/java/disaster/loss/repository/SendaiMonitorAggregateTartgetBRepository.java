package disaster.loss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.HumanPopulation;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Repository
public interface SendaiMonitorAggregateTartgetBRepository extends JpaRepository<HumanPopulation, Integer> {

	final static String injuries = "113b3ae1-a5b8-11ec-adfd-90ccdfa85f11";

	final static String deaths = "1edabdc2-a5b8-11ec-adfd-90ccdfa85f11";

	final static String missing = "186894a2-a5b8-11ec-adfd-90ccdfa85f11";

	final static String displaced = "0850d6f2-a5b8-11ec-adfd-90ccdfa85f11";

	final static String ill = "f026ee93-a5b7-11ec-adfd-90ccdfa85f11";

	// Global target B: Substantially reduce the number of affected people globally
	// by 2030, aiming to lower the average global figure per 100,000 between
	// 2020-2030 compared with 2005-2015.

	// B-1 (compound) Number of directly affected people attributed to disasters,
	// per 100,000 population.
	@Query(value = "SELECT SUM(c.affected_population) AS totalCount,\n"
			+ "'B-1 (compound) Number of directly affected people attributed to disasters, per 100,000 population.' AS title\n"
			+ "FROM public.disaster AS c \n", nativeQuery = true)
	ISendaiAggregateDTO numberOfDirectlyAffectedPeople();

	// B-2 Number of injured or ill people attributed to disasters, per 100,000
	// population.
	@Query(value = "SELECT 'name' AS name, SUM(c.value) AS totalCount,\n"
			+ "'B-2 Number of injured or ill people attributed to disasters, per 100,000 population.' AS title\n"
			+ "FROM public.human_population AS c \n" + "where human_population_disaster_category_id in "
			+ "('113b3ae1-a5b8-11ec-adfd-90ccdfa85f11', 'f026ee93-a5b7-11ec-adfd-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO numberOfInjuredOrIllPeople();

	// B-3 Number of people whose damaged dwellings were attributed to disasters.
	@Query(value = "SELECT 'name' AS name, sum(c.number_of_people_affected) AS totalCount,\n"
			+ "'B-3 Number of people whose damaged dwellings were attributed to disasters.' AS title\n"
			+ "FROM public.household AS c \n" + "where household_type_id in "
			+ "('85f753c8-a495-11ec-b375-90ccdfa85f11')", nativeQuery = true)
	ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDamaged();

	// B-4 Number of people whose destroyed dwellings were attributed to disasters.
	@Query(value = "SELECT 'name' AS name, SUM(c.number_of_people_affected) AS totalCount,\n"
			+ "'B-4	Number of people whose destroyed dwellings were attributed to disasters.' AS title\n"
			+ "FROM public.household AS c \n" + "where household_type_id in "
			+ "('85f753c8-a495-11ec-b375-90ccdfa85f12')", nativeQuery = true)
	ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDestroyed();

	// B-5 Number of people whose livelihoods were disrupted or destroyed,
	// attributed to disasters.
	@Query(value = "SELECT SUM(c.affected_population) AS totalCount,\n"
			+ "'B-5	Number of people whose livelihoods were disrupted or destroyed, attributed to disasters.' AS title\n"
			+ "FROM public.disaster AS c \n", nativeQuery = true)
	ISendaiAggregateDTO numberOfPeopleWhoseLivelihoodsWereDisrupted();

}
