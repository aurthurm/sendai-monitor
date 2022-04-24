package disaster.loss.web.rest;

import disaster.loss.domain.PartnerIntervention;
import disaster.loss.repository.PartnerInterventionRepository;
import disaster.loss.service.PartnerInterventionService;
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
 * REST controller for managing {@link disaster.loss.domain.PartnerIntervention}.
 */
@RestController
@RequestMapping("/api")
public class PartnerInterventionResource {

    private final Logger log = LoggerFactory.getLogger(PartnerInterventionResource.class);

    private static final String ENTITY_NAME = "partnerIntervention";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PartnerInterventionService partnerInterventionService;

    private final PartnerInterventionRepository partnerInterventionRepository;

    public PartnerInterventionResource(
        PartnerInterventionService partnerInterventionService,
        PartnerInterventionRepository partnerInterventionRepository
    ) {
        this.partnerInterventionService = partnerInterventionService;
        this.partnerInterventionRepository = partnerInterventionRepository;
    }

    /**
     * {@code POST  /partner-interventions} : Create a new partnerIntervention.
     *
     * @param partnerIntervention the partnerIntervention to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new partnerIntervention, or with status {@code 400 (Bad Request)} if the partnerIntervention has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/partner-interventions")
    public ResponseEntity<PartnerIntervention> createPartnerIntervention(@RequestBody PartnerIntervention partnerIntervention)
        throws URISyntaxException {
        log.debug("REST request to save PartnerIntervention : {}", partnerIntervention);
        if (partnerIntervention.getInteventionId() != null) {
            throw new BadRequestAlertException("A new partnerIntervention cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PartnerIntervention result = partnerInterventionService.save(partnerIntervention);
        return ResponseEntity
            .created(new URI("/api/partner-interventions/" + result.getInteventionId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getInteventionId()))
            .body(result);
    }

    /**
     * {@code PUT  /partner-interventions/:inteventionId} : Updates an existing partnerIntervention.
     *
     * @param inteventionId the id of the partnerIntervention to save.
     * @param partnerIntervention the partnerIntervention to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated partnerIntervention,
     * or with status {@code 400 (Bad Request)} if the partnerIntervention is not valid,
     * or with status {@code 500 (Internal Server Error)} if the partnerIntervention couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/partner-interventions/{inteventionId}")
    public ResponseEntity<PartnerIntervention> updatePartnerIntervention(
        @PathVariable(value = "inteventionId", required = false) final String inteventionId,
        @RequestBody PartnerIntervention partnerIntervention
    ) throws URISyntaxException {
        log.debug("REST request to update PartnerIntervention : {}, {}", inteventionId, partnerIntervention);
        if (partnerIntervention.getInteventionId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(inteventionId, partnerIntervention.getInteventionId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!partnerInterventionRepository.existsById(inteventionId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PartnerIntervention result = partnerInterventionService.save(partnerIntervention);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, partnerIntervention.getInteventionId()))
            .body(result);
    }

    /**
     * {@code PATCH  /partner-interventions/:inteventionId} : Partial updates given fields of an existing partnerIntervention, field will ignore if it is null
     *
     * @param inteventionId the id of the partnerIntervention to save.
     * @param partnerIntervention the partnerIntervention to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated partnerIntervention,
     * or with status {@code 400 (Bad Request)} if the partnerIntervention is not valid,
     * or with status {@code 404 (Not Found)} if the partnerIntervention is not found,
     * or with status {@code 500 (Internal Server Error)} if the partnerIntervention couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/partner-interventions/{inteventionId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PartnerIntervention> partialUpdatePartnerIntervention(
        @PathVariable(value = "inteventionId", required = false) final String inteventionId,
        @RequestBody PartnerIntervention partnerIntervention
    ) throws URISyntaxException {
        log.debug("REST request to partial update PartnerIntervention partially : {}, {}", inteventionId, partnerIntervention);
        if (partnerIntervention.getInteventionId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(inteventionId, partnerIntervention.getInteventionId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!partnerInterventionRepository.existsById(inteventionId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PartnerIntervention> result = partnerInterventionService.partialUpdate(partnerIntervention);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, partnerIntervention.getInteventionId())
        );
    }

    /**
     * {@code GET  /partner-interventions} : get all the partnerInterventions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of partnerInterventions in body.
     */
    @GetMapping("/partner-interventions")
    public ResponseEntity<List<PartnerIntervention>> getAllPartnerInterventions(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of PartnerInterventions");
        Page<PartnerIntervention> page = partnerInterventionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /partner-interventions/:id} : get the "id" partnerIntervention.
     *
     * @param id the id of the partnerIntervention to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the partnerIntervention, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/partner-interventions/{id}")
    public ResponseEntity<PartnerIntervention> getPartnerIntervention(@PathVariable String id) {
        log.debug("REST request to get PartnerIntervention : {}", id);
        Optional<PartnerIntervention> partnerIntervention = partnerInterventionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(partnerIntervention);
    }

    /**
     * {@code DELETE  /partner-interventions/:id} : delete the "id" partnerIntervention.
     *
     * @param id the id of the partnerIntervention to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/partner-interventions/{id}")
    public ResponseEntity<Void> deletePartnerIntervention(@PathVariable String id) {
        log.debug("REST request to delete PartnerIntervention : {}", id);
        partnerInterventionService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
