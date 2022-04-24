package disaster.loss.service.dto;

import java.util.List;

public class DisasterReportDTO {
	private String date;

	private String year;

	private List<DisasterDetailListDTO> documentList;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public List<DisasterDetailListDTO> getDocumentList() {
		return documentList;
	}

	public void setDocumentList(List<DisasterDetailListDTO> co) {
		this.documentList = co;
	}

	@Override
	public String toString() {
		return "PatientReportDTO [date=" + date + ", year=" + year + ", documentList=" + documentList + "]";
	}



}
