package disaster.loss.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.HouseholdType;
import disaster.loss.repository.HouseholdTypeRepository;
import disaster.loss.service.HouseholdTypeService;

/**
 * Service Implementation for managing {@link HouseholdType}.
 */
@Service
@Transactional
public class HouseholdTypeServiceImpl implements HouseholdTypeService {

    private final Logger log = LoggerFactory.getLogger(HouseholdTypeServiceImpl.class);

    private final HouseholdTypeRepository householdTypeRepository;

    public HouseholdTypeServiceImpl(HouseholdTypeRepository householdTypeRepository) {
        this.householdTypeRepository = householdTypeRepository;
    }

    @Override
    public HouseholdType save(HouseholdType householdType) {
        log.debug("Request to save HouseholdType : {}", householdType);
        return householdTypeRepository.save(householdType);
    }

    @Override
    public Optional<HouseholdType> partialUpdate(HouseholdType householdType) {
        log.debug("Request to partially update HouseholdType : {}", householdType);

        return householdTypeRepository
            .findById(householdType.getHouseholdTypeId())
            .map(existingInfrastructureType -> {
                if (householdType.getName() != null) {
                    existingInfrastructureType.setName(householdType.getName());
                }

                return existingInfrastructureType;
            })
            .map(householdTypeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<HouseholdType> findAll(Pageable pageable) {
        log.debug("Request to get all InfrastructureTypes");
        return householdTypeRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<HouseholdType> findOne(String id) {
        log.debug("Request to get HouseholdType : {}", id);
        return householdTypeRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete HouseholdType : {}", id);
        householdTypeRepository.deleteById(id);
    }
}
