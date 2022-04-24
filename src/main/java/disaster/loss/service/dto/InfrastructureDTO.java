package disaster.loss.service.dto;

import javax.persistence.Column;

public class InfrastructureDTO {

	private String infractructureType;

	private Integer damaged;

	private Integer destroyed;

	private Float value;

	public String getInfractructureType() {
		return infractructureType;
	}

	public void setInfractructureType(String infractructureType) {
		this.infractructureType = infractructureType;
	}

	public Integer getDamaged() {
		return damaged;
	}

	public void setDamaged(Integer damaged) {
		this.damaged = damaged;
	}

	public Integer getDestroyed() {
		return destroyed;
	}

	public void setDestroyed(Integer destroyed) {
		this.destroyed = destroyed;
	}

	public Float getValue() {
		return value;
	}

	public void setValue(Float value) {
		this.value = value;
	}


}
