package disaster.loss.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.Donation;
import disaster.loss.domain.DonationItem;
import disaster.loss.repository.DonationItemRepository;
import disaster.loss.service.DonationItemService;

/**
 * Service Implementation for managing {@link Donation}.
 */
@Service
@Transactional
public class DonationItemServiceImpl implements DonationItemService {

    private final Logger log = LoggerFactory.getLogger(DonationItemServiceImpl.class);

    private final DonationItemRepository donationItemRepository;

    public DonationItemServiceImpl(DonationItemRepository donationItemRepository) {
        this.donationItemRepository = donationItemRepository;
    }

    @Override
    public DonationItem save(DonationItem donation) {
        log.debug("Request to save Donation : {}", donation);
        return donationItemRepository.save(donation);
    }

    @Override
    public Optional<DonationItem> partialUpdate(DonationItem donation) {
        log.debug("Request to partially update Donation : {}", donation);

        return donationItemRepository
            .findById(donation.getDonorId())
            .map(existingDonation -> {
                if (donation.getValue() != null) {
                    existingDonation.setValue(donation.getValue());
                }
                if (donation.getItemName() != null) {
                    existingDonation.setItemName(donation.getItemName());
                }
                if (donation.getQuantityReceived() != null) {
                    existingDonation.setQuantityReceived(donation.getQuantityReceived());
                }
                if (donation.getQuantityIssued() != null) {
                    existingDonation.setQuantityIssued(donation.getQuantityIssued());
                }

                return existingDonation;
            })
            .map(donationItemRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DonationItem> findAll(Pageable pageable) {
        log.debug("Request to get all Donations");
        return donationItemRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DonationItem> findOne(String id) {
        log.debug("Request to get Donation : {}", id);
        return donationItemRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Donation : {}", id);
        donationItemRepository.deleteById(id);
    }
}
