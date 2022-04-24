package disaster.loss.service;

import disaster.loss.domain.Disaster;

import java.util.List;
import java.util.Optional;

import disaster.loss.repository.interfaces.ICountGroupBy;
import disaster.loss.service.dto.DisasterSimpleCountDTO;
import disaster.loss.service.dto.IDisasterApprovalDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Disaster}.
 */
public interface DisasterService {
    /**
     * Save a disaster.
     *
     * @param disaster the entity to save.
     * @return the persisted entity.
     */
    Disaster save(Disaster disaster);

    /**
     * Partially updates a disaster.
     *
     * @param disaster the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Disaster> partialUpdate(Disaster disaster);

    /**
     * Get all the disasters.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Disaster> findAll(String filterBy, Pageable pageable);

    /**
     * Get the "id" disaster.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Disaster> findOne(String id);

    /**
     * Get disasters by search.
     *
     * @param searchText the id of the entity.
     * @return the entity.
     */
    Page<Disaster> search(String searchText, Pageable pageable);

    /**
     * Get disasters counts grouped by disaster category.
     * @return the grouped counts.
     */
    List<ICountGroupBy> groupByDisasterCategory();

    /**
     * Get disasters counts grouped by disaster type.
     * @return the grouped counts.
     */
    DisasterSimpleCountDTO simpleCounts();

    /**
     * Get disasters counts grouped by disaster type.
     * @return the grouped counts.
     */
    List<ICountGroupBy> groupByDisasterType();

    /**
     * Delete the "id" disaster.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

    /**
     * handle approvals pipelines for a disaster.
     *
     * @param approval the DTO of the entity.
     */
    Disaster approval(IDisasterApprovalDTO approval);
}
