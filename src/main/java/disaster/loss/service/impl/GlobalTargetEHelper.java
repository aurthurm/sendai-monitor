package disaster.loss.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import disaster.loss.repository.SendaiMonitorAggregateTartgetERepository;
import disaster.loss.service.dto.CrossTab;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Service
public class GlobalTargetEHelper {
	@Autowired
	SendaiMonitorAggregateTartgetERepository sendaiMonitorGroupByMonthRepository;

	public void getGlobalTargetE(ArrayList<CrossTab> beans, LocalDate dateFrom, LocalDate dateTo) {

		beans.add(new CrossTab("", "", ""));
		beans.add(new CrossTab("",
				"Global target D: Substantially reduce disaster damage to critical infrastructure and disruption of basic services, among them health and educational facilities, including through developing their resilience by 2030",
				""));
		beans.add(new CrossTab("", "", ""));

		// E-1 (compound) Damage to critical infrastructure attributed to disasters.
		ISendaiAggregateDTO damagedToCriticalInfrastucture = sendaiMonitorGroupByMonthRepository
				.damagedToCriticalInfrastucture(dateFrom, dateTo);
		beans.add(new CrossTab("", damagedToCriticalInfrastucture.getTitle(),
				getQueryResult(damagedToCriticalInfrastucture)));

		// E-2 Number of destroyed or damaged health facilities attributed to disasters.
		ISendaiAggregateDTO destroyedOrDamagedHealthFacilities = sendaiMonitorGroupByMonthRepository
				.destroyedOrDamagedHealthFacilities(dateFrom, dateTo);
		beans.add(new CrossTab("", destroyedOrDamagedHealthFacilities.getTitle(),
				getQueryResult(destroyedOrDamagedHealthFacilities)));

		
	}

	private String getQueryResult(ISendaiAggregateDTO disruptionsToOtherBasicServices) {
		return disruptionsToOtherBasicServices.getTotalCount()!=null ? disruptionsToOtherBasicServices.getTotalCount().toString():"0";
	}
}
