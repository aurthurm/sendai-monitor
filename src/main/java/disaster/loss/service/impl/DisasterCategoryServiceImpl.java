package disaster.loss.service.impl;

import disaster.loss.domain.DisasterCategory;
import disaster.loss.repository.DisasterCategoryRepository;
import disaster.loss.service.DisasterCategoryService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DisasterCategory}.
 */
@Service
@Transactional
public class DisasterCategoryServiceImpl implements DisasterCategoryService {

    private final Logger log = LoggerFactory.getLogger(DisasterCategoryServiceImpl.class);

    private final DisasterCategoryRepository disasterCategoryRepository;

    public DisasterCategoryServiceImpl(DisasterCategoryRepository disasterCategoryRepository) {
        this.disasterCategoryRepository = disasterCategoryRepository;
    }

    @Override
    public DisasterCategory save(DisasterCategory disasterCategory) {
        log.debug("Request to save DisasterCategory : {}", disasterCategory);
        return disasterCategoryRepository.save(disasterCategory);
    }

    @Override
    public Optional<DisasterCategory> partialUpdate(DisasterCategory disasterCategory) {
        log.debug("Request to partially update DisasterCategory : {}", disasterCategory);

        return disasterCategoryRepository
            .findById(disasterCategory.getDisasterCategoryId())
            .map(existingDisasterCategory -> {
                if (disasterCategory.getName() != null) {
                    existingDisasterCategory.setName(disasterCategory.getName());
                }

                return existingDisasterCategory;
            })
            .map(disasterCategoryRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DisasterCategory> findAll(@org.springdoc.api.annotations.ParameterObject @PageableDefault(size = 70) Pageable pageable) {
        log.debug("Request to get all DisasterCategories");
        return disasterCategoryRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DisasterCategory> findOne(String id) {
        log.debug("Request to get DisasterCategory : {}", id);
        return disasterCategoryRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete DisasterCategory : {}", id);
        disasterCategoryRepository.deleteById(id);
    }
}
