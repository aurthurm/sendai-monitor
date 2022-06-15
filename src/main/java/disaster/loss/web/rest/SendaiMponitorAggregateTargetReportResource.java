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

import disaster.loss.service.dto.ReportFiltersDTO;
import disaster.loss.service.impl.SendaiMonitorFrameworkReportImpl;
import disaster.loss.service.impl.SendaiMonitorAggregateTargetBReportImpl;
import disaster.loss.service.impl.SendaiMonitorAggregateTargetCReportImpl;

import net.sf.jasperreports.engine.JRException;

@RestController
public class SendaiMponitorAggregateTargetReportResource {
    private final Logger log = LoggerFactory.getLogger(SendaiMponitorAggregateTargetReportResource.class);

    @Autowired
    private SendaiMonitorFrameworkReportImpl sendaiMonitorFramewokReportImpl;

    @Autowired
    private SendaiMonitorAggregateTargetBReportImpl serviceB;

    @Autowired
    private SendaiMonitorAggregateTargetCReportImpl serviceC;

    @GetMapping("/api/sendai-monitor-aggregate-target-a/{format}")
    public ResponseEntity<InputStreamResource> generateReportTargertA(HttpServletResponse response, @PathVariable String format, ReportFiltersDTO filters)
        throws JRException, IOException {
        log.debug("sendai-monitor-aggregate target a: {}", filters);
        return sendaiMonitorFramewokReportImpl.exportReport(response, format, filters);
    }

    @GetMapping("/api/sendai-monitor-aggregate-target-b/{format}")
    public ResponseEntity<InputStreamResource> generateReportTargertB(HttpServletResponse response, @PathVariable String format, ReportFiltersDTO filters)
        throws JRException, IOException {
        log.debug("sendai-monitor-aggregate target b: {}", filters);
        return serviceB.exportReport(response, format, filters);
    }
    @GetMapping("/api/sendai-monitor-aggregate-target-c/{format}")
    public ResponseEntity<InputStreamResource> generateReportTargertC(HttpServletResponse response, @PathVariable String format, ReportFiltersDTO filters)
        throws JRException, IOException {
        log.debug("sendai-monitor-aggregate target c: {}", filters);
        return serviceC.exportReport(response, format, filters);
    }

}
