package disaster.loss.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.Disaster;
import disaster.loss.domain.DisasterApproval;
import disaster.loss.domain.HumanPopulation;
import disaster.loss.domain.HumanPopulationDisasterCategory;
import disaster.loss.domain.IdServer;
import disaster.loss.domain.RequiredDisasterIntervention;
import disaster.loss.domain.enumeration.APPROVALSTATUS;
import disaster.loss.domain.enumeration.DISABILITY;
import disaster.loss.domain.enumeration.HUMAN_POPULATION;
import disaster.loss.repository.CustomDisasterRepository;
import disaster.loss.repository.DisasterRepository;
import disaster.loss.repository.IdServerRepository;
import disaster.loss.repository.RequiredDisasterInterventionRepository;
import disaster.loss.repository.interfaces.ICountGroupBy;
import disaster.loss.service.DisasterService;
import disaster.loss.service.HumanPopulationDisasterCategoryService;
import disaster.loss.service.HumanPopulationService;
import disaster.loss.service.dto.DisasterSimpleCountDTO;
import disaster.loss.service.dto.IDisasterApprovalDTO;
import disaster.loss.service.dto.IdServerTemplateDTO;

/**
 * Service Implementation for managing {@link Disaster}.
 */
@Service
@Transactional
public class DisasterServiceImpl implements DisasterService {

	private final Logger log = LoggerFactory.getLogger(DisasterServiceImpl.class);

	private final DisasterRepository disasterRepository;

    private final CustomDisasterRepository customDisasterRepository;

	private final HumanPopulationService humanPopulationService;

    private final IdServerRepository idServerRepository;

    private final HumanPopulationDisasterCategoryService humanPopulationDisasterCategoryService;

    @Autowired
    RequiredDisasterInterventionRepository disasterInterventionRepository;

	public DisasterServiceImpl(
        DisasterRepository disasterRepository,
        CustomDisasterRepository customDisasterRepository,
        HumanPopulationService humanPopulationService,
        IdServerRepository idServerRepository,
        HumanPopulationDisasterCategoryService humanPopulationDisasterCategoryService
    ) {
		this.disasterRepository = disasterRepository;
        this.customDisasterRepository = customDisasterRepository;
        this.humanPopulationService = humanPopulationService;
        this.idServerRepository = idServerRepository;
        this.humanPopulationDisasterCategoryService = humanPopulationDisasterCategoryService;
    }

    // Auto generate laboratory reference number/sampleId here
    private IdServerTemplateDTO generateDisasterCaseNumber() {
        IdServerTemplateDTO ids = new IdServerTemplateDTO();

        // retrieve the last saved number from the id server
        int year = Calendar.getInstance().get(Calendar.YEAR);
        String yearPrefix = Integer.toString(year).substring(2);

        String prefix = "DCP" + yearPrefix;

        IdServer id = idServerRepository.findByPrefixIgnoreCase(prefix);
        if (id == null) {
            IdServer idServer = new IdServer();
            idServer.setPrefix(prefix);
            idServer.setNumber(1);
            idServer.setDescription(prefix);
            id = idServerRepository.save(idServer);
        }

        int num = id.getNumber();
        id.setNumber(num + 1);
        idServerRepository.save(id);

        String padded = String.format("%05d", num);

        ids.setNumber(id.getNumber());
        ids.setPaddedNumber(prefix + "-" + padded);
        ids.setCurrentIdServer(id);

        return ids;
    }

	@Override
	public Disaster save(Disaster disaster) {
		log.debug("Request to save Disaster : {}", disaster);

        if(disaster.getCaseId()==null && disaster.getCaseId()==null ){
            IdServerTemplateDTO ids = generateDisasterCaseNumber();
            disaster.setCaseId(ids.getPaddedNumber());
        }

		Disaster saved = disasterRepository.save(disaster);

		// Create black human populations
		if (saved.getDisasterId() != null) {
			Pageable pageable = PageRequest.of(0, 20);
			Page<HumanPopulation> humanPopulation = humanPopulationService.findAllByDisasterId(disaster.getDisasterId(),
					pageable);
			if (humanPopulation.isEmpty()) {
				Page<HumanPopulationDisasterCategory> pageCat = humanPopulationDisasterCategoryService
						.findAll(pageable);
				List<HumanPopulation> pops = new ArrayList<>();
				for (HumanPopulationDisasterCategory humCat : pageCat.getContent()) {
					Arrays.stream(DISABILITY.values()).forEach(ability -> {
						Arrays.stream(HUMAN_POPULATION.values()).forEach(human -> {
							HumanPopulation pop = new HumanPopulation();
							pop.setDisasterId(saved.getDisasterId());
							pop.setDisabled(ability);
							pop.setValue(0);
							pop.setPopulationType(human);
							pop.setHumanPopulationDisasterCategoryName(humCat.getName());
							pop.setHumanPopulationDisasterCategoryId(humCat.getHumanPopulationDisasterCategoryId());
							pops.add(pop);
						});
					});
				}
				humanPopulationService.initSaveAll(pops);
			}

			saveDisasterIntervention(disaster, saved);
		}
		return saved;
	}

	private void saveDisasterIntervention(Disaster disaster, Disaster saved) {
		if(saved!=null && disaster.getDisasterInterventionRequired()!=null) {
			disasterInterventionRepository.deleteByDisasterId(disaster.getDisasterId());
			for(RequiredDisasterIntervention inter : disaster.getDisasterInterventionRequired()) {

				RequiredDisasterIntervention inv = new RequiredDisasterIntervention();
				inv.setDisasterId(disaster.getDisasterId());
				inv.setInterventionId(inter.getInterventionId());
				inv.setName(inter.getName());
				disasterInterventionRepository.save(inv);
			}
		}
	}

	@Override
	public Optional<Disaster> partialUpdate(Disaster disaster) {
		log.debug("Request to partially update Disaster : {}", disaster);

		Optional<Disaster>  dis = disasterRepository.findById(disaster.getDisasterId()).map(existingDisaster -> {
			if (disaster.getDepartmentId() != null) {
				existingDisaster.setDepartmentId(disaster.getDepartmentId());
			}
			if (disaster.getName() != null) {
				existingDisaster.setName(disaster.getName());
			}
			if (disaster.getHazardId() != null) {
				existingDisaster.setHazardId(disaster.getHazardId());
			}
			if (disaster.getType() != null) {
				existingDisaster.setType(disaster.getType());
			}
			if (disaster.getCause() != null) {
				existingDisaster.setCause(disaster.getCause());
			}
			if (disaster.getLocation() != null) {
				existingDisaster.setLocation(disaster.getLocation());
			}
			if (disaster.getLocationId() != null) {
				existingDisaster.setLocationId(disaster.getLocationId());
			}
			if (disaster.getDescription() != null) {
				existingDisaster.setDescription(disaster.getDescription());
			}
			if (disaster.getDisasterCategoryId() != null) {
				existingDisaster.setDisasterCategoryId(disaster.getDisasterCategoryId());
			}
			if (disaster.getDisasterTypeId() != null) {
				existingDisaster.setDisasterTypeId(disaster.getDisasterTypeId());
			}
			if (disaster.getCaseId() != null) {
				existingDisaster.setCaseId(disaster.getCaseId());
			}
			if (disaster.getEstimatedDamage() != null) {
				existingDisaster.setEstimatedDamage(disaster.getEstimatedDamage());
			}
			if (disaster.getIsDeclared() != null) {
				existingDisaster.setIsDeclared(disaster.getIsDeclared());
			}
			if (disaster.getDeclarationDate() != null) {
				existingDisaster.setDeclarationDate(disaster.getDeclarationDate());
			}
			if (disaster.getClosureDate() != null) {
				existingDisaster.setClosureDate(disaster.getClosureDate());
			}
			if (disaster.getIncidentDate() != null) {
				existingDisaster.setIncidentDate(disaster.getIncidentDate());
			}
            if (disaster.getCurrency() != null) {
                existingDisaster.setCurrency(disaster.getCurrency());
            }

            if (disaster.getPopulation() != null) {
				existingDisaster.setPopulation(disaster.getPopulation());
			}
            if (disaster.getAffectedPopulation() != null) {
                existingDisaster.setAffectedPopulation(disaster.getAffectedPopulation());
            }

            if (disaster.getDipTank() != null) {
                existingDisaster.setDipTank(disaster.getDipTank());
            }

            if (disaster.getLatitude() != null) {
                existingDisaster.setLatitude(disaster.getLatitude());
            }

            if (disaster.getLongitude() != null) {
                existingDisaster.setLongitude(disaster.getLongitude());
            }


			return existingDisaster;
		}).map(disasterRepository::save);

		saveDisasterIntervention(disaster, dis.get());

		return dis;
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Disaster> findAll(String filterBy, Pageable pageable) {
		log.debug("Request to get all Disasters");
        if (filterBy!=null && filterBy.toUpperCase().equals("ALL")) {
            return disasterRepository.findAll(pageable);
        }else if (filterBy==null){
        	return disasterRepository.findAll(pageable);
        }
        return disasterRepository.findByApprovalStatus(APPROVALSTATUS.valueOf(filterBy.toUpperCase()), pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Disaster> findOne(String id) {
		log.debug("Request to get Disaster : {}", id);
		return disasterRepository.findById(id);
	}

    @Override
    public Page<Disaster> search(String searchText, Pageable pageable) {
        return customDisasterRepository.search(searchText, pageable);
    }

    @Override
    public List<ICountGroupBy> groupByDisasterCategory() {
        return disasterRepository.groupByDisasterCategory();
    }

    @Override
    public DisasterSimpleCountDTO simpleCounts() {
        DisasterSimpleCountDTO counts = new DisasterSimpleCountDTO();

        Long total = disasterRepository.count();
        Long declared = disasterRepository.countByIsDeclared(true);
        Long approved = disasterRepository.countByApprovalStatus(APPROVALSTATUS.APPROVED);
        Long notApproved = disasterRepository.countByApprovalStatus(APPROVALSTATUS.PENDING);
        Long requestChanges= disasterRepository.countByApprovalStatus(APPROVALSTATUS.REQUESTCHANGES);
        Long notDeclared = total - declared;

        counts.setTotal(total);
        counts.setDeclared(declared);
        counts.setNotDeclared(notDeclared);
        counts.setApproved(approved);
        counts.setNotApproved(notApproved);
        counts.setRequestChanges(requestChanges);

        return counts;
    }

    @Override
    public List<ICountGroupBy> groupByDisasterType() {
        return disasterRepository.groupByDisasterType();
    }

    @Override
	public void delete(String id) {
		log.debug("Request to delete Disaster : {}", id);
		disasterRepository.deleteById(id);
	}

   
}
