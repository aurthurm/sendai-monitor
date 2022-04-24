package disaster.loss.web.rest;

import disaster.loss.domain.DevelopmentPartner;
import disaster.loss.repository.DevelopmentPartnerRepository;
import disaster.loss.service.DevelopmentPartnerService;
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
 * REST controller for managing {@link disaster.loss.domain.DevelopmentPartner}.
 */
@RestController
@RequestMapping("/api")
public class DevelopmentPartnerResource {

    private final Logger log = LoggerFactory.getLogger(DevelopmentPartnerResource.class);

    private static final String ENTITY_NAME = "developmentPartner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DevelopmentPartnerService developmentPartnerService;

    private final DevelopmentPartnerRepository developmentPartnerRepository;

    public DevelopmentPartnerResource(
        DevelopmentPartnerService developmentPartnerService,
        DevelopmentPartnerRepository developmentPartnerRepository
    ) {
        this.developmentPartnerService = developmentPartnerService;
        this.developmentPartnerRepository = developmentPartnerRepository;
    }

    /**
     * {@code POST  /development-partners} : Create a new developmentPartner.
     *
     * @param developmentPartner the developmentPartner to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new developmentPartner, or with status {@code 400 (Bad Request)} if the developmentPartner has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/development-partners")
    public ResponseEntity<DevelopmentPartner> createDevelopmentPartner(@RequestBody DevelopmentPartner developmentPartner)
        throws URISyntaxException {
        log.debug("REST request to save DevelopmentPartner : {}", developmentPartner);
        if (developmentPartner.getPartnerId() != null) {
            throw new BadRequestAlertException("A new developmentPartner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DevelopmentPartner result = developmentPartnerService.save(developmentPartner);
        return ResponseEntity
            .created(new URI("/api/development-partners/" + result.getPartnerId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getPartnerId()))
            .body(result);
    }

    /**
     * {@code PUT  /development-partners/:partnerId} : Updates an existing developmentPartner.
     *
     * @param partnerId the id of the developmentPartner to save.
     * @param developmentPartner the developmentPartner to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated developmentPartner,
     * or with status {@code 400 (Bad Request)} if the developmentPartner is not valid,
     * or with status {@code 500 (Internal Server Error)} if the developmentPartner couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/development-partners/{partnerId}")
    public ResponseEntity<DevelopmentPartner> updateDevelopmentPartner(
        @PathVariable(value = "partnerId", required = false) final String partnerId,
        @RequestBody DevelopmentPartner developmentPartner
    ) throws URISyntaxException {
        log.debug("REST request to update DevelopmentPartner : {}, {}", partnerId, developmentPartner);
        if (developmentPartner.getPartnerId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(partnerId, developmentPartner.getPartnerId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!developmentPartnerRepository.existsById(partnerId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DevelopmentPartner result = developmentPartnerService.save(developmentPartner);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, developmentPartner.getPartnerId()))
            .body(result);
    }

    /**
     * {@code PATCH  /development-partners/:partnerId} : Partial updates given fields of an existing developmentPartner, field will ignore if it is null
     *
     * @param partnerId the id of the developmentPartner to save.
     * @param developmentPartner the developmentPartner to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated developmentPartner,
     * or with status {@code 400 (Bad Request)} if the developmentPartner is not valid,
     * or with status {@code 404 (Not Found)} if the developmentPartner is not found,
     * or with status {@code 500 (Internal Server Error)} if the developmentPartner couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/development-partners/{partnerId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DevelopmentPartner> partialUpdateDevelopmentPartner(
        @PathVariable(value = "partnerId", required = false) final String partnerId,
        @RequestBody DevelopmentPartner developmentPartner
    ) throws URISyntaxException {
        log.debug("REST request to partial update DevelopmentPartner partially : {}, {}", partnerId, developmentPartner);
        if (developmentPartner.getPartnerId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(partnerId, developmentPartner.getPartnerId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!developmentPartnerRepository.existsById(partnerId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DevelopmentPartner> result = developmentPartnerService.partialUpdate(developmentPartner);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, developmentPartner.getPartnerId())
        );
    }

    /**
     * {@code GET  /development-partners} : get all the developmentPartners.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of developmentPartners in body.
     */
    @GetMapping("/development-partners")
    public ResponseEntity<List<DevelopmentPartner>> getAllDevelopmentPartners(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of DevelopmentPartners");
        Page<DevelopmentPartner> page = developmentPartnerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /development-partners/:id} : get the "id" developmentPartner.
     *
     * @param id the id of the developmentPartner to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the developmentPartner, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/development-partners/{id}")
    public ResponseEntity<DevelopmentPartner> getDevelopmentPartner(@PathVariable String id) {
        log.debug("REST request to get DevelopmentPartner : {}", id);
        Optional<DevelopmentPartner> developmentPartner = developmentPartnerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(developmentPartner);
    }

    /**
     * {@code DELETE  /development-partners/:id} : delete the "id" developmentPartner.
     *
     * @param id the id of the developmentPartner to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/development-partners/{id}")
    public ResponseEntity<Void> deleteDevelopmentPartner(@PathVariable String id) {
        log.debug("REST request to delete DevelopmentPartner : {}", id);
        developmentPartnerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
