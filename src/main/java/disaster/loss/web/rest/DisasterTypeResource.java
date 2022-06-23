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
import org.springframework.data.web.PageableDefault;
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

import disaster.loss.domain.DisasterType;
import disaster.loss.repository.DisasterTypeRepository;
import disaster.loss.service.DisasterTypeService;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.DisasterType}.
 */
@RestController
@RequestMapping("/api")
public class DisasterTypeResource {

    private final Logger log = LoggerFactory.getLogger(DisasterTypeResource.class);

    private static final String ENTITY_NAME = "disasterType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DisasterTypeService disasterTypeService;

    private final DisasterTypeRepository disasterTypeRepository;

    public DisasterTypeResource(DisasterTypeService disasterTypeService, DisasterTypeRepository disasterTypeRepository) {
        this.disasterTypeService = disasterTypeService;
        this.disasterTypeRepository = disasterTypeRepository;
    }

    /**
     * {@code POST  /disaster-types} : Create a new disasterType.
     *
     * @param disasterType the disasterType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new disasterType, or with status {@code 400 (Bad Request)} if the disasterType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/disaster-types")
    public ResponseEntity<DisasterType> createDisasterType(@RequestBody DisasterType disasterType) throws URISyntaxException {
        log.debug("REST request to save DisasterType : {}", disasterType);
        if (disasterType.getDisasterTypeId() != null) {
            throw new BadRequestAlertException("A new disasterType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DisasterType result = disasterTypeService.save(disasterType);
        return ResponseEntity
            .created(new URI("/api/disaster-types/" + result.getDisasterTypeId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getDisasterTypeId()))
            .body(result);
    }

    /**
     * {@code PUT  /disaster-types/:disasterTypeId} : Updates an existing disasterType.
     *
     * @param disasterTypeId the id of the disasterType to save.
     * @param disasterType the disasterType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disasterType,
     * or with status {@code 400 (Bad Request)} if the disasterType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the disasterType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/disaster-types/{disasterTypeId}")
    public ResponseEntity<DisasterType> updateDisasterType(
        @PathVariable(value = "disasterTypeId", required = false) final String disasterTypeId,
        @RequestBody DisasterType disasterType
    ) throws URISyntaxException {
        log.debug("REST request to update DisasterType : {}, {}", disasterTypeId, disasterType);
        if (disasterType.getDisasterTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(disasterTypeId, disasterType.getDisasterTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disasterTypeRepository.existsById(disasterTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DisasterType result = disasterTypeService.save(disasterType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disasterType.getDisasterTypeId()))
            .body(result);
    }

    /**
     * {@code PATCH  /disaster-types/:disasterTypeId} : Partial updates given fields of an existing disasterType, field will ignore if it is null
     *
     * @param disasterTypeId the id of the disasterType to save.
     * @param disasterType the disasterType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disasterType,
     * or with status {@code 400 (Bad Request)} if the disasterType is not valid,
     * or with status {@code 404 (Not Found)} if the disasterType is not found,
     * or with status {@code 500 (Internal Server Error)} if the disasterType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/disaster-types/{disasterTypeId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DisasterType> partialUpdateDisasterType(
        @PathVariable(value = "disasterTypeId", required = false) final String disasterTypeId,
        @RequestBody DisasterType disasterType
    ) throws URISyntaxException {
        log.debug("REST request to partial update DisasterType partially : {}, {}", disasterTypeId, disasterType);
        if (disasterType.getDisasterTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(disasterTypeId, disasterType.getDisasterTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disasterTypeRepository.existsById(disasterTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DisasterType> result = disasterTypeService.partialUpdate(disasterType);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disasterType.getDisasterTypeId())
        );
    }

    /**
     * {@code GET  /disaster-types} : get all the disasterTypes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of disasterTypes in body.
     */
    @GetMapping("/disaster-types")
    public ResponseEntity<List<DisasterType>> getAllDisasterTypes(@org.springdoc.api.annotations.ParameterObject @PageableDefault(size = 70) Pageable pageable) {
        log.debug("REST request to get a page of DisasterTypes");
        Page<DisasterType> page = disasterTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /disaster-types/:id} : get the "id" disasterType.
     *
     * @param id the id of the disasterType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the disasterType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/disaster-types/{id}")
    public ResponseEntity<DisasterType> getDisasterType(@PathVariable String id) {
        log.debug("REST request to get DisasterType : {}", id);
        Optional<DisasterType> disasterType = disasterTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(disasterType);
    }

    /**
     * {@code DELETE  /disaster-types/:id} : delete the "id" disasterType.
     *
     * @param id the id of the disasterType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/disaster-types/{id}")
    public ResponseEntity<Void> deleteDisasterType(@PathVariable String id) {
        log.debug("REST request to delete DisasterType : {}", id);
        disasterTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
