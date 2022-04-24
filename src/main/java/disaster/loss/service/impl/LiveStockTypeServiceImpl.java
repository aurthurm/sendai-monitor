package disaster.loss.service.impl;

import disaster.loss.domain.LiveStockType;
import disaster.loss.repository.LiveStockTypeRepository;
import disaster.loss.service.LiveStockTypeService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LiveStockType}.
 */
@Service
@Transactional
public class LiveStockTypeServiceImpl implements LiveStockTypeService {

    private final Logger log = LoggerFactory.getLogger(LiveStockTypeServiceImpl.class);

    private final LiveStockTypeRepository liveStockTypeRepository;

    public LiveStockTypeServiceImpl(LiveStockTypeRepository liveStockTypeRepository) {
        this.liveStockTypeRepository = liveStockTypeRepository;
    }

    @Override
    public LiveStockType save(LiveStockType liveStockType) {
        log.debug("Request to save LiveStockType : {}", liveStockType);
        return liveStockTypeRepository.save(liveStockType);
    }

    @Override
    public Optional<LiveStockType> partialUpdate(LiveStockType liveStockType) {
        log.debug("Request to partially update LiveStockType : {}", liveStockType);

        return liveStockTypeRepository
            .findById(liveStockType.getLiveStockTypeId())
            .map(existingLiveStockType -> {
                if (liveStockType.getName() != null) {
                    existingLiveStockType.setName(liveStockType.getName());
                }

                return existingLiveStockType;
            })
            .map(liveStockTypeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LiveStockType> findAll(Pageable pageable) {
        log.debug("Request to get all LiveStockTypes");
        return liveStockTypeRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LiveStockType> findOne(String id) {
        log.debug("Request to get LiveStockType : {}", id);
        return liveStockTypeRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete LiveStockType : {}", id);
        liveStockTypeRepository.deleteById(id);
    }
}
