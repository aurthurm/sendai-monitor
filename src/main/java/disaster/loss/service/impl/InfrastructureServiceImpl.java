package disaster.loss.service.impl;

import disaster.loss.domain.Infrastructure;
import disaster.loss.repository.InfrastructureRepository;
import disaster.loss.service.InfrastructureService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Infrastructure}.
 */
@Service
@Transactional
public class InfrastructureServiceImpl implements InfrastructureService {

    private final Logger log = LoggerFactory.getLogger(InfrastructureServiceImpl.class);

    private final InfrastructureRepository infrastructureRepository;

    public InfrastructureServiceImpl(InfrastructureRepository infrastructureRepository) {
        this.infrastructureRepository = infrastructureRepository;
    }

    @Override
    public Infrastructure save(Infrastructure infrastructure) {
        log.debug("Request to save Infrastructure : {}", infrastructure);

        Infrastructure exist = infrastructureRepository.findByDisasterIdAndInfractructureTypeId(infrastructure.getDisasterId(), infrastructure.getInfractructureTypeId());
        if(exist!=null) {
        	infrastructure.setInfractructureId(exist.getInfractructureId());
        }

        return infrastructureRepository.save(infrastructure);
    }

    @Override
    public Optional<Infrastructure> partialUpdate(Infrastructure infrastructure) {
        log.debug("Request to partially update Infrastructure : {}", infrastructure);

        return infrastructureRepository
            .findById(infrastructure.getInfractructureId())
            .map(existingInfrastructure -> {
                if (infrastructure.getDisasterId() != null) {
                    existingInfrastructure.setDisasterId(infrastructure.getDisasterId());
                }
                if (infrastructure.getCasualtyId() != null) {
                    existingInfrastructure.setCasualtyId(infrastructure.getCasualtyId());
                }
                if (infrastructure.getInfractructureType() != null) {
                    existingInfrastructure.setInfractructureType(infrastructure.getInfractructureType());
                }
                if (infrastructure.getDamaged() != null) {
                    existingInfrastructure.setDamaged(infrastructure.getDamaged());
                }
                if (infrastructure.getDestroyed() != null) {
                    existingInfrastructure.setDestroyed(infrastructure.getDestroyed());
                }
                if (infrastructure.getValue() != null) {
                    existingInfrastructure.setValue(infrastructure.getValue());
                }

                return existingInfrastructure;
            })
            .map(infrastructureRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Infrastructure> findAll(Pageable pageable) {
        log.debug("Request to get all Infrastructures");
        return infrastructureRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Infrastructure> findOne(String id) {
        log.debug("Request to get Infrastructure : {}", id);
        return infrastructureRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Infrastructure : {}", id);
        infrastructureRepository.deleteById(id);
    }

    @Override
    public Page<Infrastructure> findByDisasterId(String disasterId, Pageable pageable) {
        return infrastructureRepository.findByDisasterId(disasterId, pageable);
    }
}
