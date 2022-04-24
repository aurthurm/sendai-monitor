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

import disaster.loss.domain.HumanPopulationDisasterCategory;
import disaster.loss.repository.HumanPopulationDisasterCategoryRepository;
import disaster.loss.service.HumanPopulationDisasterCategoryService;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.CropType}.
 */
@RestController
@RequestMapping("/api")
public class HumanPopulationDisasterCategoryResource {

    private final Logger log = LoggerFactory.getLogger(HumanPopulationDisasterCategoryResource.class);

    private static final String ENTITY_NAME = "cropType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HumanPopulationDisasterCategoryService humaPopulationDisasterCategoryService;

    private final HumanPopulationDisasterCategoryRepository humanPopulationDisasterCategoryRepository;

    public HumanPopulationDisasterCategoryResource(HumanPopulationDisasterCategoryService humaPopulationDisasterCategoryService, HumanPopulationDisasterCategoryRepository humanPopulationDisasterCategoryRepository) {
        this.humaPopulationDisasterCategoryService = humaPopulationDisasterCategoryService;
        this.humanPopulationDisasterCategoryRepository = humanPopulationDisasterCategoryRepository;
    }

    /**
     * {@code POST  /human-population-disaster-category} : Create a new cropType.
     *
     * @param cropType the cropType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cropType, or with status {@code 400 (Bad Request)} if the cropType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/human-population-disaster-category")
    public ResponseEntity<HumanPopulationDisasterCategory> createHumanPopulationDisasterCategory(@RequestBody HumanPopulationDisasterCategory cropType) throws URISyntaxException {
        log.debug("REST request to save CropType : {}", cropType);
        if (cropType.getHumanPopulationDisasterCategoryId() != null) {
            throw new BadRequestAlertException("A new HumanPopulationDisasterCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HumanPopulationDisasterCategory result = humaPopulationDisasterCategoryService.save(cropType);
        return ResponseEntity
            .created(new URI("/api/human-population-disaster-category/" + result.getHumanPopulationDisasterCategoryId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getHumanPopulationDisasterCategoryId()))
            .body(result);
    }

    /**
     * {@code PUT  /human-population-disaster-category/:cropTypeId} : Updates an existing cropType.
     *
     * @param cropTypeId the id of the cropType to save.
     * @param humanPopulationDisasterCategory the cropType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cropType,
     * or with status {@code 400 (Bad Request)} if the cropType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cropType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/human-population-disaster-category/{humanPopulationDisasterCategoryId}")
    public ResponseEntity<HumanPopulationDisasterCategory> updateHumanPopulationDisasterCategory(
        @PathVariable(value = "cropTypeId", required = false) final String humanPopulationDisasterCategoryId,
        @RequestBody HumanPopulationDisasterCategory humanPopulationDisasterCategory
    ) throws URISyntaxException {
        log.debug("REST request to update CropType : {}, {}", humanPopulationDisasterCategoryId, humanPopulationDisasterCategory);
        if (humanPopulationDisasterCategory.getHumanPopulationDisasterCategoryId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(humanPopulationDisasterCategoryId, humanPopulationDisasterCategory.getHumanPopulationDisasterCategoryId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!humanPopulationDisasterCategoryRepository.existsById(humanPopulationDisasterCategoryId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HumanPopulationDisasterCategory result = humaPopulationDisasterCategoryService.save(humanPopulationDisasterCategory);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, humanPopulationDisasterCategory.getHumanPopulationDisasterCategoryId()))
            .body(result);
    }

    /**
     * {@code PATCH  /human-population-disaster-category/:cropTypeId} : Partial updates given fields of an existing cropType, field will ignore if it is null
     *
     * @param cropTypeId the id of the cropType to save.
     * @param cropType the cropType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cropType,
     * or with status {@code 400 (Bad Request)} if the cropType is not valid,
     * or with status {@code 404 (Not Found)} if the cropType is not found,
     * or with status {@code 500 (Internal Server Error)} if the cropType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/human-population-disaster-category/{cropTypeId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HumanPopulationDisasterCategory> partialUpdateCropType(
        @PathVariable(value = "cropTypeId", required = false) final String cropTypeId,
        @RequestBody HumanPopulationDisasterCategory cropType
    ) throws URISyntaxException {
        log.debug("REST request to partial update CropType partially : {}, {}", cropTypeId, cropType);
        if (cropType.getHumanPopulationDisasterCategoryId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(cropTypeId, cropType.getHumanPopulationDisasterCategoryId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!humanPopulationDisasterCategoryRepository.existsById(cropTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HumanPopulationDisasterCategory> result = humaPopulationDisasterCategoryService.partialUpdate(cropType);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cropType.getHumanPopulationDisasterCategoryId())
        );
    }

    /**
     * {@code GET  /human-population-disaster-category} : get all the cropTypes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cropTypes in body.
     */
    @GetMapping("/human-population-disaster-category")
    public ResponseEntity<List<HumanPopulationDisasterCategory>> getAllCropTypes(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of CropTypes");
        Page<HumanPopulationDisasterCategory> page = humaPopulationDisasterCategoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /human-population-disaster-category/:id} : get the "id" cropType.
     *
     * @param id the id of the cropType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cropType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/human-population-disaster-category/{id}")
    public ResponseEntity<HumanPopulationDisasterCategory> getCropType(@PathVariable String id) {
        log.debug("REST request to get CropType : {}", id);
        Optional<HumanPopulationDisasterCategory> cropType = humaPopulationDisasterCategoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cropType);
    }

    /**
     * {@code DELETE  /human-population-disaster-category/:id} : delete the "id" cropType.
     *
     * @param id the id of the cropType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/human-population-disaster-category/{id}")
    public ResponseEntity<Void> deleteCropType(@PathVariable String id) {
        log.debug("REST request to delete CropType : {}", id);
        humaPopulationDisasterCategoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
