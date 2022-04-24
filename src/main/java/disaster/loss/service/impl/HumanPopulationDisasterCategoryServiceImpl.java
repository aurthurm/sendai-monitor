package disaster.loss.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.CropType;
import disaster.loss.domain.HumanPopulationDisasterCategory;
import disaster.loss.repository.HumanPopulationDisasterCategoryRepository;
import disaster.loss.service.HumanPopulationDisasterCategoryService;

/**
 * Service Implementation for managing {@link CropType}.
 */
@Service
@Transactional
public class HumanPopulationDisasterCategoryServiceImpl implements HumanPopulationDisasterCategoryService {

    private final Logger log = LoggerFactory.getLogger(HumanPopulationDisasterCategoryServiceImpl.class);

    private final HumanPopulationDisasterCategoryRepository humanPopulationDisasterCategoryRepository;

    public HumanPopulationDisasterCategoryServiceImpl(HumanPopulationDisasterCategoryRepository humanPopulationDisasterCategoryRepository) {
        this.humanPopulationDisasterCategoryRepository = humanPopulationDisasterCategoryRepository;
    }

    @Override
    public HumanPopulationDisasterCategory save(HumanPopulationDisasterCategory humanPopulation) {
        log.debug("Request to save CropType : {}", humanPopulation);
        return humanPopulationDisasterCategoryRepository.save(humanPopulation);
    }

    @Override
    public Optional<HumanPopulationDisasterCategory> partialUpdate(HumanPopulationDisasterCategory humanPopulation) {
        log.debug("Request to partially update CropType : {}", humanPopulation);

        return humanPopulationDisasterCategoryRepository
            .findById(humanPopulation.getHumanPopulationDisasterCategoryId())
            .map(existingCropType -> {
                if (humanPopulation.getName() != null) {
                    existingCropType.setName(humanPopulation.getName());
                }

                return existingCropType;
            })
            .map(humanPopulationDisasterCategoryRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HumanPopulationDisasterCategory> findAll(Pageable pageable) {
        log.debug("Request to get all CropTypes");
        return humanPopulationDisasterCategoryRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<HumanPopulationDisasterCategory> findOne(String id) {
        log.debug("Request to get CropType : {}", id);
        return humanPopulationDisasterCategoryRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete CropType : {}", id);
        humanPopulationDisasterCategoryRepository.deleteById(id);
    }
}
