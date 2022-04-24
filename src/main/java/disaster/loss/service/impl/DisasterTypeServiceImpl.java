package disaster.loss.service.impl;

import disaster.loss.domain.DisasterType;
import disaster.loss.repository.DisasterTypeRepository;
import disaster.loss.service.DisasterTypeService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DisasterType}.
 */
@Service
@Transactional
public class DisasterTypeServiceImpl implements DisasterTypeService {

    private final Logger log = LoggerFactory.getLogger(DisasterTypeServiceImpl.class);

    private final DisasterTypeRepository disasterTypeRepository;

    public DisasterTypeServiceImpl(DisasterTypeRepository disasterTypeRepository) {
        this.disasterTypeRepository = disasterTypeRepository;
    }

    @Override
    public DisasterType save(DisasterType disasterType) {
        log.debug("Request to save DisasterType : {}", disasterType);
        return disasterTypeRepository.save(disasterType);
    }

    @Override
    public Optional<DisasterType> partialUpdate(DisasterType disasterType) {
        log.debug("Request to partially update DisasterType : {}", disasterType);

        return disasterTypeRepository
            .findById(disasterType.getDisasterTypeId())
            .map(existingDisasterType -> {
                if (disasterType.getDisasterCategoryId() != null) {
                    existingDisasterType.setDisasterCategoryId(disasterType.getDisasterCategoryId());
                }
                if (disasterType.getName() != null) {
                    existingDisasterType.setName(disasterType.getName());
                }

                return existingDisasterType;
            })
            .map(disasterTypeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DisasterType> findAll(Pageable pageable) {
        log.debug("Request to get all DisasterTypes");
        return disasterTypeRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DisasterType> findOne(String id) {
        log.debug("Request to get DisasterType : {}", id);
        return disasterTypeRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete DisasterType : {}", id);
        disasterTypeRepository.deleteById(id);
    }
}
