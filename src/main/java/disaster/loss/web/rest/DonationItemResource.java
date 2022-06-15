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

import disaster.loss.domain.Donation;
import disaster.loss.domain.DonationItem;
import disaster.loss.repository.DonationItemRepository;
import disaster.loss.service.DonationItemService;
import disaster.loss.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link disaster.loss.domain.Donation}.
 */
@RestController
@RequestMapping("/api")
public class DonationItemResource {

	private final Logger log = LoggerFactory.getLogger(DonationItemResource.class);

	private static final String ENTITY_NAME = "donation";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final DonationItemService donationItemService;

	private final DonationItemRepository donationItemRepository;

	public DonationItemResource(DonationItemService donationItemService,
			DonationItemRepository donationItemRepository) {
		this.donationItemService = donationItemService;
		this.donationItemRepository = donationItemRepository;
	}

	/**
	 * {@code POST  /donations} : Create a new donation.
	 *
	 * @param donation the donation to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new donation, or with status {@code 400 (Bad Request)} if
	 *         the donation has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/donation-items")
	public ResponseEntity<DonationItem> createDonation(@RequestBody DonationItem donation) throws URISyntaxException {
		log.debug("REST request to save Donation : {}", donation);
		if (donation.getDonorId() != null) {
			throw new BadRequestAlertException("A new donation cannot already have an ID", ENTITY_NAME, "idexists");
		}
		DonationItem result = donationItemService.save(donation);
		return ResponseEntity.created(new URI("/api/donations/" + result.getDonorId()))
				.headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getDonorId()))
				.body(result);
	}

	/**
	 * {@code PUT  /donations/:donorId} : Updates an existing donation.
	 *
	 * @param donorId  the id of the donation to save.
	 * @param donation the donation to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated donation, or with status {@code 400 (Bad Request)} if the
	 *         donation is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the donation couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/donation-items/{donationItemId}")
	public ResponseEntity<DonationItem> updateDonation(
			@PathVariable(value = "donorId", required = false) final String donationItemId, @RequestBody DonationItem donation)
			throws URISyntaxException {
		log.debug("REST request to update Donation : {}, {}", donationItemId, donation);
		if (donation.getDonorId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(donationItemId, donation.getDonorId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
		}

		if (!donationItemRepository.existsById(donationItemId)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
		}

		DonationItem result = donationItemService.save(donation);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, donation.getDonorId()))
				.body(result);
	}

	/**
	 * {@code PATCH  /donations/:donorId} : Partial updates given fields of an
	 * existing donation, field will ignore if it is null
	 *
	 * @param donorId  the id of the donation to save.
	 * @param donation the donation to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated donation, or with status {@code 400 (Bad Request)} if the
	 *         donation is not valid, or with status {@code 404 (Not Found)} if the
	 *         donation is not found, or with status
	 *         {@code 500 (Internal Server Error)} if the donation couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PatchMapping(value = "/donation-items/{donationItemId}", consumes = { "application/json", "application/merge-patch+json" })
	public ResponseEntity<DonationItem> partialUpdateDonation(
			@PathVariable(value = "donorId", required = false) final String donationItemId, @RequestBody DonationItem donation)
			throws URISyntaxException {
		log.debug("REST request to partial update Donation partially : {}, {}", donationItemId, donation);
		if (donation.getDonorId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		if (!Objects.equals(donationItemId, donation.getDonorId())) {
			throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
		}

		if (!donationItemRepository.existsById(donationItemId)) {
			throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
		}

		Optional<DonationItem> result = donationItemService.partialUpdate(donation);

		return ResponseUtil.wrapOrNotFound(result,
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, donation.getDonorId()));
	}

	/**
	 * {@code GET  /donations} : get all the donations.
	 *
	 * @param pageable the pagination information.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of donations in body.
	 */
	@GetMapping("/donation-items")
	public ResponseEntity<List<DonationItem>> getAllDonations(
			@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
		log.debug("REST request to get a page of Donations");
		Page<DonationItem> page = donationItemService.findAll(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * {@code GET  /donations/:id} : get the "id" donation.
	 *
	 * @param id the id of the donation to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the donation, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/donation-items/{id}")
	public ResponseEntity<DonationItem> getDonation(@PathVariable String id) {
		log.debug("REST request to get Donation : {}", id);
		Optional<DonationItem> donation = donationItemService.findOne(id);
		return ResponseUtil.wrapOrNotFound(donation);
	}

	/**
	 * {@code DELETE  /donations/:id} : delete the "id" donation.
	 *
	 * @param id the id of the donation to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/donation-items/{id}")
	public ResponseEntity<Void> deleteDonation(@PathVariable String id) {
		log.debug("REST request to delete Donation : {}", id);
		donationItemService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
	}
}
