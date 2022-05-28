package disaster.loss.service.impl;

import java.time.LocalDate;
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

	public void getGlobalTargetA(ArrayList<CrossTab> beans, LocalDate dateFrom, LocalDate dateTo) {
		// Number of deaths and missing persons
		ISendaiAggregateDTO deathsAndMissingPersons = sendaiMonitorGroupByMonthRepository
				.numberOfDeathsAndMissingPersons(dateFrom, dateTo);
		beans.add(new CrossTab("", deathsAndMissingPersons.getTitle(),
				deathsAndMissingPersons.getTotalCount() != null ? deathsAndMissingPersons.getTotalCount().toString()
						: "0"));

		// number of deaths
		ISendaiAggregateDTO numberOfDeaths = sendaiMonitorGroupByMonthRepository.numberOfDeaths(dateFrom, dateTo);
		beans.add(new CrossTab("", numberOfDeaths.getTitle(),
				numberOfDeaths.getTotalCount() != null ? numberOfDeaths.getTotalCount().toString() : "0"));

		// number of missing persons
		ISendaiAggregateDTO numberOfMissingPersons = sendaiMonitorGroupByMonthRepository
				.numberOfMissingPersons(dateFrom, dateTo);
		beans.add(new CrossTab("", numberOfMissingPersons.getTitle(),
				numberOfMissingPersons.getTotalCount() != null ? numberOfMissingPersons.getTotalCount().toString()
						: "0"));
	}

}
