package disaster.loss.web.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import disaster.loss.domain.RequiredDisasterIntervention;
import disaster.loss.repository.RequiredDisasterInterventionRepository;

import tech.jhipster.web.util.HeaderUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.RequiredDisasterIntervention}.
 */
@RestController
@RequestMapping("/api")
public class DisasterInterventionResource {

    private final Logger log = LoggerFactory.getLogger(DisasterInterventionResource.class);

    private static final String ENTITY_NAME = "DisasterIntervention";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;


    @Autowired
    RequiredDisasterInterventionRepository disasterInterventionRepository;


    /**
     * {@code GET  /disasters} : get all the disasters.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of disasters in body.
     */
    @GetMapping("/disaster-interventions/disater/{disasterId}")
    public ResponseEntity<List<RequiredDisasterIntervention>> getAllDisasterIntervetionsByDisaster(@PathVariable String disasterId) {
        log.debug("REST request to get a page of Disasters");

        List<RequiredDisasterIntervention> inv = disasterInterventionRepository.findByDisasterId(disasterId);
        return ResponseEntity
                .ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, disasterId))
                .body(inv);
    }


}
