package disaster.loss.web.rest;

import disaster.loss.domain.District;
import disaster.loss.domain.Ward;
import disaster.loss.repository.WardRepository;
import disaster.loss.service.WardService;
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
 * REST controller for managing {@link disaster.loss.domain.Ward}.
 */
@RestController
@RequestMapping("/api")
public class WardResource {

    private final Logger log = LoggerFactory.getLogger(WardResource.class);

    private static final String ENTITY_NAME = "ward";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WardService wardService;

    private final WardRepository wardRepository;

    public WardResource(WardService wardService, WardRepository wardRepository) {
        this.wardService = wardService;
        this.wardRepository = wardRepository;
    }

    /**
     * {@code POST  /wards} : Create a new ward.
     *
     * @param ward the ward to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ward, or with status {@code 400 (Bad Request)} if the ward has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/wards")
    public ResponseEntity<Ward> createWard(@RequestBody Ward ward) throws URISyntaxException {
        log.debug("REST request to save Ward : {}", ward);
        if (ward.getWardId() != null) {
            throw new BadRequestAlertException("A new ward cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ward result = wardService.save(ward);
        return ResponseEntity
            .created(new URI("/api/wards/" + result.getWardId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getWardId()))
            .body(result);
    }

    /**
     * {@code PUT  /wards/:wardId} : Updates an existing ward.
     *
     * @param wardId the id of the ward to save.
     * @param ward the ward to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ward,
     * or with status {@code 400 (Bad Request)} if the ward is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ward couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/wards/{wardId}")
    public ResponseEntity<Ward> updateWard(@PathVariable(value = "wardId", required = false) final String wardId, @RequestBody Ward ward)
        throws URISyntaxException {
        log.debug("REST request to update Ward : {}, {}", wardId, ward);
        if (ward.getWardId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(wardId, ward.getWardId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wardRepository.existsById(wardId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Ward result = wardService.save(ward);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ward.getWardId()))
            .body(result);
    }

    /**
     * {@code PATCH  /wards/:wardId} : Partial updates given fields of an existing ward, field will ignore if it is null
     *
     * @param wardId the id of the ward to save.
     * @param ward the ward to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ward,
     * or with status {@code 400 (Bad Request)} if the ward is not valid,
     * or with status {@code 404 (Not Found)} if the ward is not found,
     * or with status {@code 500 (Internal Server Error)} if the ward couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/wards/{wardId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Ward> partialUpdateWard(
        @PathVariable(value = "wardId", required = false) final String wardId,
        @RequestBody Ward ward
    ) throws URISyntaxException {
        log.debug("REST request to partial update Ward partially : {}, {}", wardId, ward);
        if (ward.getWardId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(wardId, ward.getWardId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wardRepository.existsById(wardId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Ward> result = wardService.partialUpdate(ward);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ward.getWardId())
        );
    }

    /**
     * {@code GET  /wards} : get all the wards.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wards in body.
     */
    @GetMapping("/wards")
    public ResponseEntity<List<Ward>> getAllWards(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Wards");
        Page<Ward> page = wardService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * {@code GET  /districts} : get all the wards by district.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wards in body.
     */
    @GetMapping("/wards/district/{districtId}")
    public ResponseEntity<List<Ward>> getAllDistrictsByProvinceId(@PathVariable String districtId, @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Districts");
        Page<Ward> page = wardRepository.findByDistrictId(districtId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /wards/:id} : get the "id" ward.
     *
     * @param id the id of the ward to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ward, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/wards/{id}")
    public ResponseEntity<Ward> getWard(@PathVariable String id) {
        log.debug("REST request to get Ward : {}", id);
        Optional<Ward> ward = wardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ward);
    }

    /**
     * {@code DELETE  /wards/:id} : delete the "id" ward.
     *
     * @param id the id of the ward to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/wards/{id}")
    public ResponseEntity<Void> deleteWard(@PathVariable String id) {
        log.debug("REST request to delete Ward : {}", id);
        wardService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
