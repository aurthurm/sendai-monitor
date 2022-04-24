package disaster.loss.service.impl;

import disaster.loss.domain.ProjectDisaster;
import disaster.loss.repository.ProjectDisasterRepository;
import disaster.loss.service.ProjectDisasterService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ProjectDisaster}.
 */
@Service
@Transactional
public class ProjectDisasterServiceImpl implements ProjectDisasterService {

    private final Logger log = LoggerFactory.getLogger(ProjectDisasterServiceImpl.class);

    private final ProjectDisasterRepository projectDisasterRepository;

    public ProjectDisasterServiceImpl(ProjectDisasterRepository projectDisasterRepository) {
        this.projectDisasterRepository = projectDisasterRepository;
    }

    @Override
    public ProjectDisaster save(ProjectDisaster projectDisaster) {
        log.debug("Request to save ProjectDisaster : {}", projectDisaster);
        return projectDisasterRepository.save(projectDisaster);
    }

    @Override
    public Optional<ProjectDisaster> partialUpdate(ProjectDisaster projectDisaster) {
        log.debug("Request to partially update ProjectDisaster : {}", projectDisaster);

        return projectDisasterRepository
            .findById(projectDisaster.getProjectDisasterId())
            .map(existingProjectDisaster -> {
                if (projectDisaster.getProjectId() != null) {
                    existingProjectDisaster.setProjectId(projectDisaster.getProjectId());
                }
                if (projectDisaster.getDisastertId() != null) {
                    existingProjectDisaster.setDisastertId(projectDisaster.getDisastertId());
                }

                return existingProjectDisaster;
            })
            .map(projectDisasterRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectDisaster> findAll(Pageable pageable) {
        log.debug("Request to get all ProjectDisasters");
        return projectDisasterRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProjectDisaster> findOne(String id) {
        log.debug("Request to get ProjectDisaster : {}", id);
        return projectDisasterRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete ProjectDisaster : {}", id);
        projectDisasterRepository.deleteById(id);
    }
}
