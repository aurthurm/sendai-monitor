package disaster.loss.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.Constant;
import disaster.loss.domain.Crop;
import disaster.loss.repository.ConstantRepository;
import disaster.loss.repository.CropRepository;
import disaster.loss.service.ConstantService;

/**
 * Service Implementation for managing {@link Crop}.
 */
@Service
@Transactional
public class ConstantServiceImpl implements ConstantService {

	private final Logger log = LoggerFactory.getLogger(ConstantServiceImpl.class);

	private final ConstantRepository constantRepository;

	public ConstantServiceImpl(ConstantRepository constantRepository) {
		this.constantRepository = constantRepository;
	}

	@Override
	public Constant save(Constant crop) {
		log.debug("Request to save Constant : {}", crop);
		return constantRepository.save(crop);
	}

	@Override
	public Optional<Constant> partialUpdate(Constant crop) {
		log.debug("Request to partially update Crop : {}", crop);

		return constantRepository.findById(crop.getConstantId()).map(existingCrop -> {
			if (crop.getValue() != null) {
				existingCrop.setValue(crop.getValue());
			}
			if (crop.getName() != null) {
				existingCrop.setName(crop.getName());
			}
			if (crop.getEstimated() != null) {
				existingCrop.setEstimated(crop.getEstimated());
			}
			if (crop.getEffectiveDate() != null) {
				existingCrop.setEffectiveDate(crop.getEffectiveDate());
			}
			if (crop.getCloseDate() != null) {
				existingCrop.setCloseDate(crop.getCloseDate());
			}
			if (crop.getDescription() != null) {
				existingCrop.setDescription(crop.getDescription());
			}
			if (crop.getStatus() != null) {
				existingCrop.setStatus(crop.getStatus());
			}

			return existingCrop;
		}).map(constantRepository::save);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Constant> findAll(Pageable pageable) {
		log.debug("Request to get all Crops");
		return constantRepository.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Constant> findOne(String id) {
		log.debug("Request to get Crop : {}", id);
		return constantRepository.findById(id);
	}

	@Override
	public void delete(String id) {
		log.debug("Request to delete Crop : {}", id);
		constantRepository.deleteById(id);
	}

}
