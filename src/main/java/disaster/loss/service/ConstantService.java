package disaster.loss.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import disaster.loss.domain.Constant;
import disaster.loss.domain.Crop;

/**
 * Service Interface for managing {@link Constant}.
 */
public interface ConstantService {
	/**
	 * Save a crop.
	 *
	 * @param crop the entity to save.
	 * @return the persisted entity.
	 */
	Constant save(Constant crop);

	/**
	 * Partially updates a crop.
	 *
	 * @param crop the entity to update partially.
	 * @return the persisted entity.
	 */
	Optional<Constant> partialUpdate(Constant crop);

	/**
	 * Get all the crops.
	 *
	 * @param pageable the pagination information.
	 * @return the list of entities.
	 */
	Page<Constant> findAll(Pageable pageable);

	/**
	 * Get the "id" crop.
	 *
	 * @param id the id of the entity.
	 * @return the entity.
	 */
	Optional<Constant> findOne(String id);

	/**
	 * Delete the "id" crop.
	 *
	 * @param id the id of the entity.
	 */
	void delete(String id);
}
