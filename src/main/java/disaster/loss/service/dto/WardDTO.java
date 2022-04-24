package disaster.loss.service.dto;

import java.util.ArrayList;

public class WardDTO {

	public String name;

	public String id;

	public int level;

	public ArrayList<VillageDTO> villages;

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

	public ArrayList<VillageDTO> getVillages() {
		return villages;
	}

	public void setVillages(ArrayList<VillageDTO> villages) {
		this.villages = villages;
	}

	@Override
	public String toString() {
		return "WardDTO [name=" + name + ", id=" + id + ", level=" + level + ", villages=" + villages + "]";
	}

}
