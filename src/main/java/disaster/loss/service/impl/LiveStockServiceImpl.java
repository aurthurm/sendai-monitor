package disaster.loss.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.LiveStock;
import disaster.loss.repository.LiveStockRepository;
import disaster.loss.service.LiveStockService;
import disaster.loss.service.dto.LiveStockDTO;
import disaster.loss.service.dto.LiveStockMultipleDTO;

/**
 * Service Implementation for managing {@link LiveStock}.
 */
@Service
@Transactional
public class LiveStockServiceImpl implements LiveStockService {

	private final Logger log = LoggerFactory.getLogger(LiveStockServiceImpl.class);

	private final LiveStockRepository liveStockRepository;

	public LiveStockServiceImpl(LiveStockRepository liveStockRepository) {
		this.liveStockRepository = liveStockRepository;
	}

	@Override
	public LiveStock save(LiveStock liveStock) {
		log.debug("Request to save LiveStock : {}", liveStock);
		return liveStockRepository.save(liveStock);
	}

	@Override
	public Optional<LiveStock> partialUpdate(LiveStock liveStock) {
		log.debug("Request to partially update LiveStock : {}", liveStock);

		return liveStockRepository.findById(liveStock.getLiveStockId()).map(existingLiveStock -> {
			if (liveStock.getDisasterId() != null) {
				existingLiveStock.setDisasterId(liveStock.getDisasterId());
			}
			if (liveStock.getCasualtyId() != null) {
				existingLiveStock.setCasualtyId(liveStock.getCasualtyId());
			}
			if (liveStock.getLiveStockTypeId() != null) {
				existingLiveStock.setLiveStockTypeId(liveStock.getLiveStockTypeId());
			}
			if (liveStock.getDied() != null) {
				existingLiveStock.setDied(liveStock.getDied());
			}
			if (liveStock.getMissing() != null) {
				existingLiveStock.setMissing(liveStock.getMissing());
			}
			if (liveStock.getIll() != null) {
				existingLiveStock.setIll(liveStock.getIll());
			}

			if (liveStock.getEstimatedLoss() != null) {
				existingLiveStock.setEstimatedLoss(liveStock.getEstimatedLoss());
			}

			return existingLiveStock;
		}).map(liveStockRepository::save);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<LiveStock> findAll(Pageable pageable) {
		log.debug("Request to get all LiveStocks");
		return liveStockRepository.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<LiveStock> findOne(String id) {
		log.debug("Request to get LiveStock : {}", id);
		return liveStockRepository.findById(id);
	}

	@Override
	public void delete(String id) {
		log.debug("Request to delete LiveStock : {}", id);
		liveStockRepository.deleteById(id);
	}

	@Override
	public void multpleLiveStocks(LiveStockMultipleDTO liveStocks) {
		// TODO Auto-generated method stub
		log.debug("Waiting for implementation : {}", liveStocks);
		List<LiveStock> stocks = new ArrayList<>();
		for (LiveStockDTO stockDto : liveStocks.getLiveStockes()) {
			LiveStock stk = new LiveStock();
			stk.setDisasterId(liveStocks.getDisasterId());
			stk.setLiveStockTypeId(stockDto.getLiveStockTypeId());
			stk.setDied(stockDto.getDied());
			stk.setMissing(stockDto.getMissing());
			stk.setIll(stockDto.getIll());
			stk.setEstimatedLoss(stockDto.getEstimatedLoss());
			stocks.add(stk);
		}

		liveStockRepository.saveAll(stocks);
	}

	@Override
	public Page<LiveStock> findByDisasterId(String disasterId, Pageable pageable) {
		return liveStockRepository.findByDisasterId(disasterId, pageable);
	}
}
