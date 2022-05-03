package disaster.loss.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.DisasterApproval;
import disaster.loss.repository.DisasterApprovalRepository;
import disaster.loss.service.DisasterApprovalService;

/**
 * Service Implementation for managing {@link DisasterApproval}.
 */
@Service
@Transactional
public class DisasterApprovalServiceImpl implements DisasterApprovalService {

	private final Logger log = LoggerFactory.getLogger(DisasterApprovalServiceImpl.class);

	private final DisasterApprovalRepository disasterApprovalRepository;

	public DisasterApprovalServiceImpl(DisasterApprovalRepository disasterApprovalRepository) {

		this.disasterApprovalRepository = disasterApprovalRepository;
	}

	@Override
	public DisasterApproval save(DisasterApproval disasterApproval) {
		log.debug("Request to save DisasterApproval : {}", disasterApproval);

		return disasterApprovalRepository.save(disasterApproval);

	}

	@Override
	public Optional<DisasterApproval> partialUpdate(DisasterApproval disasterApproval) {
		log.debug("Request to partially update DisasterApproval : {}", disasterApproval);

		return disasterApprovalRepository.findById(disasterApproval.getDisasterApprovalId()).map(existingCrop -> {
			if (disasterApproval.getDisasterId() != null) {
				existingCrop.setDisasterId(disasterApproval.getDisasterId());
			}
			if (disasterApproval.getApproval() != null) {
				existingCrop.setApproval(disasterApproval.getApproval());
			}
			if (disasterApproval.getStatus() != null) {
				existingCrop.setStatus(disasterApproval.getStatus());
			}
			if (disasterApproval.getComment() != null) {
				existingCrop.setComment(disasterApproval.getComment());
			}

			return existingCrop;
		}).map(disasterApprovalRepository::save);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<DisasterApproval> findAll(Pageable pageable) {
		log.debug("Request to get all Crops");
		return disasterApprovalRepository.findAll(pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<DisasterApproval> findOne(String id) {
		log.debug("Request to get DisasterApproval : {}", id);
		return disasterApprovalRepository.findById(id);
	}

	@Override
	public void delete(String id) {
		log.debug("Request to delete DisasterApproval : {}", id);
		disasterApprovalRepository.deleteById(id);
	}

	@Override
	public Page<DisasterApproval> findByDisasterId(String disasterId, Pageable pageable) {
		return disasterApprovalRepository.findByDisasterId(disasterId, pageable);
	}
}
