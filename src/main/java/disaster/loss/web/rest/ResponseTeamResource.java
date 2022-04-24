package disaster.loss.web.rest;

import disaster.loss.domain.ResponseTeam;
import disaster.loss.repository.ResponseTeamRepository;
import disaster.loss.service.ResponseTeamService;
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
 * REST controller for managing {@link disaster.loss.domain.ResponseTeam}.
 */
@RestController
@RequestMapping("/api")
public class ResponseTeamResource {

    private final Logger log = LoggerFactory.getLogger(ResponseTeamResource.class);

    private static final String ENTITY_NAME = "responseTeam";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ResponseTeamService responseTeamService;

    private final ResponseTeamRepository responseTeamRepository;

    public ResponseTeamResource(ResponseTeamService responseTeamService, ResponseTeamRepository responseTeamRepository) {
        this.responseTeamService = responseTeamService;
        this.responseTeamRepository = responseTeamRepository;
    }

    /**
     * {@code POST  /response-teams} : Create a new responseTeam.
     *
     * @param responseTeam the responseTeam to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new responseTeam, or with status {@code 400 (Bad Request)} if the responseTeam has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/response-teams")
    public ResponseEntity<ResponseTeam> createResponseTeam(@RequestBody ResponseTeam responseTeam) throws URISyntaxException {
        log.debug("REST request to save ResponseTeam : {}", responseTeam);
        if (responseTeam.getResponseTeamId() != null) {
            throw new BadRequestAlertException("A new responseTeam cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ResponseTeam result = responseTeamService.save(responseTeam);
        return ResponseEntity
            .created(new URI("/api/response-teams/" + result.getResponseTeamId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getResponseTeamId()))
            .body(result);
    }

    /**
     * {@code PUT  /response-teams/:responseTeamId} : Updates an existing responseTeam.
     *
     * @param responseTeamId the id of the responseTeam to save.
     * @param responseTeam the responseTeam to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated responseTeam,
     * or with status {@code 400 (Bad Request)} if the responseTeam is not valid,
     * or with status {@code 500 (Internal Server Error)} if the responseTeam couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/response-teams/{responseTeamId}")
    public ResponseEntity<ResponseTeam> updateResponseTeam(
        @PathVariable(value = "responseTeamId", required = false) final String responseTeamId,
        @RequestBody ResponseTeam responseTeam
    ) throws URISyntaxException {
        log.debug("REST request to update ResponseTeam : {}, {}", responseTeamId, responseTeam);
        if (responseTeam.getResponseTeamId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(responseTeamId, responseTeam.getResponseTeamId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!responseTeamRepository.existsById(responseTeamId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ResponseTeam result = responseTeamService.save(responseTeam);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, responseTeam.getResponseTeamId()))
            .body(result);
    }

    /**
     * {@code PATCH  /response-teams/:responseTeamId} : Partial updates given fields of an existing responseTeam, field will ignore if it is null
     *
     * @param responseTeamId the id of the responseTeam to save.
     * @param responseTeam the responseTeam to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated responseTeam,
     * or with status {@code 400 (Bad Request)} if the responseTeam is not valid,
     * or with status {@code 404 (Not Found)} if the responseTeam is not found,
     * or with status {@code 500 (Internal Server Error)} if the responseTeam couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/response-teams/{responseTeamId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ResponseTeam> partialUpdateResponseTeam(
        @PathVariable(value = "responseTeamId", required = false) final String responseTeamId,
        @RequestBody ResponseTeam responseTeam
    ) throws URISyntaxException {
        log.debug("REST request to partial update ResponseTeam partially : {}, {}", responseTeamId, responseTeam);
        if (responseTeam.getResponseTeamId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(responseTeamId, responseTeam.getResponseTeamId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!responseTeamRepository.existsById(responseTeamId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ResponseTeam> result = responseTeamService.partialUpdate(responseTeam);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, responseTeam.getResponseTeamId())
        );
    }

    /**
     * {@code GET  /response-teams} : get all the responseTeams.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of responseTeams in body.
     */
    @GetMapping("/response-teams")
    public ResponseEntity<List<ResponseTeam>> getAllResponseTeams(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ResponseTeams");
        Page<ResponseTeam> page = responseTeamService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /response-teams/:id} : get the "id" responseTeam.
     *
     * @param id the id of the responseTeam to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the responseTeam, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/response-teams/{id}")
    public ResponseEntity<ResponseTeam> getResponseTeam(@PathVariable String id) {
        log.debug("REST request to get ResponseTeam : {}", id);
        Optional<ResponseTeam> responseTeam = responseTeamService.findOne(id);
        return ResponseUtil.wrapOrNotFound(responseTeam);
    }

    /**
     * {@code DELETE  /response-teams/:id} : delete the "id" responseTeam.
     *
     * @param id the id of the responseTeam to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/response-teams/{id}")
    public ResponseEntity<Void> deleteResponseTeam(@PathVariable String id) {
        log.debug("REST request to delete ResponseTeam : {}", id);
        responseTeamService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
