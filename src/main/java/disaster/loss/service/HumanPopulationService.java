package disaster.loss.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import disaster.loss.domain.Crop;
import disaster.loss.domain.HumanPopulation;

/**
 * Service Interface for managing {@link Crop}.
 */
public interface HumanPopulationService {
    /**
     * Save a crop.
     *
     * @param crop the entity to save.
     * @return the persisted entity.
     */
	HumanPopulation save(HumanPopulation crop);

    /**
     * Partially updates a crop.
     *
     * @param crop the entity to update partially.
     * @return the persisted entity.
     */
    Optional<HumanPopulation> partialUpdate(HumanPopulation crop);

    /**
     * Get all the crops.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<HumanPopulation> findAll(Pageable pageable);

    /**
     * Get the "id" crop.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<HumanPopulation> findOne(String id);

    /**
     * Delete the "id" crop.
     *
     * @param id the id of the entity.
     */
    void delete(String id);

	Page<HumanPopulation> findAllByDisasterId(String disasterId, Pageable pageable);

	void saveMultiple(List<HumanPopulation> humans);

	void initSaveAll(List<HumanPopulation> pops);
}
