package disaster.loss.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.Household;
import disaster.loss.repository.HouseholdRepository;
import disaster.loss.service.HouseholdService;

/**
 * Service Implementation for managing {@link Household}.
 */
@Service
@Transactional
public class HouseholdServiceImpl implements HouseholdService {

    private final Logger log = LoggerFactory.getLogger(HouseholdServiceImpl.class);

    private final HouseholdRepository householdRepository;

    public HouseholdServiceImpl(HouseholdRepository householdRepository) {
        this.householdRepository = householdRepository;
    }

    @Override
    public Household save(Household household) {
        log.debug("Request to save Household : {}", household);

        Household exist = householdRepository.findByDisasterIdAndHouseholdTypeId(household.getDisasterId(), household.getHouseholdTypeId());
        if(exist!=null) {
        	household.setHouseholdId(exist.getHouseholdId());
        }

        return householdRepository.save(household);
    }

    @Override
    public Optional<Household> partialUpdate(Household household) {
        log.debug("Request to partially update Household : {}", household);

        return householdRepository
            .findById(household.getHouseholdId())
            .map(existingInfrastructure -> {
                if (household.getDisasterId() != null) {
                    existingInfrastructure.setDisasterId(household.getDisasterId());
                }
                if (household.getHouseholdType() != null) {
                    existingInfrastructure.setHouseholdType(household.getHouseholdType());
                }
                if (household.getNumberOfHouseholds() != null) {
                    existingInfrastructure.setNumberOfHouseholds(household.getNumberOfHouseholds());
                }

                if (household.getNumberOfPeopleAffected() != null) {
                    existingInfrastructure.setNumberOfPeopleAffected(household.getNumberOfPeopleAffected());
                }

                if (household.getNumberChildHeaded() != null) {
                    existingInfrastructure.setNumberChildHeaded(household.getNumberChildHeaded());
                }

                if (household.getNumberFemaleHeaded() != null) {
                    existingInfrastructure.setNumberFemaleHeaded(household.getNumberFemaleHeaded());
                }

                return existingInfrastructure;
            })
            .map(householdRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Household> findAll(Pageable pageable) {
        log.debug("Request to get all Infrastructures");
        return householdRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Household> findOne(String id) {
        log.debug("Request to get Household : {}", id);
        return householdRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Household : {}", id);
        householdRepository.deleteById(id);
    }

    @Override
    public Page<Household> findByDisasterId(String disasterId, Pageable pageable) {
        return householdRepository.findByDisasterId(disasterId, pageable);
    }
}
