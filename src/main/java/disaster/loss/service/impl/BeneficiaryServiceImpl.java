package disaster.loss.service.impl;

import disaster.loss.domain.Beneficiary;
import disaster.loss.repository.BeneficiaryRepository;
import disaster.loss.service.BeneficiaryService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Beneficiary}.
 */
@Service
@Transactional
public class BeneficiaryServiceImpl implements BeneficiaryService {

    private final Logger log = LoggerFactory.getLogger(BeneficiaryServiceImpl.class);

    private final BeneficiaryRepository beneficiaryRepository;

    public BeneficiaryServiceImpl(BeneficiaryRepository beneficiaryRepository) {
        this.beneficiaryRepository = beneficiaryRepository;
    }

    @Override
    public Beneficiary save(Beneficiary beneficiary) {
        log.debug("Request to save Beneficiary : {}", beneficiary);
        return beneficiaryRepository.save(beneficiary);
    }

    @Override
    public Optional<Beneficiary> partialUpdate(Beneficiary beneficiary) {
        log.debug("Request to partially update Beneficiary : {}", beneficiary);

        return beneficiaryRepository
            .findById(beneficiary.getBeneficiaryId())
            .map(existingBeneficiary -> {
                if (beneficiary.getProjectId() != null) {
                    existingBeneficiary.setProjectId(beneficiary.getProjectId());
                }
                if (beneficiary.getAmountReceived() != null) {
                    existingBeneficiary.setAmountReceived(beneficiary.getAmountReceived());
                }
                if (beneficiary.getValueOfGoodsReceived() != null) {
                    existingBeneficiary.setValueOfGoodsReceived(beneficiary.getValueOfGoodsReceived());
                }

                return existingBeneficiary;
            })
            .map(beneficiaryRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Beneficiary> findAll(Pageable pageable) {
        log.debug("Request to get all Beneficiaries");
        return beneficiaryRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Beneficiary> findOne(String id) {
        log.debug("Request to get Beneficiary : {}", id);
        return beneficiaryRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Beneficiary : {}", id);
        beneficiaryRepository.deleteById(id);
    }
}
