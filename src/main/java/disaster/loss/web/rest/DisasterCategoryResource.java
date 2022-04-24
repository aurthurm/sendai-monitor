package disaster.loss.web.rest;

import disaster.loss.domain.DisasterCategory;
import disaster.loss.repository.DisasterCategoryRepository;
import disaster.loss.service.DisasterCategoryService;
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
 * REST controller for managing {@link disaster.loss.domain.DisasterCategory}.
 */
@RestController
@RequestMapping("/api")
public class DisasterCategoryResource {

    private final Logger log = LoggerFactory.getLogger(DisasterCategoryResource.class);

    private static final String ENTITY_NAME = "disasterCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DisasterCategoryService disasterCategoryService;

    private final DisasterCategoryRepository disasterCategoryRepository;

    public DisasterCategoryResource(
        DisasterCategoryService disasterCategoryService,
        DisasterCategoryRepository disasterCategoryRepository
    ) {
        this.disasterCategoryService = disasterCategoryService;
        this.disasterCategoryRepository = disasterCategoryRepository;
    }

    /**
     * {@code POST  /disaster-categories} : Create a new disasterCategory.
     *
     * @param disasterCategory the disasterCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new disasterCategory, or with status {@code 400 (Bad Request)} if the disasterCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/disaster-categories")
    public ResponseEntity<DisasterCategory> createDisasterCategory(@RequestBody DisasterCategory disasterCategory)
        throws URISyntaxException {
        log.debug("REST request to save DisasterCategory : {}", disasterCategory);
        if (disasterCategory.getDisasterCategoryId() != null) {
            throw new BadRequestAlertException("A new disasterCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DisasterCategory result = disasterCategoryService.save(disasterCategory);
        return ResponseEntity
            .created(new URI("/api/disaster-categories/" + result.getDisasterCategoryId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getDisasterCategoryId()))
            .body(result);
    }

    /**
     * {@code PUT  /disaster-categories/:disasterCategoryId} : Updates an existing disasterCategory.
     *
     * @param disasterCategoryId the id of the disasterCategory to save.
     * @param disasterCategory the disasterCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disasterCategory,
     * or with status {@code 400 (Bad Request)} if the disasterCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the disasterCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/disaster-categories/{disasterCategoryId}")
    public ResponseEntity<DisasterCategory> updateDisasterCategory(
        @PathVariable(value = "disasterCategoryId", required = false) final String disasterCategoryId,
        @RequestBody DisasterCategory disasterCategory
    ) throws URISyntaxException {
        log.debug("REST request to update DisasterCategory : {}, {}", disasterCategoryId, disasterCategory);
        if (disasterCategory.getDisasterCategoryId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(disasterCategoryId, disasterCategory.getDisasterCategoryId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disasterCategoryRepository.existsById(disasterCategoryId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DisasterCategory result = disasterCategoryService.save(disasterCategory);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disasterCategory.getDisasterCategoryId()))
            .body(result);
    }

    /**
     * {@code PATCH  /disaster-categories/:disasterCategoryId} : Partial updates given fields of an existing disasterCategory, field will ignore if it is null
     *
     * @param disasterCategoryId the id of the disasterCategory to save.
     * @param disasterCategory the disasterCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disasterCategory,
     * or with status {@code 400 (Bad Request)} if the disasterCategory is not valid,
     * or with status {@code 404 (Not Found)} if the disasterCategory is not found,
     * or with status {@code 500 (Internal Server Error)} if the disasterCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/disaster-categories/{disasterCategoryId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DisasterCategory> partialUpdateDisasterCategory(
        @PathVariable(value = "disasterCategoryId", required = false) final String disasterCategoryId,
        @RequestBody DisasterCategory disasterCategory
    ) throws URISyntaxException {
        log.debug("REST request to partial update DisasterCategory partially : {}, {}", disasterCategoryId, disasterCategory);
        if (disasterCategory.getDisasterCategoryId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(disasterCategoryId, disasterCategory.getDisasterCategoryId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disasterCategoryRepository.existsById(disasterCategoryId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DisasterCategory> result = disasterCategoryService.partialUpdate(disasterCategory);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disasterCategory.getDisasterCategoryId())
        );
    }

    /**
     * {@code GET  /disaster-categories} : get all the disasterCategories.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of disasterCategories in body.
     */
    @GetMapping("/disaster-categories")
    public ResponseEntity<List<DisasterCategory>> getAllDisasterCategories(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of DisasterCategories");
        Page<DisasterCategory> page = disasterCategoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /disaster-categories/:id} : get the "id" disasterCategory.
     *
     * @param id the id of the disasterCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the disasterCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/disaster-categories/{id}")
    public ResponseEntity<DisasterCategory> getDisasterCategory(@PathVariable String id) {
        log.debug("REST request to get DisasterCategory : {}", id);
        Optional<DisasterCategory> disasterCategory = disasterCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(disasterCategory);
    }

    /**
     * {@code DELETE  /disaster-categories/:id} : delete the "id" disasterCategory.
     *
     * @param id the id of the disasterCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/disaster-categories/{id}")
    public ResponseEntity<Void> deleteDisasterCategory(@PathVariable String id) {
        log.debug("REST request to delete DisasterCategory : {}", id);
        disasterCategoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
