package disaster.loss.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.Intervention;
import disaster.loss.repository.InterventionRepository;
import disaster.loss.service.InterventionService;

/**
 * Service Implementation for managing {@link Intervention}.
 */
@Service
@Transactional
public class InterventionServiceImpl implements InterventionService {

    private final Logger log = LoggerFactory.getLogger(InterventionServiceImpl.class);

    private final InterventionRepository interventionRepository;

    public InterventionServiceImpl(InterventionRepository interventionRepository) {
        this.interventionRepository = interventionRepository;
    }

    @Override
    public Intervention save(Intervention intervention) {
        log.debug("Request to save Intervention : {}", intervention);
        return interventionRepository.save(intervention);
    }

    @Override
    public Optional<Intervention> partialUpdate(Intervention intervention) {
        log.debug("Request to partially update Intervention : {}", intervention);

        return interventionRepository
            .findById(intervention.getInterventionId())
            .map(existingIntervention -> {
                if (intervention.getName() != null) {
                    existingIntervention.setName(intervention.getName());
                }

                return existingIntervention;
            })
            .map(interventionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Intervention> findAll(Pageable pageable) {
        log.debug("Request to get all CropTypes");
        return interventionRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Intervention> findOne(String id) {
        log.debug("Request to get Intervention : {}", id);
        return interventionRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Intervention : {}", id);
        interventionRepository.deleteById(id);
    }
}
