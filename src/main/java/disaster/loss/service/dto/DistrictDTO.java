package disaster.loss.service.dto;

import java.util.ArrayList;

import disaster.loss.domain.Village;

public class DistrictDTO {
	public String name;

	public String id;

	public int level;

	public ArrayList<WardDTO> wards;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public ArrayList<WardDTO> getWards() {
		return wards;
	}

	public void setWards(ArrayList<WardDTO> wards) {
		this.wards = wards;
	}

	@Override
	public String toString() {
		return "DistrictDTO [name=" + name + ", id=" + id + ", level=" + level + ", wards=" + wards + "]";
	}

}
