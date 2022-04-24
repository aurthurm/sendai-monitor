package disaster.loss.service.impl;

import disaster.loss.domain.Crop;
import disaster.loss.repository.CropRepository;
import disaster.loss.service.CropService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Crop}.
 */
@Service
@Transactional
public class CropServiceImpl implements CropService {

    private final Logger log = LoggerFactory.getLogger(CropServiceImpl.class);

    private final CropRepository cropRepository;

    public CropServiceImpl(CropRepository cropRepository) {
        this.cropRepository = cropRepository;
    }

    @Override
    public Crop save(Crop crop) {
        log.debug("Request to save Crop : {}", crop);
        return cropRepository.save(crop);
    }

    @Override
    public Optional<Crop> partialUpdate(Crop crop) {
        log.debug("Request to partially update Crop : {}", crop);

        return cropRepository
            .findById(crop.getCropId())
            .map(existingCrop -> {
                if (crop.getDisasterId() != null) {
                    existingCrop.setDisasterId(crop.getDisasterId());
                }
                if (crop.getCasualtyId() != null) {
                    existingCrop.setCasualtyId(crop.getCasualtyId());
                }
                if (crop.getCropTypeId() != null) {
                    existingCrop.setCropTypeId(crop.getCropTypeId());
                }
                if (crop.getHecterageAffected() != null) {
                    existingCrop.setHecterageAffected(crop.getHecterageAffected());
                }
                if (crop.getEstimatedLoss() != null) {
                    existingCrop.setEstimatedLoss(crop.getEstimatedLoss());
                }

                return existingCrop;
            })
            .map(cropRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Crop> findAll(Pageable pageable) {
        log.debug("Request to get all Crops");
        return cropRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Crop> findOne(String id) {
        log.debug("Request to get Crop : {}", id);
        return cropRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Crop : {}", id);
        cropRepository.deleteById(id);
    }

    @Override
    public Page<Crop> findByDisasterId(String disasterId, Pageable pageable) {
        return cropRepository.findByDisasterId(disasterId, pageable);
    }
}
