package disaster.loss.service.impl;

import disaster.loss.domain.Village;
import disaster.loss.repository.VillageRepository;
import disaster.loss.service.VillageService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Village}.
 */
@Service
@Transactional
public class VillageServiceImpl implements VillageService {

    private final Logger log = LoggerFactory.getLogger(VillageServiceImpl.class);

    private final VillageRepository villageRepository;

    public VillageServiceImpl(VillageRepository villageRepository) {
        this.villageRepository = villageRepository;
    }

    @Override
    public Village save(Village village) {
        log.debug("Request to save Village : {}", village);
        return villageRepository.save(village);
    }

    @Override
    public Optional<Village> partialUpdate(Village village) {
        log.debug("Request to partially update Village : {}", village);

        return villageRepository
            .findById(village.getVillageId())
            .map(existingVillage -> {
                if (village.getWardId() != null) {
                    existingVillage.setWardId(village.getWardId());
                }
                if (village.getName() != null) {
                    existingVillage.setName(village.getName());
                }
                if (village.getLatitude() != null) {
                    existingVillage.setLatitude(village.getLatitude());
                }
                if (village.getLongitude() != null) {
                    existingVillage.setLongitude(village.getLongitude());
                }
                if (village.getLevel() != null) {
                    existingVillage.setLevel(village.getLevel());
                }

                return existingVillage;
            })
            .map(villageRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Village> findAll(Pageable pageable) {
        log.debug("Request to get all Villages");
        return villageRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Village> findOne(String id) {
        log.debug("Request to get Village : {}", id);
        return villageRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Village : {}", id);
        villageRepository.deleteById(id);
    }
}
