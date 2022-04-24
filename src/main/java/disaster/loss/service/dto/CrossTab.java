package disaster.loss.service.dto;

import java.util.Objects;

public class CrossTab {

	private String header;
	private String row;
	private String value;

	public CrossTab() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CrossTab(String header, String row, String value) {
		super();
		this.header = header;
		this.row = row;
		this.value = value;
	}

	public String getHeader() {
		return header;
	}

	public void setHeader(String header) {
		this.header = header;
	}

	public String getRow() {
		return row;
	}

	public void setRow(String row) {
		this.row = row;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public int hashCode() {
		return Objects.hash(header, row, value);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CrossTab other = (CrossTab) obj;
		return Objects.equals(header, other.header) && Objects.equals(row, other.row)
				&& Objects.equals(value, other.value);
	}

	@Override
	public String toString() {
		return "CrossTab [header=" + header + ", row=" + row + ", value=" + value + "]";
	}


}
