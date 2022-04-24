package disaster.loss.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import disaster.loss.domain.LiveStock;
import disaster.loss.repository.LiveStockRepository;
import disaster.loss.service.LiveStockService;
import disaster.loss.service.dto.LiveStockMultipleDTO;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.LiveStock}.
 */
@RestController
@RequestMapping("/api")
public class LiveStockResource {

	private final Logger log = LoggerFactory.getLogger(LiveStockResource.class);

	private static final String ENTITY_NAME = "liveStock";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final LiveStockService liveStockService;

	private final LiveStockRepository liveStockRepository;

	public LiveStockResource(LiveStockService liveStockService, LiveStockRepository liveStockRepository) {
		this.liveStockService = liveStockService;
		this.liveStockRepository = liveStockRepository;
	}

	/**
	 * {@code POST  /live-stocks} : Create a new liveStock.
	 *
	 * @param liveStock the liveStock to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new liveStock, or with status {@code 400 (Bad Request)} if
	 *         the liveStock has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/live-stocks")
	public ResponseEntity<LiveStock> createLiveStock(@RequestBody LiveStock liveStock) throws URISyntaxException {
		log.debug("REST request to save LiveStock : {}", liveStock);
		if (liveStock.getLiveStockId() != null) {
			throw new BadRequestAlertException("A new liveStock cannot already have an ID", ENTITY_NAME, "idexists");
		}
		LiveStock result = liveStockService.save(liveStock);
		return ResponseEntity
				.created(new URI("/api/live-stocks/" + result.getLiveStockId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getLiveStockId()))
				.body(result);
	}

	/**
	 * {@code POST  /live-stocks} : Create multiple liveStock.
	 *
	 * @param liveStock the liveStock to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new liveStock, or with status {@code 400 (Bad Request)} if
	 *         the liveStock has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/live-stocks/save-multiple-live-stocks")
	public void createMultpleLiveStock(@RequestBody LiveStockMultipleDTO liveStocks) throws URISyntaxException {
		log.debug("REST request to save LiveStock : {}", liveStocks);
		if (liveStocks.getLiveStockId() != null) {
			throw new BadRequestAlertException("A new liveStock cannot already have an ID", ENTITY_NAME, "idexists");
		}
		liveStockService.multpleLiveStocks(liveStocks);

	}

	/**
	 * {@code PUT  /live-stocks/:liveStockId} : Updates an existing liveStock.
	 *
	 * @param liveStockId the id of the liveStock to save.
	 * @param liveStock   the liveStock to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated liveStock, or with status {@code 400 (Bad Request)} if
	 *         the liveStock is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the liveStock couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/live-stocks/{liveStockId}")
	public ResponseEntity<LiveStock> updateLiveStock(
			@PathVariable(value = "liveStockId", required = false) final String liveStockId,
			@RequestBody LiveStock liveStock) throws URISyntaxException {
		log.debug("REST request to update LiveStock : {}, {}", liveStockId, liveStock);
		if (liveStock.getLiveStockId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(liveStockId, liveStock.getLiveStockId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
		}

		if (!liveStockRepository.existsById(liveStockId)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
		}

		LiveStock result = liveStockService.save(liveStock);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, liveStock.getLiveStockId()))
				.body(result);
	}

	/**
	 * {@code PATCH  /live-stocks/:liveStockId} : Partial updates given fields of an
	 * existing liveStock, field will ignore if it is null
	 *
	 * @param liveStockId the id of the liveStock to save.
	 * @param liveStock   the liveStock to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated liveStock, or with status {@code 400 (Bad Request)} if
	 *         the liveStock is not valid, or with status {@code 404 (Not Found)} if
	 *         the liveStock is not found, or with status
	 *         {@code 500 (Internal Server Error)} if the liveStock couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PatchMapping(value = "/live-stocks/{liveStockId}", consumes = { "application/json",
			"application/merge-patch+json" })
	public ResponseEntity<LiveStock> partialUpdateLiveStock(
			@PathVariable(value = "liveStockId", required = false) final String liveStockId,
			@RequestBody LiveStock liveStock) throws URISyntaxException {
		log.debug("REST request to partial update LiveStock partially : {}, {}", liveStockId, liveStock);
		if (liveStock.getLiveStockId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(liveStockId, liveStock.getLiveStockId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
		}

		if (!liveStockRepository.existsById(liveStockId)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
		}

		Optional<LiveStock> result = liveStockService.partialUpdate(liveStock);

		return ResponseUtil.wrapOrNotFound(result,
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, liveStock.getLiveStockId()));
	}

	/**
	 * {@code GET  /live-stocks} : get all the liveStocks.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of liveStocks in body.
	 */
	@GetMapping("/live-stocks")
	public ResponseEntity<List<LiveStock>> getAllLiveStocks(
			@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
		log.debug("REST request to get a page of LiveStocks");
		Page<LiveStock> page = liveStockService.findAll(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

    /**
     * {@code GET  /live-stocks/disaster/:disasterId} : get liveStocks for disaster.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of liveStocks in body.
     */
    @GetMapping("/live-stocks/disaster/{disasterId}")
    public ResponseEntity<List<LiveStock>> getLiveStocksForDisaster(@PathVariable String disasterId,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of LiveStocks");
        Page<LiveStock> page = liveStockService.findByDisasterId(disasterId, pageable);
        HttpHeaders headers = PaginationUtil
            .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

	/**
	 * {@code GET  /live-stocks/:id} : get the "id" liveStock.
	 *
	 * @param id the id of the liveStock to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the liveStock, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/live-stocks/{id}")
	public ResponseEntity<LiveStock> getLiveStock(@PathVariable String id) {
		log.debug("REST request to get LiveStock : {}", id);
		Optional<LiveStock> liveStock = liveStockService.findOne(id);
		return ResponseUtil.wrapOrNotFound(liveStock);
	}

	/**
	 * {@code DELETE  /live-stocks/:id} : delete the "id" liveStock.
	 *
	 * @param id the id of the liveStock to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/live-stocks/{id}")
	public ResponseEntity<Void> deleteLiveStock(@PathVariable String id) {
		log.debug("REST request to delete LiveStock : {}", id);
		liveStockService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
	}
}
