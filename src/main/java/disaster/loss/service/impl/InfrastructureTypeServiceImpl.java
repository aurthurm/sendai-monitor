package disaster.loss.service.impl;

import disaster.loss.domain.InfrastructureType;
import disaster.loss.repository.InfrastructureTypeRepository;
import disaster.loss.service.InfrastructureTypeService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link InfrastructureType}.
 */
@Service
@Transactional
public class InfrastructureTypeServiceImpl implements InfrastructureTypeService {

    private final Logger log = LoggerFactory.getLogger(InfrastructureTypeServiceImpl.class);

    private final InfrastructureTypeRepository infrastructureTypeRepository;

    public InfrastructureTypeServiceImpl(InfrastructureTypeRepository infrastructureTypeRepository) {
        this.infrastructureTypeRepository = infrastructureTypeRepository;
    }

    @Override
    public InfrastructureType save(InfrastructureType infrastructureType) {
        log.debug("Request to save InfrastructureType : {}", infrastructureType);
        return infrastructureTypeRepository.save(infrastructureType);
    }

    @Override
    public Optional<InfrastructureType> partialUpdate(InfrastructureType infrastructureType) {
        log.debug("Request to partially update InfrastructureType : {}", infrastructureType);

        return infrastructureTypeRepository
            .findById(infrastructureType.getInfractructureTypeId())
            .map(existingInfrastructureType -> {
                if (infrastructureType.getName() != null) {
                    existingInfrastructureType.setName(infrastructureType.getName());
                }

                return existingInfrastructureType;
            })
            .map(infrastructureTypeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<InfrastructureType> findAll(Pageable pageable) {
        log.debug("Request to get all InfrastructureTypes");
        return infrastructureTypeRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InfrastructureType> findOne(String id) {
        log.debug("Request to get InfrastructureType : {}", id);
        return infrastructureTypeRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete InfrastructureType : {}", id);
        infrastructureTypeRepository.deleteById(id);
    }
}
