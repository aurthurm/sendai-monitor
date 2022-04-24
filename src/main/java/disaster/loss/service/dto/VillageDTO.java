package disaster.loss.service.dto;

import java.util.ArrayList;

import disaster.loss.domain.Ward;

public class VillageDTO {
	public String name;

	public int level;

	public String id;


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "VillageDTO [name=" + name + ", level=" + level + ", id=" + id + "]";
	}



}
