package disaster.loss.web.rest;

import disaster.loss.domain.Casualty;
import disaster.loss.repository.CasualtyRepository;
import disaster.loss.service.CasualtyService;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.Casualty}.
 */
@RestController
@RequestMapping("/api")
public class CasualtyResource {

    private final Logger log = LoggerFactory.getLogger(CasualtyResource.class);

    private static final String ENTITY_NAME = "casualty";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CasualtyService casualtyService;

    private final CasualtyRepository casualtyRepository;

    public CasualtyResource(CasualtyService casualtyService, CasualtyRepository casualtyRepository) {
        this.casualtyService = casualtyService;
        this.casualtyRepository = casualtyRepository;
    }

    /**
     * {@code POST  /casualties} : Create a new casualty.
     *
     * @param casualty the casualty to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new casualty, or with status {@code 400 (Bad Request)} if the casualty has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/casualties")
    public ResponseEntity<Casualty> createCasualty(@RequestBody Casualty casualty) throws URISyntaxException {
        log.debug("REST request to save Casualty : {}", casualty);
        if (casualty.getCasualtyId() != null) {
            throw new BadRequestAlertException("A new casualty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Casualty result = casualtyService.save(casualty);
        return ResponseEntity
            .created(new URI("/api/casualties/" + result.getCasualtyId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getCasualtyId()))
            .body(result);
    }

    /**
     * {@code PUT  /casualties/:casualtyId} : Updates an existing casualty.
     *
     * @param casualtyId the id of the casualty to save.
     * @param casualty the casualty to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated casualty,
     * or with status {@code 400 (Bad Request)} if the casualty is not valid,
     * or with status {@code 500 (Internal Server Error)} if the casualty couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/casualties/{casualtyId}")
    public ResponseEntity<Casualty> updateCasualty(
        @PathVariable(value = "casualtyId", required = false) final String casualtyId,
        @RequestBody Casualty casualty
    ) throws URISyntaxException {
        log.debug("REST request to update Casualty : {}, {}", casualtyId, casualty);
        if (casualty.getCasualtyId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(casualtyId, casualty.getCasualtyId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!casualtyRepository.existsById(casualtyId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Casualty result = casualtyService.save(casualty);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, casualty.getCasualtyId()))
            .body(result);
    }

    /**
     * {@code PATCH  /casualties/:casualtyId} : Partial updates given fields of an existing casualty, field will ignore if it is null
     *
     * @param casualtyId the id of the casualty to save.
     * @param casualty the casualty to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated casualty,
     * or with status {@code 400 (Bad Request)} if the casualty is not valid,
     * or with status {@code 404 (Not Found)} if the casualty is not found,
     * or with status {@code 500 (Internal Server Error)} if the casualty couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/casualties/{casualtyId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Casualty> partialUpdateCasualty(
        @PathVariable(value = "casualtyId", required = false) final String casualtyId,
        @RequestBody Casualty casualty
    ) throws URISyntaxException {
        log.debug("REST request to partial update Casualty partially : {}, {}", casualtyId, casualty);
        if (casualty.getCasualtyId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(casualtyId, casualty.getCasualtyId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!casualtyRepository.existsById(casualtyId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Casualty> result = casualtyService.partialUpdate(casualty);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, casualty.getCasualtyId())
        );
    }

    /**
     * {@code GET  /casualties} : get all the casualties.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of casualties in body.
     */
    @GetMapping("/casualties")
    public ResponseEntity<List<Casualty>> getAllCasualties(
    		@org.springdoc.api.annotations.ParameterObject Pageable pageable,
    		@RequestParam String disasterId
    		) {
        log.debug("REST request to get a page of Casualties for disaster: {}", disasterId);
        Page<Casualty> page = casualtyService.findAllForDisaster(pageable, disasterId);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /casualties/:id} : get the "id" casualty.
     *
     * @param id the id of the casualty to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the casualty, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/casualties/{id}")
    public ResponseEntity<Casualty> getCasualty(@PathVariable String id) {
        log.debug("REST request to get Casualty : {}", id);
        Optional<Casualty> casualty = casualtyService.findOne(id);
        return ResponseUtil.wrapOrNotFound(casualty);
    }

    /**
     * {@code DELETE  /casualties/:id} : delete the "id" casualty.
     *
     * @param id the id of the casualty to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/casualties/{id}")
    public ResponseEntity<Void> deleteCasualty(@PathVariable String id) {
        log.debug("REST request to delete Casualty : {}", id);
        casualtyService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    /**
     * {@code POST  /casualties/upload-csv/{disasterId} : upload csv casualties to disaster.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list.
     *
     */
    @PostMapping("/casualties/upload-csv/{disasterId}")
    public ResponseEntity<List<Casualty>> uploadCasualtiesCSV(@RequestParam("file") MultipartFile csvFile, @PathVariable String disasterId) {
        log.debug("REST request upload results by csv");
        List<Casualty> page = casualtyService.uploadCSVCauslties(csvFile, disasterId);
        return ResponseEntity.ok().body(page);
    }
}
