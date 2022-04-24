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

import disaster.loss.repository.SendaiMonitorAggregateMonthRepository;
import disaster.loss.service.dto.CrossTab;
import disaster.loss.service.dto.ICountByMonthDTO;
import disaster.loss.service.dto.ISendaiAggregateDTO;
import disaster.loss.service.dto.ReportFiltersDTO;

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
public class SendaiMonitorAggregateTargetBReportImpl {

	private final Logger log = LoggerFactory.getLogger(SendaiMonitorAggregateTargetBReportImpl.class);

	@Autowired
	SendaiMonitorAggregateMonthRepository sendaiMonitorGroupByMonthRepository;

	public ResponseEntity<InputStreamResource> exportReport(HttpServletResponse response, String reportFormat,
			ReportFiltersDTO filters) throws JRException, IOException {

		String path = "/home/senaite";
		File tempFile = File.createTempFile("jasperReport", ".pdf");

		InputStream masterStream = getClass().getResourceAsStream("/sendai_monitor_aggregate_global_targert_b.jrxml");
		JasperReport jasperReport = JasperCompileManager.compileReport(masterStream);
		JRSaver.saveObject(jasperReport, "sendai_monitor_aggregate_global_targert_b.jasper");
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("createdBy", "Java Techie");

		ArrayList<CrossTab> beans = new ArrayList<>();

		// B-1 (compound) Number of directly affected people attributed to disasters,
		// per 100,000 population.
		ISendaiAggregateDTO numberOfDeaths = sendaiMonitorGroupByMonthRepository.numberOfDirectlyAffectedPeople();
		beans.add(new CrossTab("", numberOfDeaths.getTitle(), numberOfDeaths.getTotalCount().toString()));

		// B-2 Number of injured or ill people attributed to disasters, per 100,000
		// population.
		ISendaiAggregateDTO numberOfMissingPersons = sendaiMonitorGroupByMonthRepository.numberOfInjuredOrIllPeople();
		beans.add(
				new CrossTab("", numberOfMissingPersons.getTitle(), numberOfMissingPersons.getTotalCount().toString()));

		// B-3 Number of people whose damaged dwellings were attributed to disasters.
		ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDamaged = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseDwellingsWhereDamaged();
		beans.add(new CrossTab("", numberOfPeopleWhoseDwellingsWhereDamaged.getTitle(),
				numberOfPeopleWhoseDwellingsWhereDamaged.getTotalCount().toString()));

		// B-4 Number of people whose destroyed dwellings were attributed to disasters.
		ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDestroyed = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseDwellingsWhereDestroyed();
		beans.add(new CrossTab("", numberOfPeopleWhoseDwellingsWhereDestroyed.getTitle(),
				numberOfPeopleWhoseDwellingsWhereDestroyed.getTotalCount().toString()));

		//B-5	Number of people whose livelihoods were disrupted or destroyed, attributed to disasters.
		ISendaiAggregateDTO numberOfPeopleWhoseLivelihoodsWereDisrupted = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseLivelihoodsWereDisrupted();
		beans.add(new CrossTab("", numberOfPeopleWhoseLivelihoodsWereDisrupted.getTitle(),
				numberOfPeopleWhoseLivelihoodsWereDisrupted.getTotalCount().toString()));

		log.debug("Print beans ************************************.......... : {} ", beans);

		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(beans);

		// JRBeanCollectionDataSource dataSource = new
		// JRBeanCollectionDataSource(employees);

		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

		log.debug("Print jasperPrint before format conversion ************************************.......... : {} ",
				jasperPrint);

		if (reportFormat.equalsIgnoreCase("html")) {
			JasperExportManager.exportReportToHtmlFile(jasperPrint, path + "/employees.html");
		}
		if (reportFormat.equalsIgnoreCase("pdf")) {
			JasperExportManager.exportReportToPdfFile(jasperPrint, tempFile.getAbsolutePath());

			response.setContentType("application/x-download");
			response.addHeader("Content-Disposition", "attachement; filename=jasper.pdf");
			JasperExportManager.exportReportToPdfStream(jasperPrint, response.getOutputStream());
		}
		if (reportFormat.equalsIgnoreCase("xml")) {

			String outXlsName = "/home/senaite/test.csv";

			// JRBeanCollectionDataSource beanCollectionDataSource = new
			// JRBeanCollectionDataSource(employees);
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

				final JRBeanCollectionDataSource dataSourcexl = new JRBeanCollectionDataSource(beans);
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
