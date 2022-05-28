package disaster.loss.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 * LineListingFiltersDTO
 */
public class LineListingFiltersDTO implements Serializable {
    /**
     *
     */
    private static final long serialVersionUID = 1L;
    private LocalDate dateFrom;
    private LocalDate dateTo;
    private String fileFormat;
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

    public ArrayList<String> getSampleStates() {
        return sampleStates;
    }

    public void setSampleStates(ArrayList<String> sampleStates) {
        this.sampleStates = sampleStates;
    }

    @Override
    public String toString() {
        return (
            "LineListingFiltersDTO{" +
            "dateFrom='" +
            dateFrom +
            '\'' +
            ", dateTo='" +
            dateTo +
            '\'' +
            ", fileFormat='" +
            fileFormat +
            '\'' +
            ", sampleStates=" +
            sampleStates +
            '}'
        );
    }
}
