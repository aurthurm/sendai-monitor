package disaster.loss.service;

import disaster.loss.domain.Casualty;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

/**
 * Service Interface for managing {@link Casualty}.
 */
public interface CasualtyService {
    /**
     * Save a casualty.
     *
     * @param casualty the entity to save.
     * @return the persisted entity.
     */
    Casualty save(Casualty casualty);

    /**
     * Partially updates a casualty.
     *
     * @param casualty the entity to update partially.eclipse-javadoc:%E2%98%82=sendai-monitor/src%5C/main%5C/java=/optional=/true=/=/maven.pomderived=/true=/%3Cdisaster.loss.service%7BCasualtyService.java%E2%98%83CasualtyService%E2%98%82Casualty
     * @return the persisted entity.
     */
    Optional<Casualty> partialUpdate(Casualty casualty);

    /**
     * Get all the casualties.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Casualty> findAll(Pageable pageable);

    /**
     * Get the "id" casualty.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Casualty> findOne(String id);

    /**
     * Delete the "id" casualty.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    List<Casualty> uploadCSVCauslties(MultipartFile csvFile, String disasterId);

	Page<Casualty> findAllForDisaster(Pageable pageable, String disasterId);
}
