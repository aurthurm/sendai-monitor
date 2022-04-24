package disaster.loss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import disaster.loss.domain.FileData;

/**
 * Spring Data SQL repository for the FileData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FileDataRepository extends JpaRepository<FileData, String> {

	List<FileData> findByDisasterId(String disasterId);
}
