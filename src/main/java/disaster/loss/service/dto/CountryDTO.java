package disaster.loss.service.dto;

import java.util.ArrayList;

public class CountryDTO {
	public String name;

	public String id;

	public int level;

	public ArrayList<ProvinceDTO> provinces;

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

	public ArrayList<ProvinceDTO> getProvinces() {
		return provinces;
	}

	public void setProvinces(ArrayList<ProvinceDTO> provinces) {
		this.provinces = provinces;
	}

	@Override
	public String toString() {
		return "CountryDTO [name=" + name + ", id=" + id + ", level=" + level + ", provinces=" + provinces + "]";
	}

}
