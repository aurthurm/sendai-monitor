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

		// D-2 Number of destroyed or damaged health facilities attributed to disasters.
		ISendaiAggregateDTO destroyedOrDamagedHealthFacilities = sendaiMonitorGroupByMonthRepository
				.destroyedOrDamagedHealthFacilities(dateFrom, dateTo);

		String numberDestroyedOrDamagedHealthFacilities = getQueryResult(destroyedOrDamagedHealthFacilities);
		int numberDestroyedOrDamagedHealthFacilitiesToInt = Integer.parseInt(numberDestroyedOrDamagedHealthFacilities);

		// D-3 Number of destroyed or damaged educational facilities attributed to
		// disasters.

		ISendaiAggregateDTO damagedOrDestroyedEducationalFacilities = sendaiMonitorGroupByMonthRepository
				.damagedOrDestroyedEducationalFacilities(dateFrom, dateTo);

		String numberDamagedOrDestroyedEducationalFacilities = getQueryResult(damagedOrDestroyedEducationalFacilities);
		int numberDamagedOrDestroyedEducationalFacilitiesToInt = Integer
				.parseInt(numberDamagedOrDestroyedEducationalFacilities);

		// D-4 Number of other destroyed or damaged critical infrastructure units and
		// facilities attributed to disasters.
		ISendaiAggregateDTO otherdamagedOrDestroyed = sendaiMonitorGroupByMonthRepository
				.OtherdamagedOrDestroyed(dateFrom, dateTo);
		String numberOtherdamagedOrDestroyed = getQueryResult(otherdamagedOrDestroyed);
		int numberOtherdamagedOrDestroyedToInt = Integer.parseInt(numberOtherdamagedOrDestroyed);

		// D-1 (compound) Damage to critical infrastructure attributed to disasters.
		/**
		 * D1 is a compound indicator therefore it gets data from 2, 3, 4 that is why it
		 * is located at the bottom
		 */
		/*
		 * ISendaiAggregateDTO damagedToCriticalInfrastucture =
		 * sendaiMonitorGroupByMonthRepository .damagedToCriticalInfrastucture(dateFrom,
		 * dateTo);
		 */

		int compoundD1 = numberDestroyedOrDamagedHealthFacilitiesToInt
				+ numberDamagedOrDestroyedEducationalFacilitiesToInt + numberOtherdamagedOrDestroyedToInt;

		beans.add(new CrossTab("", "D-1 (compound) Damage to critical infrastructure attributed to disasters.",
				String.valueOf(compoundD1)));

		beans.add(new CrossTab("", destroyedOrDamagedHealthFacilities.getTitle(),
				numberDestroyedOrDamagedHealthFacilities));

		beans.add(new CrossTab("", damagedOrDestroyedEducationalFacilities.getTitle(),
				numberDamagedOrDestroyedEducationalFacilities));

		beans.add(new CrossTab("", otherdamagedOrDestroyed.getTitle(), numberOtherdamagedOrDestroyed));

		// D-6 Number of disruptions to educational services attributed to disasters.
		/*
		 * ISendaiAggregateDTO disruptionsToEducationalServices =
		 * sendaiMonitorGroupByMonthRepository
		 * .disruptionsToEducationalServices(dateFrom, dateTo);
		 */

		// D-7 Number of disruptions to health services attributed to disasters.
		/*
		 * ISendaiAggregateDTO disruptionsToHeathServices =
		 * sendaiMonitorGroupByMonthRepository
		 * .disruptionsToEducationalServices(dateFrom, dateTo);
		 */

		// D-8 Number of disruptions to other basic services attributed to disasters.
		ISendaiAggregateDTO disruptionsToOtherBasicServices = sendaiMonitorGroupByMonthRepository
				.disruptionsToEducationalServices(dateFrom, dateTo);

		// D- 5(compound) Number of disruptions to basic services attributed to
		// disasters.
		/**
		 * D5 is a compound indicator therefore it gets data from 2, 3, 4 that is why it
		 * is located at the bottom
		 */
		beans.add(new CrossTab("", "D- 5(compound) Number of disruptions to basic services attributed to disasters.",
				"-"));

		beans.add(new CrossTab("", "D-6 Number of disruptions to educational services attributed to disasters.", "-"));

		beans.add(new CrossTab("", "D-7 Number of disruptions to health services attributed to disasters.", "-"));

		beans.add(new CrossTab("", "D-8 Number of disruptions to other basic services attributed to disasters.", "-"));

	}

	private String getQueryResult(ISendaiAggregateDTO disruptionsToOtherBasicServices) {
		return disruptionsToOtherBasicServices.getTotalCount() != null
				? disruptionsToOtherBasicServices.getTotalCount().toString()
				: "0";
	}
}
