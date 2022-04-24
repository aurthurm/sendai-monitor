package disaster.loss.web.rest;

import disaster.loss.domain.CropType;
import disaster.loss.repository.CropTypeRepository;
import disaster.loss.service.CropTypeService;
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
 * REST controller for managing {@link disaster.loss.domain.CropType}.
 */
@RestController
@RequestMapping("/api")
public class CropTypeResource {

    private final Logger log = LoggerFactory.getLogger(CropTypeResource.class);

    private static final String ENTITY_NAME = "cropType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CropTypeService cropTypeService;

    private final CropTypeRepository cropTypeRepository;

    public CropTypeResource(CropTypeService cropTypeService, CropTypeRepository cropTypeRepository) {
        this.cropTypeService = cropTypeService;
        this.cropTypeRepository = cropTypeRepository;
    }

    /**
     * {@code POST  /crop-types} : Create a new cropType.
     *
     * @param cropType the cropType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cropType, or with status {@code 400 (Bad Request)} if the cropType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/crop-types")
    public ResponseEntity<CropType> createCropType(@RequestBody CropType cropType) throws URISyntaxException {
        log.debug("REST request to save CropType : {}", cropType);
        if (cropType.getCropTypeId() != null) {
            throw new BadRequestAlertException("A new cropType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CropType result = cropTypeService.save(cropType);
        return ResponseEntity
            .created(new URI("/api/crop-types/" + result.getCropTypeId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getCropTypeId()))
            .body(result);
    }

    /**
     * {@code PUT  /crop-types/:cropTypeId} : Updates an existing cropType.
     *
     * @param cropTypeId the id of the cropType to save.
     * @param cropType the cropType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cropType,
     * or with status {@code 400 (Bad Request)} if the cropType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cropType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/crop-types/{cropTypeId}")
    public ResponseEntity<CropType> updateCropType(
        @PathVariable(value = "cropTypeId", required = false) final String cropTypeId,
        @RequestBody CropType cropType
    ) throws URISyntaxException {
        log.debug("REST request to update CropType : {}, {}", cropTypeId, cropType);
        if (cropType.getCropTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(cropTypeId, cropType.getCropTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cropTypeRepository.existsById(cropTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CropType result = cropTypeService.save(cropType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cropType.getCropTypeId()))
            .body(result);
    }

    /**
     * {@code PATCH  /crop-types/:cropTypeId} : Partial updates given fields of an existing cropType, field will ignore if it is null
     *
     * @param cropTypeId the id of the cropType to save.
     * @param cropType the cropType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cropType,
     * or with status {@code 400 (Bad Request)} if the cropType is not valid,
     * or with status {@code 404 (Not Found)} if the cropType is not found,
     * or with status {@code 500 (Internal Server Error)} if the cropType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/crop-types/{cropTypeId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CropType> partialUpdateCropType(
        @PathVariable(value = "cropTypeId", required = false) final String cropTypeId,
        @RequestBody CropType cropType
    ) throws URISyntaxException {
        log.debug("REST request to partial update CropType partially : {}, {}", cropTypeId, cropType);
        if (cropType.getCropTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(cropTypeId, cropType.getCropTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cropTypeRepository.existsById(cropTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CropType> result = cropTypeService.partialUpdate(cropType);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cropType.getCropTypeId())
        );
    }

    /**
     * {@code GET  /crop-types} : get all the cropTypes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cropTypes in body.
     */
    @GetMapping("/crop-types")
    public ResponseEntity<List<CropType>> getAllCropTypes(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of CropTypes");
        Page<CropType> page = cropTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /crop-types/:id} : get the "id" cropType.
     *
     * @param id the id of the cropType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cropType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/crop-types/{id}")
    public ResponseEntity<CropType> getCropType(@PathVariable String id) {
        log.debug("REST request to get CropType : {}", id);
        Optional<CropType> cropType = cropTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cropType);
    }

    /**
     * {@code DELETE  /crop-types/:id} : delete the "id" cropType.
     *
     * @param id the id of the cropType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/crop-types/{id}")
    public ResponseEntity<Void> deleteCropType(@PathVariable String id) {
        log.debug("REST request to delete CropType : {}", id);
        cropTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
