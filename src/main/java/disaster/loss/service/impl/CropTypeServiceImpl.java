package disaster.loss.service.impl;

import disaster.loss.domain.CropType;
import disaster.loss.repository.CropTypeRepository;
import disaster.loss.service.CropTypeService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link CropType}.
 */
@Service
@Transactional
public class CropTypeServiceImpl implements CropTypeService {

    private final Logger log = LoggerFactory.getLogger(CropTypeServiceImpl.class);

    private final CropTypeRepository cropTypeRepository;

    public CropTypeServiceImpl(CropTypeRepository cropTypeRepository) {
        this.cropTypeRepository = cropTypeRepository;
    }

    @Override
    public CropType save(CropType cropType) {
        log.debug("Request to save CropType : {}", cropType);
        return cropTypeRepository.save(cropType);
    }

    @Override
    public Optional<CropType> partialUpdate(CropType cropType) {
        log.debug("Request to partially update CropType : {}", cropType);

        return cropTypeRepository
            .findById(cropType.getCropTypeId())
            .map(existingCropType -> {
                if (cropType.getName() != null) {
                    existingCropType.setName(cropType.getName());
                }

                return existingCropType;
            })
            .map(cropTypeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CropType> findAll(Pageable pageable) {
        log.debug("Request to get all CropTypes");
        return cropTypeRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CropType> findOne(String id) {
        log.debug("Request to get CropType : {}", id);
        return cropTypeRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete CropType : {}", id);
        cropTypeRepository.deleteById(id);
    }
}
