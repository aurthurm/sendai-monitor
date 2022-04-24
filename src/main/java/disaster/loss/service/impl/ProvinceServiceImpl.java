package disaster.loss.service.impl;

import disaster.loss.domain.Province;
import disaster.loss.repository.ProvinceRepository;
import disaster.loss.service.ProvinceService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Province}.
 */
@Service
@Transactional
public class ProvinceServiceImpl implements ProvinceService {

    private final Logger log = LoggerFactory.getLogger(ProvinceServiceImpl.class);

    private final ProvinceRepository provinceRepository;

    public ProvinceServiceImpl(ProvinceRepository provinceRepository) {
        this.provinceRepository = provinceRepository;
    }

    @Override
    public Province save(Province province) {
        log.debug("Request to save Province : {}", province);
        return provinceRepository.save(province);
    }

    @Override
    public Optional<Province> partialUpdate(Province province) {
        log.debug("Request to partially update Province : {}", province);

        return provinceRepository
            .findById(province.getCountryId())
            .map(existingProvince -> {
                if (province.getProvinceId() != null) {
                    existingProvince.setProvinceId(province.getProvinceId());
                }
                if (province.getName() != null) {
                    existingProvince.setName(province.getName());
                }
                if (province.getLatitude() != null) {
                    existingProvince.setLatitude(province.getLatitude());
                }
                if (province.getLongitude() != null) {
                    existingProvince.setLongitude(province.getLongitude());
                }
                if (province.getLevel() != null) {
                    existingProvince.setLevel(province.getLevel());
                }

                return existingProvince;
            })
            .map(provinceRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Province> findAll(Pageable pageable) {
        log.debug("Request to get all Provinces");
        return provinceRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Province> findOne(String id) {
        log.debug("Request to get Province : {}", id);
        return provinceRepository.findById(id);
    }

    @Override
    public void delete(String id) {
        log.debug("Request to delete Province : {}", id);
        provinceRepository.deleteById(id);
    }
}
