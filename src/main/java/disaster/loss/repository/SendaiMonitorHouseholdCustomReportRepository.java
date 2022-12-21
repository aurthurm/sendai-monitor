package disaster.loss.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Household;
import disaster.loss.service.dto.IHouseholdCustomReportDTO;

@Repository
public interface SendaiMonitorHouseholdCustomReportRepository extends JpaRepository<Household, Integer> {

	@Query(value = "SELECT ht.name,sum(h.number_of_households) AS numberOfHouseholds, sum(h.number_child_headed) AS numberChildHeaded ,\n"
			+ "sum(h.number_female_headed) AS numberFemaleHeaded, sum(h.number_of_people_affected) AS numberOfPeopleAffected\n"
			+ "FROM public.household AS h\n"
			+ "inner join public.household_type AS ht on ht.household_type_id = h.household_type_id\n"
			+ "inner join public.disaster AS d on d.disaster_id = h.disaster_id\n"
			+ "group by ht.name ORDER BY ht.name ASC", nativeQuery = true)
	List<IHouseholdCustomReportDTO> findByDateIssuedBetween(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

}
