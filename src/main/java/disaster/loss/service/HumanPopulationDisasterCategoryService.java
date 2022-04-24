package disaster.loss.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import disaster.loss.domain.Crop;
import disaster.loss.domain.HumanPopulationDisasterCategory;

/**
 * Service Interface for managing {@link HumaPopulationDisasterCategory}.
 */
public interface HumanPopulationDisasterCategoryService {
	/**
	 * Save a crop.
	 *
	 * @param crop the entity to save.
	 * @return the persisted entity.
	 */
	HumanPopulationDisasterCategory save(HumanPopulationDisasterCategory crop);

	/**
	 * Partially updates a crop.
	 *
	 * @param crop the entity to update partially.
	 * @return the persisted entity.
	 */
	Optional<HumanPopulationDisasterCategory> partialUpdate(HumanPopulationDisasterCategory crop);

	/**
	 * Get all the crops.
	 *
	 * @param pageable the pagination information.
	 * @return the list of entities.
	 */
	Page<HumanPopulationDisasterCategory> findAll(Pageable pageable);

	/**
	 * Get the "id" crop.
	 *
	 * @param id the id of the entity.
	 * @return the entity.
	 */
	Optional<HumanPopulationDisasterCategory> findOne(String id);

	/**
	 * Delete the "id" crop.
	 *
	 * @param id the id of the entity.
	 */
	void delete(String id);
}
