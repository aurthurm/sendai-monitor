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

		// Number of directly affected people attributed to disasters, per 100,000
		// population.
		ISendaiAggregateDTO numberOfDirectlyAffectedPeople = sendaiMonitorGroupByMonthRepository
				.numberOfDirectlyAffectedPeople();
		beans.add(new CrossTab("", numberOfDirectlyAffectedPeople.getTitle(),
				resolveQueries(numberOfDirectlyAffectedPeople)));

		// number of deaths
		ISendaiAggregateDTO numberOfDeaths = sendaiMonitorGroupByMonthRepository.numberOfInjuredOrIllPeople();
		beans.add(new CrossTab("", numberOfDeaths.getTitle(), numberOfDeaths.getTotalCount().toString()));

		// Number of people whose damaged dwellings were attributed to disasters
		ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDamaged = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseDwellingsWhereDamaged();
		beans.add(new CrossTab("", numberOfPeopleWhoseDwellingsWhereDamaged.getTitle(),
				resolveQueries(numberOfPeopleWhoseDwellingsWhereDamaged)));

		// Number of people whose destroyed dwellings were attributed to disasters.
		ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDestroyed = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseDwellingsWhereDestroyed();
		beans.add(new CrossTab("", numberOfPeopleWhoseDwellingsWhereDestroyed.getTitle(),
				resolveQueries(numberOfPeopleWhoseDwellingsWhereDestroyed)));

		// number of missing persons
		ISendaiAggregateDTO numberOfPeopleWhoseLivelihoodsWereDisrupted = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseLivelihoodsWereDisrupted();
		beans.add(new CrossTab("", numberOfPeopleWhoseLivelihoodsWereDisrupted.getTitle(),
				resolveQueries(numberOfPeopleWhoseLivelihoodsWereDisrupted)));
	}

	private String resolveQueries(ISendaiAggregateDTO result) {

		Long total = 0L;
		if (result.getTotalCount() != null) {
			total = result.getTotalCount();
		}

		return total.toString();
	}

}
