package disaster.loss.service;

import disaster.loss.domain.LiveStock;
import disaster.loss.service.dto.LiveStockMultipleDTO;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link LiveStock}.
 */
public interface LiveStockService {
    /**
     * Save a liveStock.
     *
     * @param liveStock the entity to save.
     * @return the persisted entity.
     */
    LiveStock save(LiveStock liveStock);

    /**
     * Partially updates a liveStock.
     *
     * @param liveStock the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LiveStock> partialUpdate(LiveStock liveStock);

    /**
     * Get all the liveStocks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LiveStock> findAll(Pageable pageable);

    /**
     * Get the "id" liveStock.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LiveStock> findOne(String id);

    /**
     * Delete the "id" liveStock.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

	void multpleLiveStocks(LiveStockMultipleDTO liveStocks);

    Page<LiveStock> findByDisasterId(String disasterId, Pageable pageable);
}
