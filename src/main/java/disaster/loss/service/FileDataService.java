package disaster.loss.service;

import disaster.loss.domain.FileData;

import java.io.IOException;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service Interface for managing {@link FileData}.
 */
public interface FileDataService {
    /**
     * Save a fileData.
     *
     * @param fileData the entity to save.
     * @return the persisted entity.
     */
    //FileData save(FileData fileData);

    /**
     * Partially updates a fileData.
     *
     * @param fileData the entity to update partially.
     * @return the persisted entity.
     */
    Optional<FileData> partialUpdate(FileData fileData);

    /**
     * Get all the fileData.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<FileData> findAll(Pageable pageable);

    /**
     * Get the "id" fileData.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<FileData> findOne(String id);

    /**
     * Delete the "id" fileData.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

	void save(MultipartFile file, String disasterId) throws IOException;
}
