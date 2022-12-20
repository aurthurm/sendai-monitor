package disaster.loss.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Crop;
import disaster.loss.service.dto.ICropCustomReportDTO;

@Repository
public interface SendaiMonitorCropCustomReportRepository extends JpaRepository<Crop, Integer> {

	@Query(value = "SELECT ct.name, sum(c.hecterage_affected) AS hecterageAffected, sum(c.estimated_loss) AS EstimatedLoss FROM public.crop AS c\n"
			+ "inner join public.crop_type AS ct on\n" + "c.crop_type_id = ct.crop_type_id\n"
			+ "inner join public.disaster AS d on d.disaster_id = c.disaster_id\n"
			+ "where d.incident_date BETWEEN :from AND :to\n" + "group by ct.name\n"
			+ "ORDER BY ct.name ASC", nativeQuery = true)
	List<ICropCustomReportDTO> findByDateIssuedBetween(@Param("from") LocalDate dateFrom, @Param("to") LocalDate dateTo);

}
