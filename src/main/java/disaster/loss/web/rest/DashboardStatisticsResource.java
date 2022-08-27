package disaster.loss.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import disaster.loss.repository.interfaces.ICountGroupBy;
import disaster.loss.service.DashboardStatisticsService;

/**
 * REST controller for managing {@link disaster.loss.domain.Disaster}.
 */
@RestController
@RequestMapping("/api")
public class DashboardStatisticsResource {

	private final Logger log = LoggerFactory.getLogger(DashboardStatisticsResource.class);

	private static final String ENTITY_NAME = "DashboardStatistics";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final DashboardStatisticsService dashboardService;

	public DashboardStatisticsResource(DashboardStatisticsService dashboardService) {
		this.dashboardService = dashboardService;

	}

	/**
	 * {@code GET  /dashboard/statistics/simple-counts} : simple disaster counts.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)}
	 */
	@GetMapping("/dashboard/statistics/human-population-disaster-effects")
	public ResponseEntity<List<ICountGroupBy>> humanPopulationDisasterEffects() {
		log.debug("get human-population-disaster-effects");
		List<ICountGroupBy> counts = dashboardService.humanPopulationDisasterEffects();
		return ResponseEntity.ok().body(counts);
	}

}
