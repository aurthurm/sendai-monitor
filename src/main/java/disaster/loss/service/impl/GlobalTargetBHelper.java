package disaster.loss.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import disaster.loss.repository.SendaiMonitorAggregateTartgetBRepository;
import disaster.loss.service.dto.CrossTab;
import disaster.loss.service.dto.ISendaiAggregateDTO;

@Service
public class GlobalTargetBHelper {

	@Autowired
	SendaiMonitorAggregateTartgetBRepository sendaiMonitorGroupByMonthRepository;

	public void getGlobalTargetB(ArrayList<CrossTab> beans) {

		beans.add(new CrossTab("", "", ""));
		beans.add(new CrossTab("",
				"Global target B: Substantially reduce the number of affected people globally by 2030, aiming to lower the average global figure per 100,000 between 2020-2030 compared with 2005-2015.",
				""));
		beans.add(new CrossTab("", "", ""));
		// Number of deaths and missing persons
		ISendaiAggregateDTO deathsAndMissingPersons = sendaiMonitorGroupByMonthRepository
				.numberOfDirectlyAffectedPeople();
		beans.add(new CrossTab("", deathsAndMissingPersons.getTitle(),
				deathsAndMissingPersons.getTotalCount().toString()));

		// number of deaths
		ISendaiAggregateDTO numberOfDeaths = sendaiMonitorGroupByMonthRepository.numberOfInjuredOrIllPeople();
		beans.add(new CrossTab("", numberOfDeaths.getTitle(), numberOfDeaths.getTotalCount().toString()));

		// number of missing persons
		ISendaiAggregateDTO numberOfMissingPersons = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseDwellingsWhereDamaged();
		beans.add(
				new CrossTab("", numberOfMissingPersons.getTitle(), numberOfMissingPersons.getTotalCount().toString()));


		// number of missing persons
		ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDestroyed = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseDwellingsWhereDestroyed();
		beans.add(
				new CrossTab("", numberOfPeopleWhoseDwellingsWhereDestroyed.getTitle(), numberOfPeopleWhoseDwellingsWhereDestroyed.getTotalCount().toString()));

		// number of missing persons
		ISendaiAggregateDTO numberOfPeopleWhoseLivelihoodsWereDisrupted = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseLivelihoodsWereDisrupted();
		beans.add(
				new CrossTab("", numberOfPeopleWhoseLivelihoodsWereDisrupted.getTitle(), numberOfPeopleWhoseLivelihoodsWereDisrupted.getTotalCount().toString()));
	}

}
