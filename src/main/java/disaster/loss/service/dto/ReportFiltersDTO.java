package disaster.loss.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;

/**
 * A DTO for the {@link zw.org.nmrl.domain.Method} entity.
 */
public class ReportFiltersDTO implements Serializable {
    /**
	 *
	 */
	private static final long serialVersionUID = 1L;

	private LocalDate dateFrom;
    private LocalDate dateTo;
    private String fileFormat;
    private String laboratoryId;
    private ArrayList<String> sampleStates;

    public LocalDate getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(LocalDate dateFrom) {
        this.dateFrom = dateFrom;
    }

    public LocalDate getDateTo() {
        return dateTo;
    }

    public void setDateTo(LocalDate dateTo) {
        this.dateTo = dateTo;
    }

    public String getFileFormat() {
        return fileFormat;
    }

    public void setFileFormat(String fileFormat) {
        this.fileFormat = fileFormat;
    }

    public String getLaboratoryId() {
        return laboratoryId;
    }

    public void setLaboratoryId(String laboratoryId) {
        this.laboratoryId = laboratoryId;
    }

    public ArrayList<String> getSampleStates() {
        return sampleStates;
    }

    public void setSampleStates(ArrayList<String> sampleStates) {
        this.sampleStates = sampleStates;
    }

    @Override
    public String toString() {
        return "LineListingFiltersDTO{" +
            "dateFrom='" + dateFrom + '\'' +
            ", dateTo='" + dateTo + '\'' +
            ", fileFormat='" + fileFormat + '\'' +
            ", laboratoryId='" + laboratoryId + '\'' +
            ", sampleStates=" + sampleStates +
            '}';
    }
}
