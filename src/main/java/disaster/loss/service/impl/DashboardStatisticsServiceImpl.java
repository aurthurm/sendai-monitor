package disaster.loss.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.Disaster;
import disaster.loss.repository.HumanPopulationRepository;
import disaster.loss.repository.interfaces.ICountGroupBy;
import disaster.loss.service.DashboardStatisticsService;

/**
 * Service Implementation for managing {@link Disaster}.
 */
@Service
@Transactional
public class DashboardStatisticsServiceImpl implements DashboardStatisticsService {

	private final Logger log = LoggerFactory.getLogger(DashboardStatisticsServiceImpl.class);

	private static class DashboardStatisticsServiceImplResourceException extends RuntimeException {

		private DashboardStatisticsServiceImplResourceException(String message) {
			super(message);
		}
	}

	@Autowired
	HumanPopulationRepository humanPopulationRepository;

	@Override
	public List<ICountGroupBy> humanPopulationDisasterEffects() {
		return humanPopulationRepository.humanPopulationDisasterEffects();
	}

}
