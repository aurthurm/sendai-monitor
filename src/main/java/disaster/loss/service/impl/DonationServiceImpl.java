package disaster.loss.service.impl;

import disaster.loss.domain.Donation;
import disaster.loss.repository.DonationRepository;
import disaster.loss.service.DonationService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Donation}.
 */
@Service
@Transactional
public class DonationServiceImpl implements DonationService {

    private final Logger log = LoggerFactory.getLogger(DonationServiceImpl.class);

    private final DonationRepository donationRepository;

    public DonationServiceImpl(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    @Override
    public Donation save(Donation donation) {
        log.debug("Request to save Donation : {}", donation);
        return donationRepository.save(donation);
    }

    @Override
    public Optional<Donation> partialUpdate(Donation donation) {
        log.debug("Request to partially update Donation : {}", donation);

        return donationRepository
            .findById(donation.getDonorId())
            .map(existingDonation -> {
                if (donation.getDisasterId() != null) {
                    existingDonation.setDisasterId(donation.getDisasterId());
                }
                if (donation.getName() != null) {
                    existingDonation.setName(donation.getName());
                }
                if (donation.getType() != null) {
                    existingDonation.setType(donation.getType());
                }
                if (donation.getValueOfDonation() != null) {
                    existingDonation.setValueOfDonation(donation.getValueOfDonation());
                }

                return existingDonation;
            })
            .map(donationRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Donation> findAll(Pageable pageable) {
        log.debug("Request to get all Donations");
        return donationRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Donation> findOne(String id) {
        log.debug("Request to get Donation : {}", id);
        return donationRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Donation : {}", id);
        donationRepository.deleteById(id);
    }
}
