package disaster.loss.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.HumanPopulation;
import disaster.loss.domain.enumeration.DISABILITY;
import disaster.loss.domain.enumeration.HUMAN_POPULATION;
import disaster.loss.repository.interfaces.ICountGroupBy;
import disaster.loss.repository.interfaces.IInfrastuctureStatistics;

/**
 * Spring Data SQL repository for the HumanPopulation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HumanPopulationRepository extends JpaRepository<HumanPopulation, String> {

	Page<HumanPopulation> findByDisasterId(String disasaterId, Pageable pageable);

	List<HumanPopulation> findAllByDisasterId(String disasterId);

	List<HumanPopulation> findAllByDisasterIdOrderByPopulationTypeAscDisabledAsc(String disasterId);

	@Query(value = "SELECT * from human_population where population_type=?1 and disaster_id=?3 and disability=?2", nativeQuery = true)
	List<HumanPopulation> getHumanPopulationByTypeDisabilityAndDisasterId(String populationType, String disability,
			String disasterId, Integer value);

	List<HumanPopulation> findByPopulationTypeAndDisabledAndDisasterIdAndValueGreaterThan(
			HUMAN_POPULATION populationType, DISABILITY disablity, String disasterId, Integer value);

	HumanPopulation findByPopulationTypeAndDisasterId(String populationType, String disasterId);

	@Query(value = "SELECT sum(h.value) AS count ,h.human_population_disaster_category_name AS group  FROM human_population AS h \n"
			+ "group by h.human_population_disaster_category_name", nativeQuery = true)
	List<ICountGroupBy> humanPopulationDisasterEffects();
	
	@Query(value = "SELECT sum(i.damaged) as damaged, sum(i.destroyed) as destroyed, sum(i.value) as value, it.name\n"
			+ "FROM public.infrastructure i inner join infrastructure_type it \n"
			+ "on i.infractructure_type_id = it.infractructure_type_id\n"
			+ "where   damaged > 0 or destroyed > 0 or value >0\n"
			+ "group by it.name", nativeQuery = true)
	List<IInfrastuctureStatistics> damagedDestroyedInfrastructureValue();
	
	@Query(value = "SELECT sum(h.number_of_households) as number_of_houses_affected, sum(h.number_of_people_affected) as number_of_people_affected, ht.name FROM public.household h inner join household_type ht \n"
			+ "	on h.household_type_id = ht.household_type_id\n"
			+ "	where   h.number_of_households > 0\n"
			+ "	group by ht.name", nativeQuery = true)
	List<IInfrastuctureStatistics> houseHoldsDestroyed();
	
	
	
}
