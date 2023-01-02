package disaster.loss.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import disaster.loss.repository.SendaiMonitorAggregateTartgetFRepository;
import disaster.loss.service.dto.CrossTab;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Service
public class GlobalTargetFHelper {
	@Autowired
	SendaiMonitorAggregateTartgetFRepository sendaiMonitorGroupByMonthRepository;

	public void getGlobalTargetF(ArrayList<CrossTab> beans, LocalDate dateFrom, LocalDate dateTo) {
		
		beans.add(new CrossTab("", "", ""));

		// D-1 (compound) Damage to critical infrastructure attributed to disasters.
		ISendaiAggregateDTO damagedToCriticalInfrastucture = sendaiMonitorGroupByMonthRepository
				.damagedToCriticalInfrastucture(dateFrom, dateTo);
		beans.add(new CrossTab("", damagedToCriticalInfrastucture.getTitle(),
				"0"));

		// D-2 Number of destroyed or damaged health facilities attributed to disasters.
		ISendaiAggregateDTO destroyedOrDamagedHealthFacilities = sendaiMonitorGroupByMonthRepository
				.destroyedOrDamagedHealthFacilities(dateFrom, dateTo);
		beans.add(new CrossTab("", destroyedOrDamagedHealthFacilities.getTitle(),
				"0"));

		// D-3 Number of destroyed or damaged educational facilities attributed to
		// disasters.
		ISendaiAggregateDTO damagedOrDestroyedEducationalFacilities = sendaiMonitorGroupByMonthRepository
				.damagedOrDestroyedEducationalFacilities(dateFrom, dateTo);
		beans.add(new CrossTab("", damagedOrDestroyedEducationalFacilities.getTitle(),
				"0"));

		// D-4 Number of other destroyed or damaged critical infrastructure units and
		// facilities attributed to disasters.
		ISendaiAggregateDTO OtherdamagedOrDestroyed = sendaiMonitorGroupByMonthRepository
				.OtherdamagedOrDestroyed(dateFrom, dateTo);
		beans.add(new CrossTab("", OtherdamagedOrDestroyed.getTitle(),"0"));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToBasicDervices = sendaiMonitorGroupByMonthRepository
				.disruptionsToBasicDervices(dateFrom, dateTo);
		beans.add(new CrossTab("", disruptionsToBasicDervices.getTitle(), "0"));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToEducationalServices = sendaiMonitorGroupByMonthRepository
				.disruptionsToEducationalServices(dateFrom, dateTo);
		beans.add(new CrossTab("", disruptionsToEducationalServices.getTitle(),
				"0"));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToHeathServices = sendaiMonitorGroupByMonthRepository
				.disruptionsToHeathServices(dateFrom, dateTo);
		beans.add(new CrossTab("", disruptionsToHeathServices.getTitle(), "0"));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToOtherBasicServices = sendaiMonitorGroupByMonthRepository
				.disruptionsToOtherBasicServices(dateFrom, dateTo);
		beans.add(new CrossTab("", disruptionsToOtherBasicServices.getTitle(),
				"0"));
	}

	private String getQueryResult(ISendaiAggregateDTO disruptionsToOtherBasicServices) {
		return disruptionsToOtherBasicServices.getTotalCount() != null
				? disruptionsToOtherBasicServices.getTotalCount().toString()
				: "0";
	}
}
