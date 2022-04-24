package disaster.loss.repository;

import java.util.List;
import java.util.Optional;

import disaster.loss.domain.enumeration.DATA_APPROVAL;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.Disaster;
import disaster.loss.repository.interfaces.ICountGroupBy;


/**
 * Spring Data SQL repository for the Disaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DisasterRepository extends JpaRepository<Disaster, String> {


	List<Disaster> findByDisasterIdIn(List<String> laboratoryIds);

    @Query("SELECT d.disasterCategory.name AS group, COUNT(d.disasterCategory.name) AS count "
        + "FROM Disaster AS d GROUP BY d.disasterCategory.name")
    List<ICountGroupBy> groupByDisasterCategory();

    @Query("SELECT d.disasterType.name AS group, COUNT(d.disasterType.name) AS count "
        + "FROM Disaster AS d GROUP BY d.disasterType.name")
    List<ICountGroupBy> groupByDisasterType();

    Long countByIsDeclared(boolean b);

    Long countByApprovalStatus(DATA_APPROVAL requestchanges);

    Optional<Disaster> getByDisasterId(String disasterId);

    Page<Disaster> findByApprovalStatus(DATA_APPROVAL approvalStatus, Pageable pageable);

    Disaster findByDisasterId(String disasterId);
}
