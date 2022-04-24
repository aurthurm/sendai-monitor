package disaster.loss.service.impl;

import disaster.loss.domain.Ward;
import disaster.loss.repository.WardRepository;
import disaster.loss.service.WardService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Ward}.
 */
@Service
@Transactional
public class WardServiceImpl implements WardService {

    private final Logger log = LoggerFactory.getLogger(WardServiceImpl.class);

    private final WardRepository wardRepository;

    public WardServiceImpl(WardRepository wardRepository) {
        this.wardRepository = wardRepository;
    }

    @Override
    public Ward save(Ward ward) {
        log.debug("Request to save Ward : {}", ward);
        return wardRepository.save(ward);
    }

    @Override
    public Optional<Ward> partialUpdate(Ward ward) {
        log.debug("Request to partially update Ward : {}", ward);

        return wardRepository
            .findById(ward.getWardId())
            .map(existingWard -> {
                if (ward.getDistrictId() != null) {
                    existingWard.setDistrictId(ward.getDistrictId());
                }
                if (ward.getName() != null) {
                    existingWard.setName(ward.getName());
                }
                if (ward.getLatitude() != null) {
                    existingWard.setLatitude(ward.getLatitude());
                }
                if (ward.getLongitude() != null) {
                    existingWard.setLongitude(ward.getLongitude());
                }
                if (ward.getLevel() != null) {
                    existingWard.setLevel(ward.getLevel());
                }

                return existingWard;
            })
            .map(wardRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Ward> findAll(Pageable pageable) {
        log.debug("Request to get all Wards");
        return wardRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Ward> findOne(String id) {
        log.debug("Request to get Ward : {}", id);
        return wardRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Ward : {}", id);
        wardRepository.deleteById(id);
    }
}
