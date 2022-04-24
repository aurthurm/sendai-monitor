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

import disaster.loss.domain.HumanPopulation;
import disaster.loss.repository.HumanPopulationRepository;
import disaster.loss.service.HumanPopulationService;
import disaster.loss.service.dto.LiveStockMultipleDTO;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing
 * {@link disaster.loss.domain.HumanPopulation}.
 */
@RestController
@RequestMapping("/api")
public class HumanPopulationResource {

	private final Logger log = LoggerFactory.getLogger(HumanPopulationResource.class);

	private static final String ENTITY_NAME = "humanPopulation";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final HumanPopulationService humanPopulationService;

	private final HumanPopulationRepository humanPopulationRepository;

	public HumanPopulationResource(HumanPopulationService humanPopulationService,
			HumanPopulationRepository humanPopulationRepository) {
		this.humanPopulationService = humanPopulationService;
		this.humanPopulationRepository = humanPopulationRepository;
	}

	/**
	 * {@code POST  /humanPopulations} : Create a new humanPopulation.
	 *
	 * @param humanPopulation the humanPopulation to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new humanPopulation, or with status
	 *         {@code 400 (Bad Request)} if the humanPopulation has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/human-populations")
	public ResponseEntity<HumanPopulation> createHumanPopulation(@RequestBody HumanPopulation humanPopulation)
			throws URISyntaxException {
		log.debug("REST request to save HumanPopulation : {}", humanPopulation);
		if (humanPopulation.getHumanPopulationId() != null) {
			throw new BadRequestAlertException("A new humanPopulation cannot already have an ID", ENTITY_NAME,
					"idexists");
		}
		HumanPopulation result = humanPopulationService.save(humanPopulation);
		return ResponseEntity
				.created(new URI("/api/human-populations/" + result.getHumanPopulationId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getHumanPopulationId()))
				.body(result);
	}

	/**
	 * {@code POST  /human-populations/save-multiple-human-population} : Create multiple HumanPopulation.
	 *
	 * @param liveStock the humanPops to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/human-populations/save-multiple-human-population")
	public void createMultpleHumanPopulation(@RequestBody List<HumanPopulation> humanPops) throws URISyntaxException {
		log.debug("REST request to save saveMultiple Human population : {}", humanPops);

		humanPopulationService.saveMultiple(humanPops);
	}

	/**
	 * {@code GET  /humanPopulations} : get all the humanPopulations by disaster ID.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of humanPopulations in body.
	 */
	@GetMapping("/human-populations/disaster-id/{disasterId}")
	public ResponseEntity<List<HumanPopulation>> getAllHumanPopulationsByDisasterId(@PathVariable String disasterId,
			@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
		log.debug("REST request to get a page of HumanPopulations");
		Page<HumanPopulation> page = humanPopulationService.findAllByDisasterId(disasterId, pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * {@code PUT  /humanPopulations/:humanPopulationId} : Updates an existing
	 * humanPopulation.
	 *
	 * @param humanPopulationId the id of the humanPopulation to save.
	 * @param humanPopulation   the humanPopulation to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated humanPopulation, or with status {@code 400 (Bad Request)}
	 *         if the humanPopulation is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the humanPopulation couldn't
	 *         be updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/human-populations/{humanPopulationId}")
	public ResponseEntity<HumanPopulation> updateHumanPopulation(
			@PathVariable(value = "humanPopulationId", required = false) final String humanPopulationId,
			@RequestBody HumanPopulation humanPopulation) throws URISyntaxException {
		log.debug("REST request to update HumanPopulation : {}, {}", humanPopulationId, humanPopulation);
		if (humanPopulation.getHumanPopulationId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(humanPopulationId, humanPopulation.getHumanPopulationId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
		}

		if (!humanPopulationRepository.existsById(humanPopulationId)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
		}

		HumanPopulation result = humanPopulationService.save(humanPopulation);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME,
				humanPopulation.getHumanPopulationId())).body(result);
	}

	/**
	 * {@code PATCH  /humanPopulations/:humanPopulationId} : Partial updates given
	 * fields of an existing humanPopulation, field will ignore if it is null
	 *
	 * @param humanPopulationId the id of the humanPopulation to save.
	 * @param humanPopulation   the humanPopulation to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated humanPopulation, or with status {@code 400 (Bad Request)}
	 *         if the humanPopulation is not valid, or with status
	 *         {@code 404 (Not Found)} if the humanPopulation is not found, or with
	 *         status {@code 500 (Internal Server Error)} if the humanPopulation
	 *         couldn't be updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PatchMapping(value = "/human-populations/{humanPopulationId}", consumes = { "application/json",
			"application/merge-patch+json" })
	public ResponseEntity<HumanPopulation> partialUpdateHumanPopulation(
			@PathVariable(value = "humanPopulationId", required = false) final String humanPopulationId,
			@RequestBody HumanPopulation humanPopulation) throws URISyntaxException {
		log.debug("REST request to partial update HumanPopulation partially : {}, {}", humanPopulationId,
				humanPopulation);
		if (humanPopulation.getHumanPopulationId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(humanPopulationId, humanPopulation.getHumanPopulationId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
		}

		if (!humanPopulationRepository.existsById(humanPopulationId)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
		}

		Optional<HumanPopulation> result = humanPopulationService.partialUpdate(humanPopulation);

		return ResponseUtil.wrapOrNotFound(result, HeaderUtil.createEntityUpdateAlert(applicationName, true,
				ENTITY_NAME, humanPopulation.getHumanPopulationId()));
	}

	/**
	 * {@code GET  /humanPopulations} : get all the humanPopulations.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of humanPopulations in body.
	 */
	@GetMapping("/human-populations")
	public ResponseEntity<List<HumanPopulation>> getAllHumanPopulations(
			@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
		log.debug("REST request to get a page of HumanPopulations");
		Page<HumanPopulation> page = humanPopulationService.findAll(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

    /**
     * {@code GET  /humanPopulations/disaster/:disasterId} : get humanPopulations for disaster.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of humanPopulations in body.
     */
    @GetMapping("/human-populations/disaster/{disasterId}")
    public ResponseEntity<List<HumanPopulation>> getHumanPopulationsForDisaster(
        @PathVariable String disasterId,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of HumanPopulations");
        Page<HumanPopulation> page = humanPopulationService.findAllByDisasterId(disasterId, pageable);
        HttpHeaders headers = PaginationUtil
            .generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

	/**
	 * {@code GET  /humanPopulations/:id} : get the "id" humanPopulation.
	 *
	 * @param id the id of the humanPopulation to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the humanPopulation, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/human-populations/{id}")
	public ResponseEntity<HumanPopulation> getHumanPopulation(@PathVariable String id) {
		log.debug("REST request to get HumanPopulation : {}", id);
		Optional<HumanPopulation> humanPopulation = humanPopulationService.findOne(id);
		return ResponseUtil.wrapOrNotFound(humanPopulation);
	}

	/**
	 * {@code DELETE  /humanPopulations/:id} : delete the "id" humanPopulation.
	 *
	 * @param id the id of the humanPopulation to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/human-populations/{id}")
	public ResponseEntity<Void> deleteHumanPopulation(@PathVariable String id) {
		log.debug("REST request to delete HumanPopulation : {}", id);
		humanPopulationService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
	}
}
