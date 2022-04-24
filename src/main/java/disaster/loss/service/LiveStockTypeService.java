package disaster.loss.service;

import disaster.loss.domain.LiveStockType;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link LiveStockType}.
 */
public interface LiveStockTypeService {
    /**
     * Save a liveStockType.
     *
     * @param liveStockType the entity to save.
     * @return the persisted entity.
     */
    LiveStockType save(LiveStockType liveStockType);

    /**
     * Partially updates a liveStockType.
     *
     * @param liveStockType the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LiveStockType> partialUpdate(LiveStockType liveStockType);

    /**
     * Get all the liveStockTypes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LiveStockType> findAll(Pageable pageable);

    /**
     * Get the "id" liveStockType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LiveStockType> findOne(String id);

    /**
     * Delete the "id" liveStockType.
     *
     * @param id the id of the entity.
     */
    void delete(String id);
}
