package disaster.loss.web.rest;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import disaster.loss.service.impl.SendaiMonitorIndicatorsReportImpl;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/api")
public class SendaiMonitorDcpReportResource {
	private final Logger log = LoggerFactory.getLogger(SendaiMonitorDcpReportResource.class);

	@Autowired
	private SendaiMonitorIndicatorsReportImpl service;

	@PostMapping("/sendai-monitor-dcp/{disasterId}/{format}")
	public ResponseEntity<InputStreamResource> generateReport(HttpServletResponse response, @PathVariable String format,
			@PathVariable String disasterId) throws JRException, IOException {
		log.debug("Disaster filters: {}", disasterId);
		return service.exportReport(response, format, disasterId);
	}

}
