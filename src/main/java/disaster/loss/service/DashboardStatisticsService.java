package disaster.loss.service;

import disaster.loss.domain.Disaster;

import java.util.List;
import java.util.Optional;

import disaster.loss.repository.interfaces.ICountGroupBy;
import disaster.loss.service.dto.DisasterSimpleCountDTO;
import disaster.loss.service.dto.IDisasterApprovalDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Disaster}.
 */
public interface DashboardStatisticsService {
 
    /**
     * Get human population counts grouped by disaster type.
     * @return the grouped counts.
     */

	List<ICountGroupBy> humanPopulationDisasterEffects();


}
