package disaster.loss.repository;

import disaster.loss.domain.Disaster;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.query.QueryUtils;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

/**
 * Spring Data repository for the Worksheet entity.
 */
@SuppressWarnings("unused")
@Repository
public class CustomDisasterRepositoryImpl implements CustomDisasterRepository {
    private final Logger log = LoggerFactory.getLogger(Disaster.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Disaster> search(String searchText, Pageable pageable) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Disaster> criteriaQuery = criteriaBuilder.createQuery(Disaster.class);
        CriteriaQuery<Disaster> countQuery = criteriaBuilder.createQuery(Disaster.class);
        Root<Disaster> disasterRoot = criteriaQuery.from(Disaster.class);

        List<Predicate> predicates = new ArrayList<>();

        if (searchText != null) {
            if (searchText.length() >= 2 && !searchText.equals("null") && !searchText.equals("undefined")) {
                log.debug("searchText: {}", searchText);
                Predicate caseNumber = criteriaBuilder.like(disasterRoot.get("caseId"), "%" + searchText + "%");
                Predicate disasterName = criteriaBuilder.like(disasterRoot.get("name"), "%" + searchText + "%");
                predicates.add(criteriaBuilder.or(caseNumber, disasterName));
            }
        }

        criteriaQuery
            .select(disasterRoot)
            .where(predicates.toArray(new Predicate[] {}));
            // .orderBy(QueryUtils.toOrders(pageable.getSort(), disasterRoot, criteriaBuilder));

        log.debug("pageable : {}", pageable);

        List<Disaster> results = entityManager
            .createQuery(criteriaQuery)
            .setMaxResults(pageable.getPageNumber() * pageable.getPageSize()) // .setFirstResult((int)pageable.getOffset())
            .setMaxResults(pageable.getPageSize())
            .getResultList();

        return new PageImpl<>(results, pageable, results.size());
    }
}
