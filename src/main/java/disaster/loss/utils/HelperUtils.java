package disaster.loss.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import disaster.loss.domain.enumeration.HUMAN_POPULATION;
import disaster.loss.domain.enumeration.LOCATION;
import disaster.loss.repository.DistrictRepository;
import disaster.loss.repository.ProvinceRepository;
import disaster.loss.repository.VillageRepository;
import disaster.loss.repository.WardRepository;
import disaster.loss.service.dto.PopulationDisabilityCategoryDTO;

@Service
public class HelperUtils {
	private final Logger log = LoggerFactory.getLogger(HelperUtils.class);

	@Autowired
	ProvinceRepository provinceRepository;

	@Autowired
	DistrictRepository districtRepository;

	@Autowired
	VillageRepository villageRepository;

	@Autowired
	WardRepository wardRepository;

	public String getLocationName(String location, String locationId) {
		log.debug("Request to get Location name before processing {}: {}:", location, locationId);
		String resolvedLocationName = "";

		switch (location) {
		case "NATIONAL":
			resolvedLocationName = "Department Of Civil Protection Zimbabwe";
			break;
		case "PROVINCE":
			resolvedLocationName = provinceRepository.getByProvinceId(locationId).getName();

			break;
		case "DISTRICT":
			resolvedLocationName = districtRepository.getByDistrictId(locationId).getName();
			break;
		case "WARD":
			resolvedLocationName = wardRepository.getByWardId(locationId).getName();
			break;
		case "VILLAGE":
			resolvedLocationName = villageRepository.getByVillageId(locationId).getName();
			break;
		default:
			resolvedLocationName = "None";
			break;
		}

		log.debug("Request to get Location name {}:", resolvedLocationName);

		return resolvedLocationName;
	}

	public List<PopulationDisabilityCategoryDTO> getHumanPopulationCategories() {
		List<PopulationDisabilityCategoryDTO> categories = new ArrayList<>();

		categories.add(new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.CHILDREN_FEMALE, "DISABLED",
				"(0-14 Yrs)"));
		categories.add(
				new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.CHILDREN_FEMALE, "ENABLED", "(0-14 Yrs)"));

		categories.add(
				new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.CHILDREN_MALE, "DISABLED", "(0-14 Yrs)"));
		categories.add(
				new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.CHILDREN_MALE, "ENABLED", "(0-14 Yrs)"));

		categories.add(
				new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.ELDERLY_FEMALE, "DISABLED", "(>64 Yrs)"));
		categories.add(
				new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.ELDERLY_FEMALE, "ENABLED", "(>64 Yrs)"));

		categories.add(
				new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.ELDERLY_MALE, "DISABLED", "(>64 Yrs)"));
		categories.add(
				new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.ELDERLY_MALE, "ENABLED", "(>64 Yrs)"));

		categories.add(new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.MIDDLE_AGED_FEMALE, "DISABLED",
				"(15-64 Yrs)"));
		categories.add(new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.MIDDLE_AGED_FEMALE, "ENABLED",
				"(15-64 Yrs)"));

		categories.add(new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.MIDDLE_AGED_MALE, "DISABLED",
				"(15-64 Yrs)"));
		categories.add(new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.MIDDLE_AGED_MALE, "ENABLED",
				"(15-64 Yrs)"));

		categories.add(new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.UNkNOWN, "DISABLED", ""));
		categories.add(new PopulationDisabilityCategoryDTO(HUMAN_POPULATION.UNkNOWN, "ENABLED", ""));
		return categories;
	}
}
