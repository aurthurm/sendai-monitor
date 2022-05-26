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

		// C-1 (compound) Direct economic loss attributed to disasters in relation to
		// global gross domestic product.
		ISendaiAggregateDTO economicLoss = sendaiMonitorGroupByMonthRepository.economicLoss();
		beans.add(new CrossTab("", economicLoss.getTitle(), economicLoss.getTotalCount().toString()));

		// C-2 Direct agricultural loss attributed to disasters.
		ISendaiAggregateDTO agriculturlLoss = sendaiMonitorGroupByMonthRepository.livestockLoss();
		ISendaiAggregateDTO cropLoss = sendaiMonitorGroupByMonthRepository.crops();
		Long agricLoss = agriculturlLoss.getTotalCount() != null ? agriculturlLoss.getTotalCount() : 0L;
		Long cropsLoss = cropLoss.getTotalCount() != null ? cropLoss.getTotalCount() : 0L;
		Long totalAgricLoss = agricLoss + cropsLoss;

		beans.add(new CrossTab("", agriculturlLoss.getTitle(), totalAgricLoss.toString()));

		// C-3 Direct economic loss to all other damaged or destroyed productive assets attributed to disasters
		ISendaiAggregateDTO damagedOrDestroyedProductiveAssets = sendaiMonitorGroupByMonthRepository
				.infrastructureLoss();

		beans.add(new CrossTab("", damagedOrDestroyedProductiveAssets.getTitle(), damagedOrDestroyedProductiveAssets.getTotalCount() !=null ? damagedOrDestroyedProductiveAssets.getTotalCount().toString():"0"));

		// C-4 Direct economic loss in the housing sector attributed to disasters.
		ISendaiAggregateDTO econonicLossInHousingSector = sendaiMonitorGroupByMonthRepository
				.econonicLossInHousingSector();
		beans.add(new CrossTab("", econonicLossInHousingSector.getTitle(),
				econonicLossInHousingSector.getTotalCount()!=null ? econonicLossInHousingSector.getTotalCount().toString(): "0"));

		// C-5 Direct economic loss resulting /from damaged or destroyed critical infrastructure attributed to disasters
		ISendaiAggregateDTO economicLossToInfrastructure = sendaiMonitorGroupByMonthRepository
				.economicLossFromCriticalInfrastructure();
		beans.add(new CrossTab("", economicLossToInfrastructure.getTitle(),
				economicLossToInfrastructure.getTotalCount().toString()));

		// number of missing persons
		ISendaiAggregateDTO culturalHeritageEconomicLoss = sendaiMonitorGroupByMonthRepository
				.culturalHeritageEconomicLoss();
		beans.add(new CrossTab("", culturalHeritageEconomicLoss.getTitle(),
				culturalHeritageEconomicLoss.getTotalCount().toString()));
	}

}
