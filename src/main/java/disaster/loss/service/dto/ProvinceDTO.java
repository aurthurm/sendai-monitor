package disaster.loss.service.dto;

import java.util.ArrayList;

import disaster.loss.domain.District;

public class ProvinceDTO {
	public String name;

	public String id;

	public int level;

	public ArrayList<DistrictDTO> districts;

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

	public ArrayList<DistrictDTO> getDistricts() {
		return districts;
	}

	public void setDistricts(ArrayList<DistrictDTO> districts) {
		this.districts = districts;
	}

	@Override
	public String toString() {
		return "ProvinceDTO [name=" + name + ", id=" + id + ", level=" + level + ", districts=" + districts + "]";
	}

}
