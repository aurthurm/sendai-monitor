package disaster.loss.repository;


import disaster.loss.domain.Disaster;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the LaboratoryRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomDisasterRepository {
    Page<Disaster> search(String searchText, Pageable pageable);
}
