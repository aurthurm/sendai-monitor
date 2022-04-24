package disaster.loss.service.impl;

import disaster.loss.domain.Hazard;
import disaster.loss.repository.HazardRepository;
import disaster.loss.service.HazardService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Hazard}.
 */
@Service
@Transactional
public class HazardServiceImpl implements HazardService {

    private final Logger log = LoggerFactory.getLogger(HazardServiceImpl.class);

    private final HazardRepository hazardRepository;

    public HazardServiceImpl(HazardRepository hazardRepository) {
        this.hazardRepository = hazardRepository;
    }

    @Override
    public Hazard save(Hazard hazard) {
        log.debug("Request to save Hazard : {}", hazard);
        return hazardRepository.save(hazard);
    }

    @Override
    public Optional<Hazard> partialUpdate(Hazard hazard) {
        log.debug("Request to partially update Hazard : {}", hazard);

        return hazardRepository
            .findById(hazard.getHazardId())
            .map(existingHazard -> {
                if (hazard.getType() != null) {
                    existingHazard.setType(hazard.getType());
                }
                if (hazard.getLocationId() != null) {
                    existingHazard.setLocationId(hazard.getLocationId());
                }
                if (hazard.getMitigation() != null) {
                    existingHazard.setMitigation(hazard.getMitigation());
                }
                if (hazard.getDescription() != null) {
                    existingHazard.setDescription(hazard.getDescription());
                }
                if (hazard.getSeverity() != null) {
                    existingHazard.setSeverity(hazard.getSeverity());
                }

                return existingHazard;
            })
            .map(hazardRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Hazard> findAll(Pageable pageable) {
        log.debug("Request to get all Hazards");
        return hazardRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Hazard> findOne(String id) {
        log.debug("Request to get Hazard : {}", id);
        return hazardRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Hazard : {}", id);
        hazardRepository.deleteById(id);
    }
}
