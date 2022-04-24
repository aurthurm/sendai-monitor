package disaster.loss.service.dto;

public class MonthGroup {

	private String month;

	private String title;

	private int count;

	public MonthGroup(String month, String title, int count) {
		super();
		this.month = month;
		this.title = title;
		this.count = count;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "MonthGroup [month=" + month + ", count=" + count + "]";
	}


}
