package disaster.loss.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import disaster.loss.repository.DepartmentRepository;
import disaster.loss.repository.DisasterRepository;
import disaster.loss.repository.SendaiMonitorCropCustomReportRepository;
import disaster.loss.service.dto.CropCustomReportDTO;
import disaster.loss.service.dto.ICropCustomReportDTO;
import disaster.loss.service.dto.LineListingFiltersDTO;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.jasperreports.export.SimpleXlsReportConfiguration;

@Service
public class SendaiMonitorCustomReportImpl {
	private final Logger log = LoggerFactory.getLogger(SendaiMonitorCustomReportImpl.class);

	@Autowired
	private SendaiMonitorCropCustomReportRepository cropRepository;

	/*
	 * SELECT ct.name, sum(c.hecterage_affected) as hecterage_affected,
	 * sum(c.estimated_loss) as estimated_loss FROM public.crop c inner join
	 * public.crop_type ct on c.crop_type_id = ct.crop_type_id group by ct.name
	 * ORDER BY ct.name ASC LIMIT 100
	 */

	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	DisasterRepository disasterRepository;

	public ResponseEntity<InputStreamResource> exportReport(HttpServletResponse response, String reportFormat,
			LineListingFiltersDTO filters) throws JRException, IOException {

		File tempFile = File.createTempFile("jasperReport", ".pdf");
		List<CropCustomReportDTO> flattenedDonations = new ArrayList<>();

		log.debug("Request to print crop ************************.......... : {} {} ", filters.getDateFrom(),
				filters.getDateTo());
		List<ICropCustomReportDTO> crops = cropRepository.findByDateIssuedBetween(filters.getDateFrom(),
				filters.getDateTo());
		
		log.debug("Request to print LIST crops@ ************************.......... : {} ", crops);

		for (ICropCustomReportDTO crop : crops) {

			log.debug("Request to print crops@ ************************.......... : {} ", crop);

			CropCustomReportDTO dn = new CropCustomReportDTO();

			if (crop != null) {
				dn.setName(crop.getName() != null ? crop.getName().toString() : "Unknown");
				dn.setHecterageAffected(crop.getHecterageAffected());
				dn.setEstimatedLoss(crop.getEstimatedLoss());

				flattenedDonations.add(dn);
			}

		}

		log.debug("Print Data before jasper ************************************.......... : {} ", flattenedDonations);

		InputStream masterStream = getClass().getResourceAsStream("/Crop_A4.jrxml");
		JasperReport jasperReport = JasperCompileManager.compileReport(masterStream);
		JRSaver.saveObject(jasperReport, "Crop_A4.jasper");
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "NMRL");

		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(flattenedDonations);

		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

		log.debug("Print jasperPrint before format conversion ************************************.......... : {} ",
				jasperPrint);

		if (reportFormat.equalsIgnoreCase("html")) {
			// JasperExportManager.exportReportToHtmlFile(jasperPrint, path +
			// "/employees.html");
		}
		if (reportFormat.equalsIgnoreCase("pdf")) {
			JasperExportManager.exportReportToPdfFile(jasperPrint, tempFile.getAbsolutePath());

			response.setContentType("application/x-download");
			response.addHeader("Content-Disposition", "attachement; filename=jasper.pdf");
			JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
		}
		if (reportFormat.equalsIgnoreCase("xml")) {

			String outXlsName = "/home/senaite/test.csv";
			HashMap pdfParams = new HashMap();
			HashMap xlsParams = new HashMap();

			JRBeanCollectionDataSource beanCollectionDataSource = new JRBeanCollectionDataSource(flattenedDonations);
			try {
				JRXlsExporter xlsExporter = new JRXlsExporter();

				xlsExporter.setExporterInput(new SimpleExporterInput(jasperPrint));
				xlsExporter.setExporterOutput(new SimpleOutputStreamExporterOutput(outXlsName));
				SimpleXlsReportConfiguration xlsReportConfiguration = new SimpleXlsReportConfiguration();
				xlsReportConfiguration.setOnePagePerSheet(false);
				xlsReportConfiguration.setRemoveEmptySpaceBetweenRows(true);
				xlsReportConfiguration.setDetectCellType(false);
				xlsReportConfiguration.setWhitePageBackground(false);
				xlsExporter.setConfiguration(xlsReportConfiguration);

				xlsExporter.exportReport();
			} catch (JRException e) {
				e.printStackTrace();
			}
		}
		if (reportFormat.equalsIgnoreCase("xls")) {
			try (
					// InputStream templateStream =
					// ReportImpl.class.getResourceAsStream("classpath:Simple_Blueb.jrxml");
					ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
				// final JasperReport jasperReportxl =
				// JasperCompileManager.compileReport(templateStream);

				// Disable pagination throught parameter
				// P. S. New pages are still created if row cound is more than 65535!
				final Map<String, Object> parametersxl = new HashMap<>();
				parameters.put(JRParameter.IS_IGNORE_PAGINATION, true);

				final JRBeanCollectionDataSource dataSourcexl = new JRBeanCollectionDataSource(flattenedDonations);
				final JasperPrint jasperPrintxl = JasperFillManager.fillReport(jasperReport, parametersxl,
						dataSourcexl);

				SimpleXlsReportConfiguration configuration = new SimpleXlsReportConfiguration();
				configuration.setOnePagePerSheet(false);
				configuration.setDetectCellType(true); // Detect cell types (date and etc.)
				configuration.setWhitePageBackground(false); // No white background!
				configuration.setFontSizeFixEnabled(false);

				// No spaces between rows and columns
				configuration.setRemoveEmptySpaceBetweenRows(true);
				configuration.setRemoveEmptySpaceBetweenColumns(true);

				// If you want to name sheets then uncomment this line
				// configuration.setSheetNames(new String[] { "Data" });
				final JRXlsExporter exporter = new JRXlsExporter();
				exporter.setConfiguration(configuration);
				exporter.setExporterInput(new SimpleExporterInput(jasperPrintxl));

				try (ByteArrayOutputStream excelStream = new ByteArrayOutputStream();
						FileOutputStream fos = new FileOutputStream("result.xls")) {
					// OutputStreamExporterOutput exporterOutput = new
					// SimpleOutputStreamExporterOutput(excelStream);

					// exporter.setExporterOutput(exporterOutput);
					exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(response.getOutputStream()));

					exporter.exportReport();

					// excelStream.writeTo(fos);

					// JasperExportManager.exportReportToPdfFile(jasperPrint,
					// tempFile.getAbsolutePath());

					response.setContentType("application/octet-stream");
					response.addHeader("Content-Disposition", "attachement; filename=jasper.xlsx");
					// JasperExportManager.expo //.exportReportToPdfStream(jasperPrint,
					// response.getOutputStream());
				}
			}
		}

		return null;
		// return "report generated in path : " + path;
	}
}
