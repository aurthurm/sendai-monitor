package disaster.loss.web.rest;

import disaster.loss.domain.Crop;
import disaster.loss.repository.CropRepository;
import disaster.loss.service.CropService;
import disaster.loss.service.dto.CountryDTO;
import disaster.loss.service.impl.FacilityRegistryServiceImpl;
import disaster.loss.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
 * REST controller for managing {@link disaster.loss.domain.Crop}.
 */
@RestController
@RequestMapping("/api")
public class FacilityRegistryResource {

    private final Logger log = LoggerFactory.getLogger(FacilityRegistryResource.class);

    private static final String ENTITY_NAME = "crop";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CropService cropService;

    private final CropRepository cropRepository;

    @Autowired
    private FacilityRegistryServiceImpl facilityRegistryServiceImpl;

    public FacilityRegistryResource(CropService cropService, CropRepository cropRepository) {
        this.cropService = cropService;
        this.cropRepository = cropRepository;
    }

    /**
     * {@code POST  /facility-registry} : Create a new crop.
     *
     * @param crop the crop to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new crop, or with status {@code 400 (Bad Request)} if the crop has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facility-registry")
    public ResponseEntity<Crop> createCrop(@RequestBody Crop crop) throws URISyntaxException {
        log.debug("REST request to save Crop : {}", crop);
        if (crop.getCropId() != null) {
            throw new BadRequestAlertException("A new crop cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Crop result = cropService.save(crop);
        return ResponseEntity
            .created(new URI("/api/facility-registry/" + result.getCropId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getCropId()))
            .body(result);
    }

    /**
     * {@code PUT  /facility-registry/:cropId} : Updates an existing crop.
     *
     * @param cropId the id of the crop to save.
     * @param crop the crop to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crop,
     * or with status {@code 400 (Bad Request)} if the crop is not valid,
     * or with status {@code 500 (Internal Server Error)} if the crop couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facility-registry/{cropId}")
    public ResponseEntity<Crop> updateCrop(@PathVariable(value = "cropId", required = false) final String cropId, @RequestBody Crop crop)
        throws URISyntaxException {
        log.debug("REST request to update Crop : {}, {}", cropId, crop);
        if (crop.getCropId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(cropId, crop.getCropId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cropRepository.existsById(cropId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Crop result = cropService.save(crop);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, crop.getCropId()))
            .body(result);
    }

    /**
     * {@code PATCH  /facility-registry/:cropId} : Partial updates given fields of an existing crop, field will ignore if it is null
     *
     * @param cropId the id of the crop to save.
     * @param crop the crop to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crop,
     * or with status {@code 400 (Bad Request)} if the crop is not valid,
     * or with status {@code 404 (Not Found)} if the crop is not found,
     * or with status {@code 500 (Internal Server Error)} if the crop couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/facility-registry/{cropId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Crop> partialUpdateCrop(
        @PathVariable(value = "cropId", required = false) final String cropId,
        @RequestBody Crop crop
    ) throws URISyntaxException {
        log.debug("REST request to partial update Crop partially : {}, {}", cropId, crop);
        if (crop.getCropId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(cropId, crop.getCropId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cropRepository.existsById(cropId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Crop> result = cropService.partialUpdate(crop);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, crop.getCropId())
        );
    }

    /**
     * {@code GET  /facility-registry} : get all the crops.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crops in body.
     */
    @GetMapping("/facility-registry")
    public ResponseEntity<List<Crop>> getAllCrops(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Crops");
        Page<Crop> page = cropService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /facility-registry/disaster/:disasterId} : get crops for disaster.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crops in body.
     */
    @GetMapping("/facility-registry/disaster/{disasterId}")
    public ResponseEntity<List<Crop>> getCropsForDisaster(@PathVariable String disasterId, @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Crops");
        Page<Crop> page = cropService.findByDisasterId(disasterId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /facility-registry/:id} : get the "id" crop.
     *
     * @param id the id of the crop to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the crop, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facility-registry/{id}")
    public ResponseEntity<Crop> getCrop(@PathVariable String id) {
        log.debug("REST request to get Crop : {}", id);
        Optional<Crop> crop = cropService.findOne(id);
        return ResponseUtil.wrapOrNotFound(crop);
    }

    /**
     * {@code DELETE  /facility-registry/:id} : delete the "id" crop.
     *
     * @param id the id of the crop to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facility-registry/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable String id) {
        log.debug("REST request to delete Crop : {}", id);
        cropService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    /**
     * {@code GET  /facility-registry} : get all the crops.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crops in body.
     */
    @GetMapping("/facility-registry-all")
    public CountryDTO getAllFacilityRegistry() {
        log.debug("REST request to get a page of Crops");

        return facilityRegistryServiceImpl.getFacilityRegistry();
    }
}
