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

import disaster.loss.domain.HouseholdType;
import disaster.loss.repository.HouseholdTypeRepository;
import disaster.loss.repository.InfrastructureTypeRepository;
import disaster.loss.service.HouseholdTypeService;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.HouseholdType}.
 */
@RestController
@RequestMapping("/api")
public class HouseholdTypeResource {

    private final Logger log = LoggerFactory.getLogger(HouseholdTypeResource.class);

    private static final String ENTITY_NAME = "householdType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HouseholdTypeService householdTypeService;

    private final HouseholdTypeRepository householdTypeRepository;

    public HouseholdTypeResource(
    		HouseholdTypeService householdTypeService,
    		HouseholdTypeRepository householdTypeRepository
    ) {
        this.householdTypeService = householdTypeService;
        this.householdTypeRepository = householdTypeRepository;
    }

    /**
     * {@code POST  /household-types} : Create a new householdType.
     *
     * @param householdType the householdType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new householdType, or with status {@code 400 (Bad Request)} if the householdType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/household-types")
    public ResponseEntity<HouseholdType> createInfrastructureType(@RequestBody HouseholdType householdType)
        throws URISyntaxException {
        log.debug("REST request to save HouseholdType : {}", householdType);
        if (householdType.getHouseholdTypeId() != null) {
            throw new BadRequestAlertException("A new householdType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HouseholdType result = householdTypeService.save(householdType);
        return ResponseEntity
            .created(new URI("/api/household-types/" + result.getHouseholdTypeId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getHouseholdTypeId()))
            .body(result);
    }

    /**
     * {@code PUT  /household-types/:infractructureTypeId} : Updates an existing householdType.
     *
     * @param infractructureTypeId the id of the householdType to save.
     * @param householdType the householdType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated householdType,
     * or with status {@code 400 (Bad Request)} if the householdType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the householdType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/household-types/{infractructureTypeId}")
    public ResponseEntity<HouseholdType> updateInfrastructureType(
        @PathVariable(value = "infractructureTypeId", required = false) final String infractructureTypeId,
        @RequestBody HouseholdType householdType
    ) throws URISyntaxException {
        log.debug("REST request to update HouseholdType : {}, {}", infractructureTypeId, householdType);
        if (householdType.getHouseholdTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(infractructureTypeId, householdType.getHouseholdTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!householdTypeRepository.existsById(infractructureTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HouseholdType result = householdTypeService.save(householdType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, householdType.getHouseholdTypeId()))
            .body(result);
    }

    /**
     * {@code PATCH  /household-types/:infractructureTypeId} : Partial updates given fields of an existing householdType, field will ignore if it is null
     *
     * @param infractructureTypeId the id of the householdType to save.
     * @param householdType the householdType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated householdType,
     * or with status {@code 400 (Bad Request)} if the householdType is not valid,
     * or with status {@code 404 (Not Found)} if the householdType is not found,
     * or with status {@code 500 (Internal Server Error)} if the householdType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/household-types/{infractructureTypeId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HouseholdType> partialUpdateInfrastructureType(
        @PathVariable(value = "infractructureTypeId", required = false) final String infractructureTypeId,
        @RequestBody HouseholdType householdType
    ) throws URISyntaxException {
        log.debug("REST request to partial update HouseholdType partially : {}, {}", infractructureTypeId, householdType);
        if (householdType.getHouseholdTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(infractructureTypeId, householdType.getHouseholdTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!householdTypeRepository.existsById(infractructureTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HouseholdType> result = householdTypeService.partialUpdate(householdType);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, householdType.getHouseholdTypeId())
        );
    }

    /**
     * {@code GET  /household-types} : get all the householdTypes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of householdTypes in body.
     */
    @GetMapping("/household-types")
    public ResponseEntity<List<HouseholdType>> getAllInfrastructureTypes(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of InfrastructureTypes");
        Page<HouseholdType> page = householdTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /household-types/:id} : get the "id" householdType.
     *
     * @param id the id of the householdType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the householdType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/household-types/{id}")
    public ResponseEntity<HouseholdType> getInfrastructureType(@PathVariable String id) {
        log.debug("REST request to get HouseholdType : {}", id);
        Optional<HouseholdType> householdType = householdTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(householdType);
    }

    /**
     * {@code DELETE  /household-types/:id} : delete the "id" householdType.
     *
     * @param id the id of the householdType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/household-types/{id}")
    public ResponseEntity<Void> deleteInfrastructureType(@PathVariable String id) {
        log.debug("REST request to delete HouseholdType : {}", id);
        householdTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
