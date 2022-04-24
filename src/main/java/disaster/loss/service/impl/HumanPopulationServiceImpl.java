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

import disaster.loss.domain.HumanPopulation;
import disaster.loss.repository.HumanPopulationRepository;
import disaster.loss.service.HumanPopulationService;

/**
 * Service Implementation for managing {@link HumanPopulation}.
 */
@Service
@Transactional
public class HumanPopulationServiceImpl implements HumanPopulationService {

	private final Logger log = LoggerFactory.getLogger(HumanPopulationServiceImpl.class);

	private final HumanPopulationRepository humanPopulationRepository;

	public HumanPopulationServiceImpl(HumanPopulationRepository humanRepository) {
		this.humanPopulationRepository = humanRepository;
	}

	@Override
	public HumanPopulation save(HumanPopulation human) {
		log.debug("Request to save HumanPopulation : {}", human);
		return humanPopulationRepository.save(human);
	}

	@Override
	public Optional<HumanPopulation> partialUpdate(HumanPopulation human) {
		log.debug("Request to partially update HumanPopulation : {}", human);

		return humanPopulationRepository.findById(human.getHumanPopulationId()).map(existingHumanPopulation -> {
			if (human.getDisasterId() != null) {
				existingHumanPopulation.setDisasterId(human.getDisasterId());
			}

			if (human.getValue() != null) {
				existingHumanPopulation.setValue(human.getValue());
			}

			return existingHumanPopulation;
		}).map(humanPopulationRepository::save);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<HumanPopulation> findAll(Pageable pageable) {
		log.debug("Request to get all HumanPopulations");
		return humanPopulationRepository.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<HumanPopulation> findOne(String id) {
		log.debug("Request to get HumanPopulation : {}", id);
		return humanPopulationRepository.findById(id);
	}

	@Override
	public void delete(String id) {
		log.debug("Request to delete HumanPopulation : {}", id);
		humanPopulationRepository.deleteById(id);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<HumanPopulation> findAllByDisasterId(String disasterId, Pageable pageable) {
		log.debug("Request to get all HumanPopulations by disaster ID");
		return humanPopulationRepository.findByDisasterId(disasterId, pageable);
	}

	@Override
	public void saveMultiple(List<HumanPopulation> humans) {
		log.debug("Request to save HumanPopulation : {}", humans);
		List<HumanPopulation> newHumans = new ArrayList<>();

		for (HumanPopulation human : humans) {
			HumanPopulation hm = humanPopulationRepository
					.findByPopulationTypeAndDisasterId(human.getPopulationType().toString(), human.getDisasterId());

			if (hm != null) {
				hm.setValue(human.getValue());
			} else {
				newHumans.add(human);
			}
		}
		humanPopulationRepository.saveAll(newHumans);
	}

	@Override
	public void initSaveAll(List<HumanPopulation> pops) {
		humanPopulationRepository.saveAll(pops);

	}

}
