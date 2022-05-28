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
import disaster.loss.service.impl.DonatonLineListingReportImpl;
import net.sf.jasperreports.engine.JRException;

@RestController
public class DonationLineListingReportResource {
    private final Logger log = LoggerFactory.getLogger(DonationLineListingReportResource.class);

    @Autowired
    private DonatonLineListingReportImpl service;

    @GetMapping("/api/donation-line-listing/{format}")
    public ResponseEntity<InputStreamResource> generateReport(
        HttpServletResponse response,
        @PathVariable String format,
        LineListingFiltersDTO filters
    )
        throws JRException, IOException {
        log.debug("Donation Line listing filters: {}", filters);
        return service.exportReport(response, format, filters);
    }
}
