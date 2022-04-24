package disaster.loss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.HumanPopulation;
import disaster.loss.service.dto.ICountByMonthDTO;

@Repository
public interface SendaiMonitorGroupByMonthRepository extends JpaRepository<HumanPopulation, Integer> {

	@Query(value = "SELECT TO_CHAR(created_date, 'Month') AS Month, 'Number of deaths and missing persons attributed to "
			+ "disasters, per 100,000 population.' as title, SUM(c.value) AS totalCount FROM public.human_population "
			+ "AS c GROUP BY Month ", nativeQuery = true)
	List<ICountByMonthDTO> countTotalCommentsByYearNative();
}
