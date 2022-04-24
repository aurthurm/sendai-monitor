package disaster.loss.web.rest;

import disaster.loss.domain.Intervention;
import disaster.loss.repository.InterventionRepository;
import disaster.loss.service.InterventionService;
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
 * REST controller for managing {@link disaster.loss.domain.Intervention}.
 */
@RestController
@RequestMapping("/api")
public class InterventionResource {

    private final Logger log = LoggerFactory.getLogger(InterventionResource.class);

    private static final String ENTITY_NAME = "Intervention";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InterventionService InterventionService;

    private final InterventionRepository InterventionRepository;

    public InterventionResource(InterventionService InterventionService, InterventionRepository InterventionRepository) {
        this.InterventionService = InterventionService;
        this.InterventionRepository = InterventionRepository;
    }

    /**
     * {@code POST  /interventions} : Create a new Intervention.
     *
     * @param Intervention the Intervention to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new Intervention, or with status {@code 400 (Bad Request)} if the Intervention has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/interventions")
    public ResponseEntity<Intervention> createIntervention(@RequestBody Intervention Intervention) throws URISyntaxException {
        log.debug("REST request to save Intervention : {}", Intervention);
        if (Intervention.getInterventionId() != null) {
            throw new BadRequestAlertException("A new Intervention cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Intervention result = InterventionService.save(Intervention);
        return ResponseEntity
            .created(new URI("/api/interventions/" + result.getInterventionId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getInterventionId()))
            .body(result);
    }

    /**
     * {@code PUT  /interventions/:InterventionId} : Updates an existing Intervention.
     *
     * @param InterventionId the id of the Intervention to save.
     * @param Intervention the Intervention to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated Intervention,
     * or with status {@code 400 (Bad Request)} if the Intervention is not valid,
     * or with status {@code 500 (Internal Server Error)} if the Intervention couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/interventions/{InterventionId}")
    public ResponseEntity<Intervention> updateIntervention(
        @PathVariable(value = "InterventionId", required = false) final String InterventionId,
        @RequestBody Intervention Intervention
    ) throws URISyntaxException {
        log.debug("REST request to update Intervention : {}, {}", InterventionId, Intervention);
        if (Intervention.getInterventionId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(InterventionId, Intervention.getInterventionId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!InterventionRepository.existsById(InterventionId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Intervention result = InterventionService.save(Intervention);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, Intervention.getInterventionId()))
            .body(result);
    }

    /**
     * {@code PATCH  /interventions/:InterventionId} : Partial updates given fields of an existing Intervention, field will ignore if it is null
     *
     * @param InterventionId the id of the Intervention to save.
     * @param Intervention the Intervention to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated Intervention,
     * or with status {@code 400 (Bad Request)} if the Intervention is not valid,
     * or with status {@code 404 (Not Found)} if the Intervention is not found,
     * or with status {@code 500 (Internal Server Error)} if the Intervention couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/interventions/{InterventionId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Intervention> partialUpdateIntervention(
        @PathVariable(value = "InterventionId", required = false) final String InterventionId,
        @RequestBody Intervention Intervention
    ) throws URISyntaxException {
        log.debug("REST request to partial update Intervention partially : {}, {}", InterventionId, Intervention);
        if (Intervention.getInterventionId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(InterventionId, Intervention.getInterventionId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!InterventionRepository.existsById(InterventionId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Intervention> result = InterventionService.partialUpdate(Intervention);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, Intervention.getInterventionId())
        );
    }

    /**
     * {@code GET  /interventions} : get all the Interventions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Interventions in body.
     */
    @GetMapping("/interventions")
    public ResponseEntity<List<Intervention>> getAllInterventions(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Interventions");
        Page<Intervention> page = InterventionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /interventions/:id} : get the "id" Intervention.
     *
     * @param id the id of the Intervention to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the Intervention, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/interventions/{id}")
    public ResponseEntity<Intervention> getIntervention(@PathVariable String id) {
        log.debug("REST request to get Intervention : {}", id);
        Optional<Intervention> Intervention = InterventionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Intervention);
    }

    /**
     * {@code DELETE  /interventions/:id} : delete the "id" Intervention.
     *
     * @param id the id of the Intervention to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/interventions/{id}")
    public ResponseEntity<Void> deleteIntervention(@PathVariable String id) {
        log.debug("REST request to delete Intervention : {}", id);
        InterventionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
