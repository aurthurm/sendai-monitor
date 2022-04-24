package disaster.loss.web.rest;

import disaster.loss.domain.LiveStockType;
import disaster.loss.repository.LiveStockTypeRepository;
import disaster.loss.service.LiveStockTypeService;
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
 * REST controller for managing {@link disaster.loss.domain.LiveStockType}.
 */
@RestController
@RequestMapping("/api")
public class LiveStockTypeResource {

    private final Logger log = LoggerFactory.getLogger(LiveStockTypeResource.class);

    private static final String ENTITY_NAME = "liveStockType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LiveStockTypeService liveStockTypeService;

    private final LiveStockTypeRepository liveStockTypeRepository;

    public LiveStockTypeResource(LiveStockTypeService liveStockTypeService, LiveStockTypeRepository liveStockTypeRepository) {
        this.liveStockTypeService = liveStockTypeService;
        this.liveStockTypeRepository = liveStockTypeRepository;
    }

    /**
     * {@code POST  /live-stock-types} : Create a new liveStockType.
     *
     * @param liveStockType the liveStockType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new liveStockType, or with status {@code 400 (Bad Request)} if the liveStockType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/live-stock-types")
    public ResponseEntity<LiveStockType> createLiveStockType(@RequestBody LiveStockType liveStockType) throws URISyntaxException {
        log.debug("REST request to save LiveStockType : {}", liveStockType);
        if (liveStockType.getLiveStockTypeId() != null) {
            throw new BadRequestAlertException("A new liveStockType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LiveStockType result = liveStockTypeService.save(liveStockType);
        return ResponseEntity
            .created(new URI("/api/live-stock-types/" + result.getLiveStockTypeId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getLiveStockTypeId()))
            .body(result);
    }

    /**
     * {@code PUT  /live-stock-types/:liveStockTypeId} : Updates an existing liveStockType.
     *
     * @param liveStockTypeId the id of the liveStockType to save.
     * @param liveStockType the liveStockType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated liveStockType,
     * or with status {@code 400 (Bad Request)} if the liveStockType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the liveStockType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/live-stock-types/{liveStockTypeId}")
    public ResponseEntity<LiveStockType> updateLiveStockType(
        @PathVariable(value = "liveStockTypeId", required = false) final String liveStockTypeId,
        @RequestBody LiveStockType liveStockType
    ) throws URISyntaxException {
        log.debug("REST request to update LiveStockType : {}, {}", liveStockTypeId, liveStockType);
        if (liveStockType.getLiveStockTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(liveStockTypeId, liveStockType.getLiveStockTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!liveStockTypeRepository.existsById(liveStockTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        LiveStockType result = liveStockTypeService.save(liveStockType);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, liveStockType.getLiveStockTypeId()))
            .body(result);
    }

    /**
     * {@code PATCH  /live-stock-types/:liveStockTypeId} : Partial updates given fields of an existing liveStockType, field will ignore if it is null
     *
     * @param liveStockTypeId the id of the liveStockType to save.
     * @param liveStockType the liveStockType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated liveStockType,
     * or with status {@code 400 (Bad Request)} if the liveStockType is not valid,
     * or with status {@code 404 (Not Found)} if the liveStockType is not found,
     * or with status {@code 500 (Internal Server Error)} if the liveStockType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/live-stock-types/{liveStockTypeId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LiveStockType> partialUpdateLiveStockType(
        @PathVariable(value = "liveStockTypeId", required = false) final String liveStockTypeId,
        @RequestBody LiveStockType liveStockType
    ) throws URISyntaxException {
        log.debug("REST request to partial update LiveStockType partially : {}, {}", liveStockTypeId, liveStockType);
        if (liveStockType.getLiveStockTypeId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(liveStockTypeId, liveStockType.getLiveStockTypeId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!liveStockTypeRepository.existsById(liveStockTypeId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LiveStockType> result = liveStockTypeService.partialUpdate(liveStockType);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, liveStockType.getLiveStockTypeId())
        );
    }

    /**
     * {@code GET  /live-stock-types} : get all the liveStockTypes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of liveStockTypes in body.
     */
    @GetMapping("/live-stock-types")
    public ResponseEntity<List<LiveStockType>> getAllLiveStockTypes(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of LiveStockTypes");
        Page<LiveStockType> page = liveStockTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /live-stock-types/:id} : get the "id" liveStockType.
     *
     * @param id the id of the liveStockType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the liveStockType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/live-stock-types/{id}")
    public ResponseEntity<LiveStockType> getLiveStockType(@PathVariable String id) {
        log.debug("REST request to get LiveStockType : {}", id);
        Optional<LiveStockType> liveStockType = liveStockTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(liveStockType);
    }

    /**
     * {@code DELETE  /live-stock-types/:id} : delete the "id" liveStockType.
     *
     * @param id the id of the liveStockType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/live-stock-types/{id}")
    public ResponseEntity<Void> deleteLiveStockType(@PathVariable String id) {
        log.debug("REST request to delete LiveStockType : {}", id);
        liveStockTypeService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
