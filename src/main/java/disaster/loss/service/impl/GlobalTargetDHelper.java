package disaster.loss.service.impl;

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

	public void getGlobalTargetD(ArrayList<CrossTab> beans) {

		beans.add(new CrossTab("", "", ""));
		beans.add(new CrossTab("",
				"Global target D: Substantially reduce disaster damage to critical infrastructure and disruption of basic services, among them health and educational facilities, including through developing their resilience by 2030",
				""));
		beans.add(new CrossTab("", "", ""));

		// Number of deaths and missing persons
		ISendaiAggregateDTO damagedToCriticalInfrastucture = sendaiMonitorGroupByMonthRepository
				.damagedToCriticalInfrastucture();
		beans.add(new CrossTab("", damagedToCriticalInfrastucture.getTitle(),
				damagedToCriticalInfrastucture.getTotalCount().toString()));

		// number of deaths
		ISendaiAggregateDTO destroyedOrDamagedHealthFacilities = sendaiMonitorGroupByMonthRepository.destroyedOrDamagedHealthFacilities();
		beans.add(new CrossTab("", destroyedOrDamagedHealthFacilities.getTitle(), destroyedOrDamagedHealthFacilities.getTotalCount().toString()));

		// number of missing persons
		ISendaiAggregateDTO damagedOrDestroyedEducationalFacilities = sendaiMonitorGroupByMonthRepository
				.damagedOrDestroyedEducationalFacilities();
		beans.add(
				new CrossTab("", damagedOrDestroyedEducationalFacilities.getTitle(), damagedOrDestroyedEducationalFacilities.getTotalCount().toString()));


		// number of missing persons
		ISendaiAggregateDTO OtherdamagedOrDestroyed = sendaiMonitorGroupByMonthRepository
				.OtherdamagedOrDestroyed();
		beans.add(
				new CrossTab("", OtherdamagedOrDestroyed.getTitle(), OtherdamagedOrDestroyed.getTotalCount().toString()));

		// number of missing persons
		ISendaiAggregateDTO disruptionsToBasicDervices = sendaiMonitorGroupByMonthRepository
				.disruptionsToBasicDervices();
		beans.add(
				new CrossTab("", disruptionsToBasicDervices.getTitle(), disruptionsToBasicDervices.getTotalCount().toString()));

		// number of missing persons
				ISendaiAggregateDTO disruptionsToEducationalServices = sendaiMonitorGroupByMonthRepository
						.disruptionsToEducationalServices();
				beans.add(
						new CrossTab("", disruptionsToEducationalServices.getTitle(), disruptionsToEducationalServices.getTotalCount().toString()));

				// number of missing persons
				ISendaiAggregateDTO disruptionsToHeathServices = sendaiMonitorGroupByMonthRepository
						.disruptionsToEducationalServices();
				beans.add(
						new CrossTab("", disruptionsToHeathServices.getTitle(), disruptionsToHeathServices.getTotalCount().toString()));

				// number of missing persons
				ISendaiAggregateDTO disruptionsToOtherBasicServices = sendaiMonitorGroupByMonthRepository
						.disruptionsToEducationalServices();
				beans.add(
						new CrossTab("", disruptionsToOtherBasicServices.getTitle(), disruptionsToOtherBasicServices.getTotalCount().toString()));
	}
}
