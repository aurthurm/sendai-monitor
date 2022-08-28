package disaster.loss.service;

import java.util.List;

import disaster.loss.domain.Disaster;
import disaster.loss.repository.interfaces.ICountGroupBy;
import disaster.loss.repository.interfaces.IInfrastuctureStatistics;

/**
 * Service Interface for managing {@link Disaster}.
 */
public interface DashboardStatisticsService {
 
    /**
     * Get human population counts grouped by disaster type.
     * @return the grouped counts.
     */

	List<ICountGroupBy> humanPopulationDisasterEffects();
	
	List<IInfrastuctureStatistics> damagedDestroyedInfrastructureValue();
	
	


}
