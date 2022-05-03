package disaster.loss.web.rest;

import disaster.loss.domain.Disaster;
import disaster.loss.repository.DisasterRepository;
import disaster.loss.repository.interfaces.ICountGroupBy;
import disaster.loss.service.DisasterService;
import disaster.loss.service.dto.DisasterSimpleCountDTO;
import disaster.loss.service.dto.IDisasterApprovalDTO;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.Disaster}.
 */
@RestController
@RequestMapping("/api")
public class DisasterResource {

    private final Logger log = LoggerFactory.getLogger(DisasterResource.class);

    private static final String ENTITY_NAME = "disaster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DisasterService disasterService;

    private final DisasterRepository disasterRepository;

    public DisasterResource(DisasterService disasterService, DisasterRepository disasterRepository) {
        this.disasterService = disasterService;
        this.disasterRepository = disasterRepository;
    }

    /**
     * {@code POST  /disasters} : Create a new disaster.
     *
     * @param disaster the disaster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new disaster, or with status {@code 400 (Bad Request)} if the disaster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/disasters")
    public ResponseEntity<Disaster> createDisaster(@RequestBody Disaster disaster) throws URISyntaxException {
        log.debug("REST request to save Disaster : {}", disaster);
        if (disaster.getDisasterId() != null) {
            throw new BadRequestAlertException("A new disaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Disaster result = disasterService.save(disaster);
        return ResponseEntity
            .created(new URI("/api/disasters/" + result.getDisasterId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getDisasterId()))
            .body(result);
    }

    /**
     * {@code PUT  /disasters/:disasterId} : Updates an existing disaster.
     *
     * @param disasterId the id of the disaster to save.
     * @param disaster the disaster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disaster,
     * or with status {@code 400 (Bad Request)} if the disaster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the disaster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/disasters/{disasterId}")
    public ResponseEntity<Disaster> updateDisaster(
        @PathVariable(value = "disasterId", required = false) final String disasterId,
        @RequestBody Disaster disaster
    ) throws URISyntaxException {
        log.debug("REST request to update Disaster : {}, {}", disasterId, disaster);
        if (disaster.getDisasterId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(disasterId, disaster.getDisasterId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disasterRepository.existsById(disasterId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Disaster result = disasterService.save(disaster);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disaster.getDisasterId()))
            .body(result);
    }

    /**
     * {@code PATCH  /disasters/:disasterId} : Partial updates given fields of an existing disaster, field will ignore if it is null
     *
     * @param disasterId the id of the disaster to save.
     * @param disaster the disaster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disaster,
     * or with status {@code 400 (Bad Request)} if the disaster is not valid,
     * or with status {@code 404 (Not Found)} if the disaster is not found,
     * or with status {@code 500 (Internal Server Error)} if the disaster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/disasters/{disasterId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Disaster> partialUpdateDisaster(
        @PathVariable(value = "disasterId", required = false) final String disasterId,
        @RequestBody Disaster disaster
    ) throws URISyntaxException {
        log.debug("REST request to partial update Disaster partially : {}, {}", disasterId, disaster);
        if (disaster.getDisasterId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(disasterId, disaster.getDisasterId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disasterRepository.existsById(disasterId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Disaster> result = disasterService.partialUpdate(disaster);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disaster.getDisasterId())
        );
    }

    /**
     * {@code GET  /disasters} : get all the disasters.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of disasters in body.
     */
    @GetMapping("/disasters")
    public ResponseEntity<List<Disaster>> getAllDisasters(
        @RequestParam (required = false) String filterBy,
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        Page<Disaster> page = disasterService.findAll(filterBy, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /disasters/:id} : get the "id" disaster.
     *
     * @param id the id of the disaster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the disaster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/disasters/{id}")
    public ResponseEntity<Disaster> getDisaster(@PathVariable String id) {
        log.debug("REST request to get Disaster : {}", id);
        Optional<Disaster> disaster = disasterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(disaster);
    }

    /**
     * {@code DELETE  /disasters/:id} : delete the "id" disaster.
     *
     * @param id the id of the disaster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/disasters/{id}")
    public ResponseEntity<Void> deleteDisaster(@PathVariable String id) {
        log.debug("REST request to delete Disaster : {}", id);
        disasterService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }

    /**
     * {@code GET  /disasters/search} : get all the disaster by search text.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of worksheets in body.
     */
    @GetMapping("/disasters/search")
    public ResponseEntity<List<Disaster>> getAllWorksheetsSearch(Pageable pageable, String text) {
        log.debug("REST request to get a filtered page of worksheets");
        Page<Disaster> page = disasterService.search(text, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /disasters/statistics/simple-counts} : simple disaster counts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)}
     */
    @GetMapping("/disasters/statistics/simple-counts")
    public ResponseEntity<DisasterSimpleCountDTO> simpleCounts() {
        log.debug("get disaster aggregates counts group by disaster category");
        DisasterSimpleCountDTO counts = disasterService.simpleCounts();
        return ResponseEntity.ok().body(counts);
    }

    /**
     * {@code GET  /disasters/statistics/count-group-by-category} : group by disaster category aggregates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)}
     */
    @GetMapping("/disasters/statistics/count-group-by-category")
    public ResponseEntity<List<ICountGroupBy>> groupByDisasterCategory() {
        log.debug("get disaster aggregates counts group by disaster category");
        List<ICountGroupBy> page = disasterService.groupByDisasterCategory();
        return ResponseEntity.ok().body(page);
    }

    /**
     * {@code GET  /disasters/statistics/count-group-by-type} : group by disaster category aggregates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)}
     */
    @GetMapping("/disasters/statistics/count-group-by-type")
    public ResponseEntity<List<ICountGroupBy>> groupByDisasterType() {
        log.debug("get disaster aggregates counts group by disaster category");
        List<ICountGroupBy> page = disasterService.groupByDisasterType();
        return ResponseEntity.ok().body(page);
    }

   
}
