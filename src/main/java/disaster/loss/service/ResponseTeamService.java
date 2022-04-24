package disaster.loss.service;

import disaster.loss.domain.ResponseTeam;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ResponseTeam}.
 */
public interface ResponseTeamService {
    /**
     * Save a responseTeam.
     *
     * @param responseTeam the entity to save.
     * @return the persisted entity.
     */
    ResponseTeam save(ResponseTeam responseTeam);

    /**
     * Partially updates a responseTeam.
     *
     * @param responseTeam the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ResponseTeam> partialUpdate(ResponseTeam responseTeam);

    /**
     * Get all the responseTeams.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ResponseTeam> findAll(Pageable pageable);

    /**
     * Get the "id" responseTeam.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ResponseTeam> findOne(String id);

    /**
     * Delete the "id" responseTeam.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
