package disaster.loss.web.rest;

import disaster.loss.domain.Infrastructure;
import disaster.loss.repository.InfrastructureRepository;
import disaster.loss.service.InfrastructureService;
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
 * REST controller for managing {@link disaster.loss.domain.Infrastructure}.
 */
@RestController
@RequestMapping("/api")
public class InfrastructureResource {

    private final Logger log = LoggerFactory.getLogger(InfrastructureResource.class);

    private static final String ENTITY_NAME = "infrastructure";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InfrastructureService infrastructureService;

    private final InfrastructureRepository infrastructureRepository;

    public InfrastructureResource(InfrastructureService infrastructureService, InfrastructureRepository infrastructureRepository) {
        this.infrastructureService = infrastructureService;
        this.infrastructureRepository = infrastructureRepository;
    }

    /**
     * {@code POST  /infrastructures} : Create a new infrastructure.
     *
     * @param infrastructure the infrastructure to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new infrastructure, or with status {@code 400 (Bad Request)} if the infrastructure has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/infrastructures")
    public ResponseEntity<Infrastructure> createInfrastructure(@RequestBody Infrastructure infrastructure) throws URISyntaxException {
        log.debug("REST request to save Infrastructure : {}", infrastructure);
        if (infrastructure.getInfractructureId() != null) {
            throw new BadRequestAlertException("A new infrastructure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Infrastructure result = infrastructureService.save(infrastructure);
        return ResponseEntity
            .created(new URI("/api/infrastructures/" + result.getInfractructureId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getInfractructureId()))
            .body(result);
    }

    /**
     * {@code PUT  /infrastructures/:infractructureId} : Updates an existing infrastructure.
     *
     * @param infractructureId the id of the infrastructure to save.
     * @param infrastructure the infrastructure to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated infrastructure,
     * or with status {@code 400 (Bad Request)} if the infrastructure is not valid,
     * or with status {@code 500 (Internal Server Error)} if the infrastructure couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/infrastructures/{infractructureId}")
    public ResponseEntity<Infrastructure> updateInfrastructure(
        @PathVariable(value = "infractructureId", required = false) final String infractructureId,
        @RequestBody Infrastructure infrastructure
    ) throws URISyntaxException {
        log.debug("REST request to update Infrastructure : {}, {}", infractructureId, infrastructure);
        if (infrastructure.getInfractructureId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(infractructureId, infrastructure.getInfractructureId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!infrastructureRepository.existsById(infractructureId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Infrastructure result = infrastructureService.save(infrastructure);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, infrastructure.getInfractructureId()))
            .body(result);
    }

    /**
     * {@code PATCH  /infrastructures/:infractructureId} : Partial updates given fields of an existing infrastructure, field will ignore if it is null
     *
     * @param infractructureId the id of the infrastructure to save.
     * @param infrastructure the infrastructure to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated infrastructure,
     * or with status {@code 400 (Bad Request)} if the infrastructure is not valid,
     * or with status {@code 404 (Not Found)} if the infrastructure is not found,
     * or with status {@code 500 (Internal Server Error)} if the infrastructure couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/infrastructures/{infractructureId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Infrastructure> partialUpdateInfrastructure(
        @PathVariable(value = "infractructureId", required = false) final String infractructureId,
        @RequestBody Infrastructure infrastructure
    ) throws URISyntaxException {
        log.debug("REST request to partial update Infrastructure partially : {}, {}", infractructureId, infrastructure);
        if (infrastructure.getInfractructureId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(infractructureId, infrastructure.getInfractructureId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!infrastructureRepository.existsById(infractructureId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Infrastructure> result = infrastructureService.partialUpdate(infrastructure);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, infrastructure.getInfractructureId())
        );
    }

    /**
     * {@code GET  /infrastructures} : get all the infrastructures.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of infrastructures in body.
     */
    @GetMapping("/infrastructures")
    public ResponseEntity<List<Infrastructure>> getAllInfrastructures(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Infrastructures");
        log.debug("pageable {}", pageable);
        Page<Infrastructure> page = infrastructureService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /infrastructures/disaster/:disasterId} : get all the infrastructures for disaster.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of infrastructures in body.
     */
    @GetMapping("/infrastructures/disaster/{disasterId}")
    public ResponseEntity<List<Infrastructure>> getInfrastructuresForDisaster(@PathVariable String disasterId, @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Infrastructures");
        log.debug("pageable {}", pageable);
        Page<Infrastructure> page = infrastructureService.findByDisasterId(disasterId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /infrastructures/:id} : get the "id" infrastructure.
     *
     * @param id the id of the infrastructure to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the infrastructure, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/infrastructures/{id}")
    public ResponseEntity<Infrastructure> getInfrastructure(@PathVariable String id) {
        log.debug("REST request to get Infrastructure : {}", id);
        Optional<Infrastructure> infrastructure = infrastructureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(infrastructure);
    }

    /**
     * {@code DELETE  /infrastructures/:id} : delete the "id" infrastructure.
     *
     * @param id the id of the infrastructure to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/infrastructures/{id}")
    public ResponseEntity<Void> deleteInfrastructure(@PathVariable String id) {
        log.debug("REST request to delete Infrastructure : {}", id);
        infrastructureService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
