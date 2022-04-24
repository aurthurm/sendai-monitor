package disaster.loss.service.impl;

import disaster.loss.domain.DevelopmentPartner;
import disaster.loss.repository.DevelopmentPartnerRepository;
import disaster.loss.service.DevelopmentPartnerService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DevelopmentPartner}.
 */
@Service
@Transactional
public class DevelopmentPartnerServiceImpl implements DevelopmentPartnerService {

    private final Logger log = LoggerFactory.getLogger(DevelopmentPartnerServiceImpl.class);

    private final DevelopmentPartnerRepository developmentPartnerRepository;

    public DevelopmentPartnerServiceImpl(DevelopmentPartnerRepository developmentPartnerRepository) {
        this.developmentPartnerRepository = developmentPartnerRepository;
    }

    @Override
    public DevelopmentPartner save(DevelopmentPartner developmentPartner) {
        log.debug("Request to save DevelopmentPartner : {}", developmentPartner);
        return developmentPartnerRepository.save(developmentPartner);
    }

    @Override
    public Optional<DevelopmentPartner> partialUpdate(DevelopmentPartner developmentPartner) {
        log.debug("Request to partially update DevelopmentPartner : {}", developmentPartner);

        return developmentPartnerRepository
            .findById(developmentPartner.getPartnerId())
            .map(existingDevelopmentPartner -> {
                if (developmentPartner.getName() != null) {
                    existingDevelopmentPartner.setName(developmentPartner.getName());
                }
                if (developmentPartner.getDescription() != null) {
                    existingDevelopmentPartner.setDescription(developmentPartner.getDescription());
                }

                return existingDevelopmentPartner;
            })
            .map(developmentPartnerRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DevelopmentPartner> findAll(Pageable pageable) {
        log.debug("Request to get all DevelopmentPartners");
        return developmentPartnerRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DevelopmentPartner> findOne(String id) {
        log.debug("Request to get DevelopmentPartner : {}", id);
        return developmentPartnerRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete DevelopmentPartner : {}", id);
        developmentPartnerRepository.deleteById(id);
    }
}
