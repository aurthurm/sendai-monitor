package disaster.loss.web.rest;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import disaster.loss.service.dto.LineListingFiltersDTO;
import disaster.loss.service.impl.SendaiMonitorCustomReportImpl;
import disaster.loss.service.impl.SendaiMonitorHouseholdCustomReportImpl;
import net.sf.jasperreports.engine.JRException;

@RestController
public class SendaiMonitorCustomReport {
    private final Logger log = LoggerFactory.getLogger(SendaiMonitorCustomReport.class);

    @Autowired
    private SendaiMonitorCustomReportImpl sendaiMonitorCustomReportImpl;
    
    @Autowired
    private SendaiMonitorHouseholdCustomReportImpl sendaiMonitorHouseholdCustomReportImpl;

    @GetMapping("/api/sendai-monitor-crops/{format}")
    public ResponseEntity<InputStreamResource> generateReportCrops(HttpServletResponse response, @PathVariable String format, LineListingFiltersDTO filters)
        throws JRException, IOException {
        log.debug("sendai-monitor-crops: {}", filters);
        return sendaiMonitorCustomReportImpl.exportReport(response, format, filters);
    }
    
    @GetMapping("/api/sendai-monitor-household/{format}")
    public ResponseEntity<InputStreamResource> generateReportHousehold(HttpServletResponse response, @PathVariable String format, LineListingFiltersDTO filters)
        throws JRException, IOException {
        log.debug("sendai-monitor-house hold: {}", filters);
        return sendaiMonitorHouseholdCustomReportImpl.exportReport(response, format, filters);
    }
    
}
