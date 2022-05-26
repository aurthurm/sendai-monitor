package disaster.loss.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import disaster.loss.repository.SendaiMonitorAggregateTartgetCRepository;
import disaster.loss.service.dto.CrossTab;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Service
public class GlobalTargetCHelper {

	@Autowired
	SendaiMonitorAggregateTartgetCRepository sendaiMonitorGroupByMonthRepository;

	public void getGlobalTargetC(ArrayList<CrossTab> beans) {

		beans.add(new CrossTab("", "", ""));
		beans.add(new CrossTab("",
				"Global target C: Reduce direct disaster economic loss in relation to global gross domestic product (GDP) by 2030.",
				""));
		beans.add(new CrossTab("", "", ""));
		
		// Number of deaths and missing persons
		ISendaiAggregateDTO economicLoss = sendaiMonitorGroupByMonthRepository
				.economicLoss();
		beans.add(new CrossTab("", economicLoss.getTitle(),
				economicLoss.getTotalCount().toString()));

		// C-2 Direct agricultural loss attributed to disasters
		ISendaiAggregateDTO agriculturlLoss = sendaiMonitorGroupByMonthRepository.agriculturlLoss();
		beans.add(new CrossTab("", agriculturlLoss.getTitle(), agriculturlLoss.getTotalCount().toString()));

		// number of missing persons
		ISendaiAggregateDTO damagedOrDestroyedProductiveAssets = sendaiMonitorGroupByMonthRepository
				.damagedOrDestroyedProductiveAssets();
		beans.add(
				new CrossTab("", damagedOrDestroyedProductiveAssets.getTitle(), damagedOrDestroyedProductiveAssets.getTotalCount().toString()));


		// number of missing persons
		ISendaiAggregateDTO econonicLossInHousingSector = sendaiMonitorGroupByMonthRepository
				.econonicLossInHousingSector();
		beans.add(
				new CrossTab("", econonicLossInHousingSector.getTitle(), econonicLossInHousingSector.getTotalCount().toString()));

		// number of missing persons
		ISendaiAggregateDTO economicLossToInfrastructure = sendaiMonitorGroupByMonthRepository
				.economicLossToInfrastructure();
		beans.add(
				new CrossTab("", economicLossToInfrastructure.getTitle(), economicLossToInfrastructure.getTotalCount().toString()));

		// number of missing persons
				ISendaiAggregateDTO culturalHeritageEconomicLoss = sendaiMonitorGroupByMonthRepository
						.culturalHeritageEconomicLoss();
				beans.add(
						new CrossTab("", culturalHeritageEconomicLoss.getTitle(), culturalHeritageEconomicLoss.getTotalCount().toString()));
	}

}
