package disaster.loss.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import disaster.loss.repository.SendaiMonitorAggregateTartgetDRepository;
import disaster.loss.service.dto.CrossTab;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Service
public class GlobalTargetDHelper {
	@Autowired
	SendaiMonitorAggregateTartgetDRepository sendaiMonitorGroupByMonthRepository;

	public void getGlobalTargetD(ArrayList<CrossTab> beans, LocalDate dateFrom, LocalDate dateTo) {

		beans.add(new CrossTab("", "", ""));
		beans.add(new CrossTab("",
				"Global target D: Substantially reduce disaster damage to critical infrastructure and disruption of basic services, among them health and educational facilities, including through developing their resilience by 2030",
				""));
		beans.add(new CrossTab("", "", ""));

		// D-1 (compound) Damage to critical infrastructure attributed to disasters.
		ISendaiAggregateDTO damagedToCriticalInfrastucture = sendaiMonitorGroupByMonthRepository
				.damagedToCriticalInfrastucture(dateFrom, dateTo);
		beans.add(new CrossTab("", damagedToCriticalInfrastucture.getTitle(),
				getQueryResult(damagedToCriticalInfrastucture)));

		// D-2 Number of destroyed or damaged health facilities attributed to disasters.
		ISendaiAggregateDTO destroyedOrDamagedHealthFacilities = sendaiMonitorGroupByMonthRepository
				.destroyedOrDamagedHealthFacilities(dateFrom, dateTo);
		beans.add(new CrossTab("", destroyedOrDamagedHealthFacilities.getTitle(),
				getQueryResult(destroyedOrDamagedHealthFacilities)));

		// D-3 Number of destroyed or damaged educational facilities attributed to disasters.
		ISendaiAggregateDTO damagedOrDestroyedEducationalFacilities = sendaiMonitorGroupByMonthRepository
				.damagedOrDestroyedEducationalFacilities(dateFrom, dateTo);
		beans.add(new CrossTab("", damagedOrDestroyedEducationalFacilities.getTitle(),
				getQueryResult(damagedOrDestroyedEducationalFacilities)));

		// D-4 Number of other destroyed or damaged critical infrastructure units and facilities attributed to disasters.
		ISendaiAggregateDTO OtherdamagedOrDestroyed = sendaiMonitorGroupByMonthRepository.OtherdamagedOrDestroyed(dateFrom, dateTo);
		beans.add(new CrossTab("", OtherdamagedOrDestroyed.getTitle(),
				getQueryResult(OtherdamagedOrDestroyed)));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToBasicDervices = sendaiMonitorGroupByMonthRepository
				.disruptionsToBasicDervices(dateFrom, dateTo);
		beans.add(new CrossTab("", disruptionsToBasicDervices.getTitle(),
				getQueryResult(disruptionsToBasicDervices)));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToEducationalServices = sendaiMonitorGroupByMonthRepository
				.disruptionsToEducationalServices(dateFrom, dateTo);
		beans.add(new CrossTab("", disruptionsToEducationalServices.getTitle(),
				getQueryResult(disruptionsToEducationalServices)));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToHeathServices = sendaiMonitorGroupByMonthRepository
				.disruptionsToEducationalServices(dateFrom, dateTo);
		beans.add(new CrossTab("", disruptionsToHeathServices.getTitle(),
				getQueryResult(disruptionsToHeathServices)));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToOtherBasicServices = sendaiMonitorGroupByMonthRepository
				.disruptionsToEducationalServices(dateFrom, dateTo);
		beans.add(new CrossTab("", disruptionsToOtherBasicServices.getTitle(),
				getQueryResult(disruptionsToOtherBasicServices)));
	}

	private String getQueryResult(ISendaiAggregateDTO disruptionsToOtherBasicServices) {
		return disruptionsToOtherBasicServices.getTotalCount()!=null ? disruptionsToOtherBasicServices.getTotalCount().toString():"0";
	}
}
