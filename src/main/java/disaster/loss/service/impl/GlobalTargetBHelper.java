package disaster.loss.service.impl;

import java.time.LocalDate;
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

	public void getGlobalTargetB(ArrayList<CrossTab> beans, LocalDate dateFrom, LocalDate dateTo) {

		beans.add(new CrossTab("", "", ""));
		beans.add(new CrossTab("",
				"Global target B: Substantially reduce the number of affected people globally by 2030, aiming to lower the average global figure per 100,000 between 2020-2030 compared with 2005-2015.",
				""));
		beans.add(new CrossTab("", "", ""));

		// Number of directly affected people attributed to disasters, per 100,000
		// population.
		ISendaiAggregateDTO numberOfDirectlyAffectedPeople = sendaiMonitorGroupByMonthRepository
				.numberOfDirectlyAffectedPeople(dateFrom, dateTo);
		beans.add(new CrossTab("", numberOfDirectlyAffectedPeople.getTitle(),
				resolveQueries(numberOfDirectlyAffectedPeople)));

		// B-2 Number of injured or ill people attributed to disasters, per 100,000 population
		ISendaiAggregateDTO numberOfDeaths = sendaiMonitorGroupByMonthRepository.numberOfInjuredOrIllPeople(dateFrom, dateTo);
		beans.add(new CrossTab("", numberOfDeaths.getTitle(), numberOfDeaths.getTotalCount()!=null?numberOfDeaths.getTotalCount().toString():"0"));

		// Number of people whose damaged dwellings were attributed to disasters
		ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDamaged = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseDwellingsWhereDamaged(dateFrom, dateTo);
		beans.add(new CrossTab("", numberOfPeopleWhoseDwellingsWhereDamaged.getTitle(),
				resolveQueries(numberOfPeopleWhoseDwellingsWhereDamaged)));

		// Number of people whose destroyed dwellings were attributed to disasters.
		ISendaiAggregateDTO numberOfPeopleWhoseDwellingsWhereDestroyed = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseDwellingsWhereDestroyed(dateFrom, dateTo);
		beans.add(new CrossTab("", numberOfPeopleWhoseDwellingsWhereDestroyed.getTitle(),
				resolveQueries(numberOfPeopleWhoseDwellingsWhereDestroyed)));

		// B-5	Number of people whose livelihoods were disrupted or destroyed, attributed to disasters
		ISendaiAggregateDTO numberOfPeopleWhoseLivelihoodsWereDisrupted = sendaiMonitorGroupByMonthRepository
				.numberOfPeopleWhoseLivelihoodsWereDisrupted(dateFrom, dateTo);
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
