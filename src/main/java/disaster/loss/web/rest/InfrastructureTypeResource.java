package disaster.loss.web.rest;

import disaster.loss.domain.InfrastructureType;
import disaster.loss.repository.InfrastructureTypeRepository;
import disaster.loss.service.InfrastructureTypeService;
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
 * REST controller for managing {@link disaster.loss.domain.InfrastructureType}.
 */
@RestController
@RequestMapping("/api")
public class InfrastructureTypeResource {

    private final Logger log = LoggerFactory.getLogger(InfrastructureTypeResource.class);

    private static final String ENTITY_NAME = "infrastructureType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InfrastructureTypeService infrastructureTypeService;

    private final InfrastructureTypeRepository infrastructureTypeRepository;

    public InfrastructureTypeResource(
        InfrastructureTypeService infrastructureTypeService,
        InfrastructureTypeRepository infrastructureTypeRepository
    ) {
        this.infrastructureTypeService = infrastructureTypeService;
        this.infrastructureTypeRepository = infrastructureTypeRepository;
    }

    /**
     * {@code POST  /infrastructure-types} : Create a new infrastructureType.
     *
     * @param infrastructureType the infrastructureType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new infrastructureType, or with status {@code 400 (Bad Request)} if the infrastructureType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/infrastructure-types")
    public ResponseEntity<InfrastructureType> createInfrastructureType(@RequestBody InfrastructureType infrastructureType)
        throws URISyntaxException {
        log.debug("REST request to save InfrastructureType : {}", infrastructureType);
        if (infrastructureType.getInfractructureTypeId() != null) {
            throw new BadRequestAlertException("A new infrastructureType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InfrastructureType result = infrastructureTypeService.save(infrastructureType);
        return ResponseEntity
            .created(new URI("/api/infrastructure-types/" + result.getInfractructureTypeId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getInfractructureTypeId()))
            .body(result);
    }

    /**
     * {@code PUT  /infrastructure-types/:infractructureTypeId} : Updates an existing infrastructureType.
     *
     * @param infractructureTypeId the id of the infrastructureType to save.
     * @param infrastructureType the infrastructureType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated infrastructureType,
     * or with status {@code 400 (Bad Request)} if the infrastructureType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the infrastructureType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/infrastructure-types/{infractructureTypeId}")
    public ResponseEntity<InfrastructureType> updateInfrastructureType(
        @PathVariable(value = "infractructureTypeId", required = false) final String infractructureTypeId,
        @RequestBody InfrastructureType infrastructureType
    ) throws URISyntaxException {
        log.debug("REST request to update InfrastructureType : {}, {}", infractructureTypeId, infrastructureType);
        if (infrastructureType.getInfractructureTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(infractructureTypeId, infrastructureType.getInfractructureTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!infrastructureTypeRepository.existsById(infractructureTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        InfrastructureType result = infrastructureTypeService.save(infrastructureType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, infrastructureType.getInfractructureTypeId()))
            .body(result);
    }

    /**
     * {@code PATCH  /infrastructure-types/:infractructureTypeId} : Partial updates given fields of an existing infrastructureType, field will ignore if it is null
     *
     * @param infractructureTypeId the id of the infrastructureType to save.
     * @param infrastructureType the infrastructureType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated infrastructureType,
     * or with status {@code 400 (Bad Request)} if the infrastructureType is not valid,
     * or with status {@code 404 (Not Found)} if the infrastructureType is not found,
     * or with status {@code 500 (Internal Server Error)} if the infrastructureType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/infrastructure-types/{infractructureTypeId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<InfrastructureType> partialUpdateInfrastructureType(
        @PathVariable(value = "infractructureTypeId", required = false) final String infractructureTypeId,
        @RequestBody InfrastructureType infrastructureType
    ) throws URISyntaxException {
        log.debug("REST request to partial update InfrastructureType partially : {}, {}", infractructureTypeId, infrastructureType);
        if (infrastructureType.getInfractructureTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(infractructureTypeId, infrastructureType.getInfractructureTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!infrastructureTypeRepository.existsById(infractructureTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<InfrastructureType> result = infrastructureTypeService.partialUpdate(infrastructureType);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, infrastructureType.getInfractructureTypeId())
        );
    }

    /**
     * {@code GET  /infrastructure-types} : get all the infrastructureTypes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of infrastructureTypes in body.
     */
    @GetMapping("/infrastructure-types")
    public ResponseEntity<List<InfrastructureType>> getAllInfrastructureTypes(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of InfrastructureTypes");
        Page<InfrastructureType> page = infrastructureTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /infrastructure-types/:id} : get the "id" infrastructureType.
     *
     * @param id the id of the infrastructureType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the infrastructureType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/infrastructure-types/{id}")
    public ResponseEntity<InfrastructureType> getInfrastructureType(@PathVariable String id) {
        log.debug("REST request to get InfrastructureType : {}", id);
        Optional<InfrastructureType> infrastructureType = infrastructureTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(infrastructureType);
    }

    /**
     * {@code DELETE  /infrastructure-types/:id} : delete the "id" infrastructureType.
     *
     * @param id the id of the infrastructureType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/infrastructure-types/{id}")
    public ResponseEntity<Void> deleteInfrastructureType(@PathVariable String id) {
        log.debug("REST request to delete InfrastructureType : {}", id);
        infrastructureTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
