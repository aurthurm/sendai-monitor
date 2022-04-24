package disaster.loss.service.impl;

import disaster.loss.domain.PartnerIntervention;
import disaster.loss.repository.PartnerInterventionRepository;
import disaster.loss.service.PartnerInterventionService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link PartnerIntervention}.
 */
@Service
@Transactional
public class PartnerInterventionServiceImpl implements PartnerInterventionService {

    private final Logger log = LoggerFactory.getLogger(PartnerInterventionServiceImpl.class);

    private final PartnerInterventionRepository partnerInterventionRepository;

    public PartnerInterventionServiceImpl(PartnerInterventionRepository partnerInterventionRepository) {
        this.partnerInterventionRepository = partnerInterventionRepository;
    }

    @Override
    public PartnerIntervention save(PartnerIntervention partnerIntervention) {
        log.debug("Request to save PartnerIntervention : {}", partnerIntervention);
        return partnerInterventionRepository.save(partnerIntervention);
    }

    @Override
    public Optional<PartnerIntervention> partialUpdate(PartnerIntervention partnerIntervention) {
        log.debug("Request to partially update PartnerIntervention : {}", partnerIntervention);

        return partnerInterventionRepository
            .findById(partnerIntervention.getInteventionId())
            .map(existingPartnerIntervention -> {
                if (partnerIntervention.getPartnerId() != null) {
                    existingPartnerIntervention.setPartnerId(partnerIntervention.getPartnerId());
                }
                if (partnerIntervention.getDisasterId() != null) {
                    existingPartnerIntervention.setDisasterId(partnerIntervention.getDisasterId());
                }
                if (partnerIntervention.getProjectId() != null) {
                    existingPartnerIntervention.setProjectId(partnerIntervention.getProjectId());
                }
                if (partnerIntervention.getHazardId() != null) {
                    existingPartnerIntervention.setHazardId(partnerIntervention.getHazardId());
                }
                if (partnerIntervention.getAmountReceived() != null) {
                    existingPartnerIntervention.setAmountReceived(partnerIntervention.getAmountReceived());
                }
                if (partnerIntervention.getAssistanceOffered() != null) {
                    existingPartnerIntervention.setAssistanceOffered(partnerIntervention.getAssistanceOffered());
                }

                return existingPartnerIntervention;
            })
            .map(partnerInterventionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PartnerIntervention> findAll(Pageable pageable) {
        log.debug("Request to get all PartnerInterventions");
        return partnerInterventionRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PartnerIntervention> findOne(String id) {
        log.debug("Request to get PartnerIntervention : {}", id);
        return partnerInterventionRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete PartnerIntervention : {}", id);
        partnerInterventionRepository.deleteById(id);
    }
}
