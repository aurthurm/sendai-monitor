package disaster.loss.service.impl;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import disaster.loss.domain.Crop;
import disaster.loss.domain.Disaster;
import disaster.loss.domain.Household;
import disaster.loss.domain.HumanPopulation;
import disaster.loss.domain.Infrastructure;
import disaster.loss.domain.LiveStock;
import disaster.loss.repository.CropRepository;
import disaster.loss.repository.DisasterRepository;
import disaster.loss.repository.HouseholdRepository;
import disaster.loss.repository.HumanPopulationRepository;
import disaster.loss.repository.InfrastructureRepository;
import disaster.loss.repository.LiveStockRepository;
import disaster.loss.repository.UserRepository;
import disaster.loss.service.dto.CropDTO;
import disaster.loss.service.dto.DisasterDetailListDTO;
import disaster.loss.service.dto.DisasterReportDTO;
import disaster.loss.service.dto.HouseholdDTO;
import disaster.loss.service.dto.HumanPopulationFaltenerDTO;
import disaster.loss.service.dto.InfrastructureDTO;
import disaster.loss.service.dto.LiveStockDTO;
import disaster.loss.service.dto.PopulationDisabilityCategoryDTO;
import disaster.loss.utils.HelperUtils;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JsonDataSource;
import net.sf.jasperreports.engine.query.JsonQueryExecuterFactory;
import net.sf.jasperreports.engine.util.JRSaver;

@Service
public class SendaiMonitorIndicatorsReportImpl {
	private final Logger log = LoggerFactory.getLogger(SendaiMonitorIndicatorsReportImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DisasterRepository disasterRepository;

	@Autowired
	HumanPopulationRepository humanPopulationRepository;

	@Autowired
	InfrastructureRepository infrastructureRepository;

	@Autowired
	LiveStockRepository liveStockRepository;

	@Autowired
	HouseholdRepository householdRepository;

	@Autowired
	CropRepository cropRepository;

	@Autowired
	HelperUtils helperUtils;

	public ResponseEntity<InputStreamResource> exportReport(HttpServletResponse response, String reportFormat,
			String disasterId) throws JRException, IOException {

		try {
			log.debug("Request to generate report");
			Map<String, Object> params = new HashMap<>();
			params.put(JsonQueryExecuterFactory.JSON_DATE_PATTERN, "yyyy-MM-dd");
			params.put(JsonQueryExecuterFactory.JSON_NUMBER_PATTERN, "#,##0.##");
			params.put(JsonQueryExecuterFactory.JSON_LOCALE, Locale.ENGLISH);
			params.put(JRParameter.REPORT_LOCALE, Locale.US);

			DisasterReportDTO rpt = new DisasterReportDTO();
			rpt.setDate(LocalDate.now().toString());

			List<DisasterDetailListDTO> co = new ArrayList<DisasterDetailListDTO>();
			Disaster disaster = disasterRepository.findByDisasterId(disasterId);

			DisasterDetailListDTO res = new DisasterDetailListDTO();

			res.setDisasterName(disaster.getName());
			res.setCaseNumber(disaster.getCaseId());
			log.debug("Request to generate report before helper {}:", disaster.getCaseId());

			if (disaster.getLocation() != null) {
				res.setLocationName(
						helperUtils.getLocationName(disaster.getLocation().toString(), disaster.getLocationId()));
			}

			res.setDisasterCategory(disaster.getDisasterCategory().getName());
			res.setDisasterType(disaster.getDisasterType().getName());

			if (disaster.getCause() != null) {
				res.setCause(disaster.getCause());
			}

			if (disaster.getDescription() != null) {
				res.setDescription(disaster.getDescription());
			}

			log.debug("Request to disaster details");
			List<HumanPopulationFaltenerDTO> flattened = new ArrayList<>();

			List<PopulationDisabilityCategoryDTO> categories = helperUtils.getHumanPopulationCategories();

			for (PopulationDisabilityCategoryDTO cat : categories) {

				Integer value = 0;
				List<HumanPopulation> humanP = humanPopulationRepository
						.getHumanPopulationByTypeDisabilityAndDisasterId(cat.getPopulationType().toString(),
								cat.getDisablity(), disaster.getDisasterId(), value);

				HumanPopulationFaltenerDTO hDto = new HumanPopulationFaltenerDTO();
				for (HumanPopulation p : humanP) {
					String populationName = cat.getPopulationType().toString().replace("_", " ");
					String ageGroup = cat.getAgeRange();
					String populationType = populationName + " " + ageGroup;
					hDto.setPopulationType(populationType);
					hDto.setDisability(cat.getDisablity());

					if (p.getHumanPopulationDisasterCategoryName().equals("deaths")) {
						hDto.setDeathsValue(p.getValue());
					}

					if (p.getHumanPopulationDisasterCategoryName().equals("ill")) {
						hDto.setMissingValue(p.getValue());
					}

					if (p.getHumanPopulationDisasterCategoryName().equals("missing")) {
						hDto.setDisplacedValue(p.getValue());
					}

					if (p.getHumanPopulationDisasterCategoryName().equals("displaced")) {
						hDto.setIllValue(p.getValue());
					}

					if (p.getHumanPopulationDisasterCategoryName().equals("injuries")) {
						hDto.setInjuriesValue(p.getValue());
					}

				}
				flattened.add(hDto);

			}

			flattened.sort(Comparator.comparing(HumanPopulationFaltenerDTO::getPopulationType)
					.thenComparing(HumanPopulationFaltenerDTO::getDisability));

			res.setHumanPopulation(flattened);

			List<Infrastructure> inf = infrastructureRepository
					.findByDisasterIdOrderByInfractructureTypeName(disaster.getDisasterId());

			List<InfrastructureDTO> infList = new ArrayList<>();
			for (Infrastructure i : inf) {
				InfrastructureDTO infDTO = new InfrastructureDTO();

				if (i.getDamaged() != null || i.getDestroyed() != null || i.getValue() != null) {
					infDTO.setDamaged(i.getDamaged());
					infDTO.setDestroyed(i.getDestroyed());
					infDTO.setValue(i.getValue());
					infDTO.setInfractructureType(i.getInfractructureType().getName());
					infList.add(infDTO);
				}

			}

			res.setInfrastructure(infList);

			List<LiveStock> lv = liveStockRepository.findByDisasterIdOrderByLiveStockTypeName(disasterId);

			log.debug("liveStock Repository ********************: {} ", lv);

			List<LiveStockDTO> lvList = new ArrayList<>();

			for (LiveStock l : lv) {
				LiveStockDTO lvDTO = new LiveStockDTO();
				if (l.getEstimatedLoss() != null || l.getDied() != null) {

					lvDTO.setEstimatedLoss(l.getEstimatedLoss());
					lvDTO.setDied(l.getDied());
					lvDTO.setLiveStockTypeId(l.getLiveStockType().getName());
					lvList.add(lvDTO);
				}

			}

			res.setLiveStocks(lvList);

			List<Crop> crops = cropRepository.findByDisasterIdOrderByCropTypeName(disasterId);

			log.debug("crop Repository ********************: {} ", crops);

			List<CropDTO> cpList = new ArrayList<>();
			for (Crop crop : crops) {
				CropDTO cropDTO = new CropDTO();

				if (crop.getEstimatedLoss() != null || crop.getHecterageAffected() != null) {
					cropDTO.setEstimatedLoss(crop.getEstimatedLoss());
					cropDTO.setHecterageAffected(crop.getHecterageAffected());
					cropDTO.setCropTypeId(crop.getCropType().getName());
					cpList.add(cropDTO);
				}

			}

			res.setCrops(cpList);

			List<Household> houseHolds = householdRepository.findByDisasterIdOrderByHouseholdTypeName(disasterId);

			List<HouseholdDTO> houseHoldsList = new ArrayList<>();

			for (Household h : houseHolds) {
				HouseholdDTO household = new HouseholdDTO();

				household.setHouseholdTypeName(h.getHouseholdType().getName());
				household.setNumberOfHouseholds(h.getNumberOfHouseholds());
				household.setNumberChildHeaded(h.getNumberChildHeaded());
				household.setNumberFemaleHeaded(h.getNumberFemaleHeaded());
				household.setNumberOfPeopleAffected(h.getNumberOfPeopleAffected());

				houseHoldsList.add(household);

			}

			res.setHouseholds(houseHoldsList);

			co.add(res);

			rpt.setDocumentList(co);

			String json = new ObjectMapper().writeValueAsString(rpt);
			// log.debug("JSON Payload.......... : {} ", json);

			String reportName = "patient-report(s)" + LocalDateTime.now().toString();

			// FileWriter filez = new FileWriter(reportName);

			OutputStreamWriter filez = new OutputStreamWriter(new FileOutputStream(reportName), StandardCharsets.UTF_8);
			filez.write(json.toString());
			filez.close();
			File wriiten = new File(reportName);

			InputStream stream = new ByteArrayInputStream(rpt.toString().getBytes(StandardCharsets.UTF_8));
			JRDataSource jsonDataSource = new JsonDataSource(wriiten);
			if (wriiten.delete()) {
				System.out.println("Json File deleted successfully");
			} else {
				System.out.println("Failed to delete the Json file");
			}

			// Read jrxml files -> compile reports -> then save jasper files
			InputStream masterStream = getClass().getResourceAsStream("/MasterTest.jrxml");
			JasperReport jasperReport = JasperCompileManager.compileReport(masterStream);
			JRSaver.saveObject(jasperReport, "MasterTest.jasper");

			InputStream subreportStream = getClass().getResourceAsStream("/subreport.jrxml");
			JasperReport subReport = JasperCompileManager.compileReport(subreportStream);
			JRSaver.saveObject(subReport, "subreport.jasper");

			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, jsonDataSource);

			response.setContentType("application/x-download");
			response.addHeader("Content-Disposition", "attachement; filename=patient-results.pdf");
			JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
			// JasperExportManager.exportReportToPdfFile(jasperPrint,
			// "/home/senaite/test.pdf");

		} catch (Exception e) {
		}

		return null;
		// return "report generated in path : " + path;
	}

}
