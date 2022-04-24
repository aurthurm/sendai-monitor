package disaster.loss.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import disaster.loss.repository.SendaiMonitorAggregateTartgetARepository;
import disaster.loss.service.dto.CrossTab;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Service
public class GlobalTargetAHelper {

	@Autowired
	SendaiMonitorAggregateTartgetARepository sendaiMonitorGroupByMonthRepository;

	public void getGlobalTargetA(ArrayList<CrossTab> beans) {
		// Number of deaths and missing persons
		ISendaiAggregateDTO deathsAndMissingPersons = sendaiMonitorGroupByMonthRepository
				.numberOfDeathsAndMissingPersons();
		beans.add(new CrossTab("", deathsAndMissingPersons.getTitle(),
				deathsAndMissingPersons.getTotalCount().toString()));

		// number of deaths
		ISendaiAggregateDTO numberOfDeaths = sendaiMonitorGroupByMonthRepository.numberOfDeaths();
		beans.add(new CrossTab("", numberOfDeaths.getTitle(), numberOfDeaths.getTotalCount().toString()));

		// number of missing persons
		ISendaiAggregateDTO numberOfMissingPersons = sendaiMonitorGroupByMonthRepository.numberOfMissingPersons();
		beans.add(
				new CrossTab("", numberOfMissingPersons.getTitle(), numberOfMissingPersons.getTotalCount().toString()));
	}

}
