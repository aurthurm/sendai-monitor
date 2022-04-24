package disaster.loss.service.impl;

import disaster.loss.domain.ResponseTeam;
import disaster.loss.repository.ResponseTeamRepository;
import disaster.loss.service.ResponseTeamService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ResponseTeam}.
 */
@Service
@Transactional
public class ResponseTeamServiceImpl implements ResponseTeamService {

    private final Logger log = LoggerFactory.getLogger(ResponseTeamServiceImpl.class);

    private final ResponseTeamRepository responseTeamRepository;

    public ResponseTeamServiceImpl(ResponseTeamRepository responseTeamRepository) {
        this.responseTeamRepository = responseTeamRepository;
    }

    @Override
    public ResponseTeam save(ResponseTeam responseTeam) {
        log.debug("Request to save ResponseTeam : {}", responseTeam);
        return responseTeamRepository.save(responseTeam);
    }

    @Override
    public Optional<ResponseTeam> partialUpdate(ResponseTeam responseTeam) {
        log.debug("Request to partially update ResponseTeam : {}", responseTeam);

        return responseTeamRepository
            .findById(responseTeam.getResponseTeamId())
            .map(existingResponseTeam -> {
                if (responseTeam.getDisasterId() != null) {
                    existingResponseTeam.setDisasterId(responseTeam.getDisasterId());
                }
                if (responseTeam.getName() != null) {
                    existingResponseTeam.setName(responseTeam.getName());
                }
                if (responseTeam.getTeamLead() != null) {
                    existingResponseTeam.setTeamLead(responseTeam.getTeamLead());
                }

                return existingResponseTeam;
            })
            .map(responseTeamRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ResponseTeam> findAll(Pageable pageable) {
        log.debug("Request to get all ResponseTeams");
        return responseTeamRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ResponseTeam> findOne(String id) {
        log.debug("Request to get ResponseTeam : {}", id);
        return responseTeamRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete ResponseTeam : {}", id);
        responseTeamRepository.deleteById(id);
    }
}
