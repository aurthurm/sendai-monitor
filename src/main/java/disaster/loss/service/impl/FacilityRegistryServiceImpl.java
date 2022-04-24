package disaster.loss.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.Country;
import disaster.loss.domain.District;
import disaster.loss.domain.Province;
import disaster.loss.domain.Village;
import disaster.loss.domain.Ward;
import disaster.loss.repository.CountryRepository;
import disaster.loss.repository.DistrictRepository;
import disaster.loss.repository.ProvinceRepository;
import disaster.loss.repository.VillageRepository;
import disaster.loss.repository.WardRepository;
import disaster.loss.service.dto.CountryDTO;
import disaster.loss.service.dto.DistrictDTO;
import disaster.loss.service.dto.ProvinceDTO;
import disaster.loss.service.dto.VillageDTO;
import disaster.loss.service.dto.WardDTO;

/**
 * Service Implementation for managing {@link District}.
 */
@Service
@Transactional
public class FacilityRegistryServiceImpl {

	private final Logger log = LoggerFactory.getLogger(FacilityRegistryServiceImpl.class);

	private final DistrictRepository districtRepository;

	@Autowired
	VillageRepository villageRepository;

	@Autowired
	ProvinceRepository provinceRepository;

	@Autowired
	WardRepository wardRepository;

	@Autowired
	CountryRepository countryRepository;

	public FacilityRegistryServiceImpl(DistrictRepository districtRepository) {
		this.districtRepository = districtRepository;
	}

	public CountryDTO getFacilityRegistry() {

		List<Country> countries = countryRepository.findAll();
        Optional<Country> maybeCountry = countries.stream().findFirst();
        Country existingCountry = maybeCountry.get();

		CountryDTO country = new CountryDTO();
		country.setId(existingCountry.getCountryId());
		country.setLevel(existingCountry.getLevel());
		country.setName(existingCountry.getName());

		List<Province> province = provinceRepository.findAll();
		ArrayList<ProvinceDTO> listPro = new ArrayList<>();

		for (Province pro : province) {
			List<District> district = districtRepository.findByProvinceId(pro.getProvinceId());
			ProvinceDTO proDto = new ProvinceDTO();

			proDto.setName(pro.getName());
			proDto.setId(pro.getProvinceId());
			proDto.setLevel(pro.getLevel());
			ArrayList<DistrictDTO> disDTOs = new ArrayList<>();
			for (District dis : district) {

				DistrictDTO disDTO = new DistrictDTO();
				disDTO.setId(dis.getDistrictId());
				disDTO.setName(dis.getName());
				disDTO.setLevel(dis.getLevel());

				List<Ward> wards = wardRepository.findByDistrictId(dis.getDistrictId());
				ArrayList<WardDTO> wardDTOs = new ArrayList<>();

				for (Ward ward : wards) {
					WardDTO wDTO = new WardDTO();
					wDTO.setId(ward.getWardId());
					wDTO.setLevel(ward.getLevel());
					wDTO.setName(ward.getName());

					List<Village> village = villageRepository.findByWardId(ward.getWardId());
					ArrayList<VillageDTO> wardDTOtoADD = new ArrayList<>();

					for (Village vill : village) {
						VillageDTO villDTO = new VillageDTO();
						villDTO.setLevel(vill.getLevel());
						villDTO.setName(vill.getName());
						villDTO.setId(vill.getVillageId());

						wardDTOtoADD.add(villDTO);
					}

					wDTO.setVillages(wardDTOtoADD);
					wardDTOs.add(wDTO);

				}

				disDTO.setWards(wardDTOs);
				disDTOs.add(disDTO);

			}

			proDto.setDistricts(disDTOs);
			listPro.add(proDto);
		}

		country.setProvinces(listPro);
		return country;
	}
}
