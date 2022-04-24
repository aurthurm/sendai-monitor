package disaster.loss.service.impl;

import disaster.loss.domain.Casualty;
import disaster.loss.domain.User;
import disaster.loss.domain.enumeration.SEX;
import disaster.loss.repository.CasualtyRepository;
import disaster.loss.service.CasualtyService;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import disaster.loss.service.UserService;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * Service Implementation for managing {@link Casualty}.
 */
@Service
@Transactional
public class CasualtyServiceImpl implements CasualtyService {

    private final Logger log = LoggerFactory.getLogger(CasualtyServiceImpl.class);

    private final CasualtyRepository casualtyRepository;

    private final UserService userService;

    public CasualtyServiceImpl(CasualtyRepository casualtyRepository, UserService userService) {
        this.casualtyRepository = casualtyRepository;
        this.userService = userService;
    }

    @Override
    public Casualty save(Casualty casualty) {
        log.debug("Request to save Casualty : {}", casualty);
        return casualtyRepository.save(casualty);
    }

    @Override
    public Optional<Casualty> partialUpdate(Casualty casualty) {
        log.debug("Request to partially update Casualty : {}", casualty);

        return casualtyRepository
            .findById(casualty.getCasualtyId())
            .map(existingCasualty -> {
                if (casualty.getDisasterId() != null) {
                    existingCasualty.setDisasterId(casualty.getDisasterId());
                }
                if (casualty.getNationalId() != null) {
                    existingCasualty.setNationalId(casualty.getNationalId());
                }
                if (casualty.getAnonymous() != null) {
                    existingCasualty.setAnonymous(casualty.getAnonymous());
                }
                if (casualty.getFirstName() != null) {
                    existingCasualty.setFirstName(casualty.getFirstName());
                }
                if (casualty.getLastName() != null) {
                    existingCasualty.setLastName(casualty.getLastName());
                }
                if (casualty.getDob() != null) {
                    existingCasualty.setDob(casualty.getDob());
                }
                if (casualty.getDobEstimated() != null) {
                    existingCasualty.setDobEstimated(casualty.getDobEstimated());
                }
                if (casualty.getAge() != null) {
                    existingCasualty.setAge(casualty.getAge());
                }
                if (casualty.getSex() != null) {
                    existingCasualty.setSex(casualty.getSex());
                }
                if (casualty.getDependents() != null) {
                    existingCasualty.setDependents(casualty.getDependents());
                }
                if (casualty.getOccupation() != null) {
                    existingCasualty.setOccupation(casualty.getOccupation());
                }
                if (casualty.getNationality() != null) {
                    existingCasualty.setNationality(casualty.getNationality());
                }
                if (casualty.getDisplaced() != null) {
                    existingCasualty.setDisplaced(casualty.getDisplaced());
                }
                if (casualty.getAffected() != null) {
                    existingCasualty.setAffected(casualty.getAffected());
                }
                if (casualty.getInjured() != null) {
                    existingCasualty.setInjured(casualty.getInjured());
                }
                if (casualty.getMissing() != null) {
                    existingCasualty.setMissing(casualty.getMissing());
                }
                if (casualty.getDead() != null) {
                    existingCasualty.setDead(casualty.getDead());
                }
                if (casualty.getDisabilityBefore() != null) {
                    existingCasualty.setDisabilityBefore(casualty.getDisabilityBefore());
                }
                if (casualty.getDisabilityAfter() != null) {
                    existingCasualty.setDisabilityAfter(casualty.getDisabilityAfter());
                }
                if (casualty.getReplay() != null) {
                    existingCasualty.setReplay(casualty.getReplay());
                }

                return existingCasualty;
            })
            .map(casualtyRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Casualty> findAll(Pageable pageable) {
        log.debug("Request to get all Casualties");
        return casualtyRepository.findAll(pageable);
    }

	@Override
	public Page<Casualty> findAllForDisaster(Pageable pageable, String disasterId) {
        log.debug("Request to get all Casualties for a disaster {}", disasterId);
        return casualtyRepository.findByDisasterId(disasterId, pageable);
	}

    @Override
    @Transactional(readOnly = true)
    public Optional<Casualty> findOne(String id) {
        log.debug("Request to get Casualty : {}", id);
        return casualtyRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Casualty : {}", id);
        casualtyRepository.deleteById(id);
    }

    @Override
    public List<Casualty> uploadCSVCauslties(MultipartFile csvFile, String disasterId) {

        final Optional<User> isUser = userService.getUserWithAuthorities();
        User user = null;
        if (isUser.isPresent()) {
            user = isUser.get();
        } else {
            log.error("User is not logged in");
        }

        List<Casualty> casualtiesToAdd = new ArrayList<>();

        if (csvFile.isEmpty()) {
            log.debug("Please select a file to upload !");
        } else {
            try (
                BufferedReader reader = new BufferedReader(new InputStreamReader(csvFile.getInputStream(), StandardCharsets.UTF_8.name()))
            ) {
                CSVParser csvParser = new CSVParser(reader, CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());
                Iterable<CSVRecord> csvRecords = csvParser.getRecords();

                for (CSVRecord csvRow : csvRecords) {

                    String nationalId = csvRow.get("National ID");
                    String nationality = csvRow.get("Nationality");
                    Boolean anonymous = Boolean.valueOf(csvRow.get("Anonymous"));
                    String firstName = csvRow.get("First Name");
                    String lastName = csvRow.get("Last Name");
                    String mobilePhone = csvRow.get("Mobile Phone");
                    LocalDate dob = null;
                    if(csvRow.get("Date Of Birth").length() > 0)
                    {
                        dob = LocalDate.parse(csvRow.get("Date Of Birth"));
                    }
                    Boolean dobEstimated = Boolean.valueOf(csvRow.get("DOB Estimated"));
                    Integer age = null;
                    if(csvRow.get("Age").length() > 0)
                    {
                    	age = Integer.parseInt(csvRow.get("Age"));
                    }
                    SEX sex = SEX.valueOf(csvRow.get("Sex"));
                    Integer dependents = null;
                    if(csvRow.get("Dependants").length() > 0)
                    {
                    	dependents = Integer.parseInt(csvRow.get("Dependants"));
                    }
                    String occupation = csvRow.get("Occupation");
                    Boolean displaced = Boolean.valueOf(csvRow.get("Displaced"));
                    Boolean affected = Boolean.valueOf(csvRow.get("Affected"));
                    Boolean injured = Boolean.valueOf(csvRow.get("Injured"));
                    Boolean missing = Boolean.valueOf(csvRow.get("Missing"));
                    Boolean dead = Boolean.valueOf(csvRow.get("Dead"));
                    Boolean disabilityBefore = Boolean.valueOf(csvRow.get("Disability Before"));
                    Boolean disabilityAfter = Boolean.valueOf(csvRow.get("Disability After"));

                    Casualty casualty = new Casualty();
                    casualty.setDisasterId(disasterId);
                    casualty.setNationalId(nationalId);
                    casualty.setNationality(nationality);
                    casualty.setAnonymous(anonymous);
                    casualty.setFirstName(firstName);
                    casualty.setLastName(lastName);
                    casualty.setMobilePhone(mobilePhone);
                    casualty.setDob(dob);
                    casualty.setDobEstimated(dobEstimated);
                    casualty.setAge(age);
                    casualty.setSex(sex);
                    casualty.setDependents(dependents);
                    casualty.setOccupation(occupation);
                    casualty.setDisplaced(displaced);
                    casualty.setAffected(affected);
                    casualty.setInjured(injured);
                    casualty.setMissing(missing);
                    casualty.setDead(dead);
                    casualty.setDisabilityBefore(disabilityBefore);
                    casualty.setDisabilityAfter(disabilityAfter);
                    casualtiesToAdd.add(casualty);

                    log.debug("casualty {}", casualty);
                }
            } catch (Exception ex) {
                log.debug("An error occurred while processing the CSV file !");
                log.debug("{}", ex);
            }
        }

        return casualtyRepository.saveAll(casualtiesToAdd);
    }
}
