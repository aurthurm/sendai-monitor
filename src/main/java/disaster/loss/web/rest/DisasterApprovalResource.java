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

import disaster.loss.domain.DisasterApproval;
import disaster.loss.repository.DisasterApprovalRepository;
import disaster.loss.service.DisasterApprovalService;
import disaster.loss.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.DisasterApproval}.
 */
@RestController
@RequestMapping("/api/disasterApprovals")
public class DisasterApprovalResource {

    private final Logger log = LoggerFactory.getLogger(DisasterApprovalResource.class);

    private static final String ENTITY_NAME = "disasterApproval";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DisasterApprovalService disasterApprovalService;

    private final DisasterApprovalRepository disasterApprovalRepository;

    public DisasterApprovalResource(DisasterApprovalService disasterApprovalService, DisasterApprovalRepository disasterApprovalRepository) {
        this.disasterApprovalService = disasterApprovalService;
        this.disasterApprovalRepository = disasterApprovalRepository;
    }

    /**
     * {@code POST  /} : Create a new disasterApproval.
     *
     * @param disasterApproval the disasterApproval to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new disasterApproval, or with status {@code 400 (Bad Request)} if the disasterApproval has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/")
    public ResponseEntity<DisasterApproval> approveDisaster(@RequestBody DisasterApproval disasterApproval) throws URISyntaxException {
        log.debug("REST request to save DisasterApproval : {}", disasterApproval);
        if (disasterApproval.getDisasterApprovalId() != null) {
            throw new BadRequestAlertException("A new disasterApproval cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DisasterApproval result = disasterApprovalService.save(disasterApproval);
        return ResponseEntity
            .created(new URI("/api/disasterApprovals/" + result.getDisasterApprovalId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getDisasterApprovalId()))
            .body(result);
    }

    /**
     * {@code PUT  /:approvalId} : Updates an existing disasterApproval.
     *
     * @param approvalId the id of the disasterApproval to save.
     * @param disasterApproval the disasterApproval to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated disasterApproval,
     * or with status {@code 400 (Bad Request)} if the disasterApproval is not valid,
     * or with status {@code 500 (Internal Server Error)} if the disasterApproval couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{approvalId}")
    public ResponseEntity<DisasterApproval> updateApproval(@PathVariable(value = "approvalId", required = false) final String approvalId, @RequestBody DisasterApproval disasterApproval)
        throws URISyntaxException {
        log.debug("REST request to update DisasterApproval : {}, {}", approvalId, disasterApproval);
        if (disasterApproval.getDisasterApprovalId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(approvalId, disasterApproval.getDisasterApprovalId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!disasterApprovalRepository.existsById(approvalId)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DisasterApproval result = disasterApprovalService.save(disasterApproval);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disasterApproval.getDisasterApprovalId()))
            .body(result);
    }


    /**
     * {@code GET  /for-disaster/:disasterId} : get disasterApprovals for disaster.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of disasterApprovals in body.
     */
    @GetMapping("/for-disaster/{disasterId}")
    public ResponseEntity<List<DisasterApproval>> getApprovalsForDisaster(@PathVariable String disasterId, @org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Approvals");
        Page<DisasterApproval> page = disasterApprovalService.findByDisasterId(disasterId, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
