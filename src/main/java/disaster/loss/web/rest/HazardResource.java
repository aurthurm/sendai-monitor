package disaster.loss.web.rest;

import disaster.loss.domain.Hazard;
import disaster.loss.repository.HazardRepository;
import disaster.loss.service.HazardService;
import disaster.loss.web.rest.errors.BadRequestAlertException;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.Hazard}.
 */
@RestController
@RequestMapping("/api")
public class HazardResource {

    private final Logger log = LoggerFactory.getLogger(HazardResource.class);

    private static final String ENTITY_NAME = "hazard";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HazardService hazardService;

    private final HazardRepository hazardRepository;

    public HazardResource(HazardService hazardService, HazardRepository hazardRepository) {
        this.hazardService = hazardService;
        this.hazardRepository = hazardRepository;
    }

    /**
     * {@code POST  /hazards} : Create a new hazard.
     *
     * @param hazard the hazard to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new hazard, or with status {@code 400 (Bad Request)} if the hazard has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/hazards")
    public ResponseEntity<Hazard> createHazard(@RequestBody Hazard hazard) throws URISyntaxException {
        log.debug("REST request to save Hazard : {}", hazard);
        if (hazard.getHazardId() != null) {
            throw new BadRequestAlertException("A new hazard cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Hazard result = hazardService.save(hazard);
        return ResponseEntity
            .created(new URI("/api/hazards/" + result.getHazardId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getHazardId()))
            .body(result);
    }

    /**
     * {@code PUT  /hazards/:hazardId} : Updates an existing hazard.
     *
     * @param hazardId the id of the hazard to save.
     * @param hazard the hazard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hazard,
     * or with status {@code 400 (Bad Request)} if the hazard is not valid,
     * or with status {@code 500 (Internal Server Error)} if the hazard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/hazards/{hazardId}")
    public ResponseEntity<Hazard> updateHazard(
        @PathVariable(value = "hazardId", required = false) final String hazardId,
        @RequestBody Hazard hazard
    ) throws URISyntaxException {
        log.debug("REST request to update Hazard : {}, {}", hazardId, hazard);
        if (hazard.getHazardId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(hazardId, hazard.getHazardId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!hazardRepository.existsById(hazardId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Hazard result = hazardService.save(hazard);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hazard.getHazardId()))
            .body(result);
    }

    /**
     * {@code PATCH  /hazards/:hazardId} : Partial updates given fields of an existing hazard, field will ignore if it is null
     *
     * @param hazardId the id of the hazard to save.
     * @param hazard the hazard to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hazard,
     * or with status {@code 400 (Bad Request)} if the hazard is not valid,
     * or with status {@code 404 (Not Found)} if the hazard is not found,
     * or with status {@code 500 (Internal Server Error)} if the hazard couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/hazards/{hazardId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Hazard> partialUpdateHazard(
        @PathVariable(value = "hazardId", required = false) final String hazardId,
        @RequestBody Hazard hazard
    ) throws URISyntaxException {
        log.debug("REST request to partial update Hazard partially : {}, {}", hazardId, hazard);
        if (hazard.getHazardId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(hazardId, hazard.getHazardId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!hazardRepository.existsById(hazardId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Hazard> result = hazardService.partialUpdate(hazard);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hazard.getHazardId())
        );
    }

    /**
     * {@code GET  /hazards} : get all the hazards.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of hazards in body.
     */
    @GetMapping("/hazards")
    public ResponseEntity<List<Hazard>> getAllHazards(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Hazards");
        Page<Hazard> page = hazardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /hazards/:id} : get the "id" hazard.
     *
     * @param id the id of the hazard to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the hazard, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/hazards/{id}")
    public ResponseEntity<Hazard> getHazard(@PathVariable String id) {
        log.debug("REST request to get Hazard : {}", id);
        Optional<Hazard> hazard = hazardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(hazard);
    }

    /**
     * {@code DELETE  /hazards/:id} : delete the "id" hazard.
     *
     * @param id the id of the hazard to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/hazards/{id}")
    public ResponseEntity<Void> deleteHazard(@PathVariable String id) {
        log.debug("REST request to delete Hazard : {}", id);
        hazardService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
