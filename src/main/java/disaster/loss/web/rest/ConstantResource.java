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

import disaster.loss.domain.Constant;
import disaster.loss.domain.Crop;
import disaster.loss.repository.ConstantRepository;
import disaster.loss.service.ConstantService;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.Crop}.
 */
@RestController
@RequestMapping("/api")
public class ConstantResource {

    private final Logger log = LoggerFactory.getLogger(ConstantResource.class);

    private static final String ENTITY_NAME = "crop";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ConstantService constantService;

    private final ConstantRepository constantRepository;

    public ConstantResource(ConstantService constantService, ConstantRepository constantRepository) {
        this.constantService = constantService;
        this.constantRepository = constantRepository;
    }

    /**
     * {@code POST  /crops} : Create a new crop.
     *
     * @param constant the crop to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new crop, or with status {@code 400 (Bad Request)} if the crop has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/constants")
    public ResponseEntity<Constant> createCrop(@RequestBody Constant constant) throws URISyntaxException {
        log.debug("REST request to save constant : {}", constant);
        if (constant.getConstantId() != null) {
            throw new BadRequestAlertException("A new constant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Constant result = constantService.save(constant);
        return ResponseEntity
            .created(new URI("/api/crops/" + result.getConstantId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getConstantId()))
            .body(result);
    }

    /**
     * {@code PUT  /crops/:cropId} : Updates an existing crop.
     *
     * @param cropId the id of the crop to save.
     * @param constant the crop to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crop,
     * or with status {@code 400 (Bad Request)} if the crop is not valid,
     * or with status {@code 500 (Internal Server Error)} if the crop couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/constants/{cropId}")
    public ResponseEntity<Constant> updateCrop(@PathVariable(value = "cropId", required = false) final String cropId, @RequestBody Constant constant)
        throws URISyntaxException {
        log.debug("REST request to update getConstantId : {}, {}", cropId, constant);
        if (constant.getConstantId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(cropId, constant.getConstantId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!constantRepository.existsById(cropId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Constant result = constantService.save(constant);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, constant.getConstantId()))
            .body(result);
    }

    /**
     * {@code PATCH  /crops/:cropId} : Partial updates given fields of an existing crop, field will ignore if it is null
     *
     * @param constantId the id of the crop to save.
     * @param constant the crop to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated crop,
     * or with status {@code 400 (Bad Request)} if the crop is not valid,
     * or with status {@code 404 (Not Found)} if the crop is not found,
     * or with status {@code 500 (Internal Server Error)} if the crop couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/constant/{constantId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Constant> partialUpdateCrop(
        @PathVariable(value = "cropId", required = false) final String constantId,
        @RequestBody Constant constant
    ) throws URISyntaxException {
        log.debug("REST request to partial update Crop partially : {}, {}", constantId, constant);
        if (constant.getConstantId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(constantId, constant.getConstantId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!constantRepository.existsById(constantId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Constant> result = constantService.partialUpdate(constant);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, constant.getConstantId())
        );
    }

    /**
     * {@code GET  /crops} : get all the crops.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of crops in body.
     */
    @GetMapping("/constants")
    public ResponseEntity<List<Constant>> getAllCrops(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Constants");
        Page<Constant> page = constantService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /crops/:id} : get the "id" crop.
     *
     * @param id the id of the crop to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the crop, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/constant/{id}")
    public ResponseEntity<Constant> getCrop(@PathVariable String id) {
        log.debug("REST request to get Constant : {}", id);
        Optional<Constant> constant = constantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(constant);
    }

    /**
     * {@code DELETE  /crops/:id} : delete the "id" crop.
     *
     * @param id the id of the crop to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/constants/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable String id) {
        log.debug("REST request to delete Constant : {}", id);
        constantService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
