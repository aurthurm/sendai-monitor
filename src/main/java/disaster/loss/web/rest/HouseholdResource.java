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

import disaster.loss.domain.Household;
import disaster.loss.repository.HouseholdRepository;
import disaster.loss.repository.InfrastructureRepository;
import disaster.loss.service.HouseholdService;
import disaster.loss.service.InfrastructureService;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.Household}.
 */
@RestController
@RequestMapping("/api")
public class HouseholdResource {

    private final Logger log = LoggerFactory.getLogger(HouseholdResource.class);

    private static final String ENTITY_NAME = "household";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HouseholdService householdService;

    private final HouseholdRepository householdRepository;

    public HouseholdResource(HouseholdService householdService, HouseholdRepository householdRepository) {
        this.householdService = householdService;
        this.householdRepository = householdRepository;
    }

    /**
     * {@code POST  /households} : Create a new household.
     *
     * @param household the household to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new household, or with status {@code 400 (Bad Request)} if the household has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/households")
    public ResponseEntity<Household> createInfrastructure(@RequestBody Household household) throws URISyntaxException {
        log.debug("REST request to save Household : {}", household);
        if (household.getHouseholdId() != null) {
            throw new BadRequestAlertException("A new household cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Household result = householdService.save(household);
        return ResponseEntity
            .created(new URI("/api/households/" + result.getHouseholdId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getHouseholdId()))
            .body(result);
    }

    /**
     * {@code PUT  /households/:HouseholdId} : Updates an existing household.
     *
     * @param HouseholdId the id of the household to save.
     * @param household the household to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated household,
     * or with status {@code 400 (Bad Request)} if the household is not valid,
     * or with status {@code 500 (Internal Server Error)} if the household couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/households/{HouseholdId}")
    public ResponseEntity<Household> updateInfrastructure(
        @PathVariable(value = "HouseholdId", required = false) final String HouseholdId,
        @RequestBody Household household
    ) throws URISyntaxException {
        log.debug("REST request to update Household : {}, {}", HouseholdId, household);
        if (household.getHouseholdId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(HouseholdId, household.getHouseholdId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!householdRepository.existsById(HouseholdId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Household result = householdService.save(household);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, household.getHouseholdId()))
            .body(result);
    }

    /**
     * {@code PATCH  /households/:HouseholdId} : Partial updates given fields of an existing household, field will ignore if it is null
     *
     * @param HouseholdId the id of the household to save.
     * @param household the household to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated household,
     * or with status {@code 400 (Bad Request)} if the household is not valid,
     * or with status {@code 404 (Not Found)} if the household is not found,
     * or with status {@code 500 (Internal Server Error)} if the household couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/households/{HouseholdId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Household> partialUpdateInfrastructure(
        @PathVariable(value = "HouseholdId", required = false) final String HouseholdId,
        @RequestBody Household household
    ) throws URISyntaxException {
        log.debug("REST request to partial update Household partially : {}, {}", HouseholdId, household);
        if (household.getHouseholdId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(HouseholdId, household.getHouseholdId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!householdRepository.existsById(HouseholdId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Household> result = householdService.partialUpdate(household);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, household.getHouseholdId())
        );
    }

    /**
     * {@code GET  /households} : get all the households.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of households in body.
     */
    @GetMapping("/households")
    public ResponseEntity<List<Household>> getAllInfrastructures(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Infrastructures");
        log.debug("pageable {}", pageable);
        Page<Household> page = householdService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /households/disaster/:disasterId} : get all the households for disaster.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of households in body.
     */
    @GetMapping("/households/disaster/{disasterId}")
    public ResponseEntity<List<Household>> getInfrastructuresForDisaster(@PathVariable String disasterId, @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Infrastructures");
        log.debug("pageable {}", pageable);
        Page<Household> page = householdService.findByDisasterId(disasterId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /households/:id} : get the "id" household.
     *
     * @param id the id of the household to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the household, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/households/{id}")
    public ResponseEntity<Household> getInfrastructure(@PathVariable String id) {
        log.debug("REST request to get Household : {}", id);
        Optional<Household> household = householdService.findOne(id);
        return ResponseUtil.wrapOrNotFound(household);
    }

    /**
     * {@code DELETE  /households/:id} : delete the "id" household.
     *
     * @param id the id of the household to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/households/{id}")
    public ResponseEntity<Void> deleteInfrastructure(@PathVariable String id) {
        log.debug("REST request to delete Household : {}", id);
        householdService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
