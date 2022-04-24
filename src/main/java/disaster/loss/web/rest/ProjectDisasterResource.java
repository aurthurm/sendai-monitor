package disaster.loss.web.rest;

import disaster.loss.domain.ProjectDisaster;
import disaster.loss.repository.ProjectDisasterRepository;
import disaster.loss.service.ProjectDisasterService;
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
 * REST controller for managing {@link disaster.loss.domain.ProjectDisaster}.
 */
@RestController
@RequestMapping("/api")
public class ProjectDisasterResource {

    private final Logger log = LoggerFactory.getLogger(ProjectDisasterResource.class);

    private static final String ENTITY_NAME = "projectDisaster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProjectDisasterService projectDisasterService;

    private final ProjectDisasterRepository projectDisasterRepository;

    public ProjectDisasterResource(ProjectDisasterService projectDisasterService, ProjectDisasterRepository projectDisasterRepository) {
        this.projectDisasterService = projectDisasterService;
        this.projectDisasterRepository = projectDisasterRepository;
    }

    /**
     * {@code POST  /project-disasters} : Create a new projectDisaster.
     *
     * @param projectDisaster the projectDisaster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new projectDisaster, or with status {@code 400 (Bad Request)} if the projectDisaster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/project-disasters")
    public ResponseEntity<ProjectDisaster> createProjectDisaster(@RequestBody ProjectDisaster projectDisaster) throws URISyntaxException {
        log.debug("REST request to save ProjectDisaster : {}", projectDisaster);
        if (projectDisaster.getProjectDisasterId() != null) {
            throw new BadRequestAlertException("A new projectDisaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProjectDisaster result = projectDisasterService.save(projectDisaster);
        return ResponseEntity
            .created(new URI("/api/project-disasters/" + result.getProjectDisasterId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getProjectDisasterId()))
            .body(result);
    }

    /**
     * {@code PUT  /project-disasters/:projectDisasterId} : Updates an existing projectDisaster.
     *
     * @param projectDisasterId the id of the projectDisaster to save.
     * @param projectDisaster the projectDisaster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectDisaster,
     * or with status {@code 400 (Bad Request)} if the projectDisaster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the projectDisaster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/project-disasters/{projectDisasterId}")
    public ResponseEntity<ProjectDisaster> updateProjectDisaster(
        @PathVariable(value = "projectDisasterId", required = false) final String projectDisasterId,
        @RequestBody ProjectDisaster projectDisaster
    ) throws URISyntaxException {
        log.debug("REST request to update ProjectDisaster : {}, {}", projectDisasterId, projectDisaster);
        if (projectDisaster.getProjectDisasterId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(projectDisasterId, projectDisaster.getProjectDisasterId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectDisasterRepository.existsById(projectDisasterId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ProjectDisaster result = projectDisasterService.save(projectDisaster);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectDisaster.getProjectDisasterId()))
            .body(result);
    }

    /**
     * {@code PATCH  /project-disasters/:projectDisasterId} : Partial updates given fields of an existing projectDisaster, field will ignore if it is null
     *
     * @param projectDisasterId the id of the projectDisaster to save.
     * @param projectDisaster the projectDisaster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated projectDisaster,
     * or with status {@code 400 (Bad Request)} if the projectDisaster is not valid,
     * or with status {@code 404 (Not Found)} if the projectDisaster is not found,
     * or with status {@code 500 (Internal Server Error)} if the projectDisaster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/project-disasters/{projectDisasterId}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ProjectDisaster> partialUpdateProjectDisaster(
        @PathVariable(value = "projectDisasterId", required = false) final String projectDisasterId,
        @RequestBody ProjectDisaster projectDisaster
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProjectDisaster partially : {}, {}", projectDisasterId, projectDisaster);
        if (projectDisaster.getProjectDisasterId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(projectDisasterId, projectDisaster.getProjectDisasterId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!projectDisasterRepository.existsById(projectDisasterId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ProjectDisaster> result = projectDisasterService.partialUpdate(projectDisaster);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, projectDisaster.getProjectDisasterId())
        );
    }

    /**
     * {@code GET  /project-disasters} : get all the projectDisasters.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of projectDisasters in body.
     */
    @GetMapping("/project-disasters")
    public ResponseEntity<List<ProjectDisaster>> getAllProjectDisasters(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of ProjectDisasters");
        Page<ProjectDisaster> page = projectDisasterService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /project-disasters/:id} : get the "id" projectDisaster.
     *
     * @param id the id of the projectDisaster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the projectDisaster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/project-disasters/{id}")
    public ResponseEntity<ProjectDisaster> getProjectDisaster(@PathVariable String id) {
        log.debug("REST request to get ProjectDisaster : {}", id);
        Optional<ProjectDisaster> projectDisaster = projectDisasterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(projectDisaster);
    }

    /**
     * {@code DELETE  /project-disasters/:id} : delete the "id" projectDisaster.
     *
     * @param id the id of the projectDisaster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/project-disasters/{id}")
    public ResponseEntity<Void> deleteProjectDisaster(@PathVariable String id) {
        log.debug("REST request to delete ProjectDisaster : {}", id);
        projectDisasterService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
