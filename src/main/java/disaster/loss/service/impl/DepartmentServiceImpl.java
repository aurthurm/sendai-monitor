package disaster.loss.service.impl;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import disaster.loss.domain.Department;
import disaster.loss.repository.DepartmentRepository;
import disaster.loss.service.DepartmentService;
import disaster.loss.service.UserService;
import disaster.loss.service.dto.AdminUserDTO;

/**
 * Service Implementation for managing {@link Department}.
 */
@Service
@Transactional
public class DepartmentServiceImpl implements DepartmentService {

	private final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);

	private static class DepartmentResourceException extends RuntimeException {

		private DepartmentResourceException(String message) {
			super(message);
		}
	}

	@Autowired
	UserService userService;

	private final DepartmentRepository departmentRepository;

	public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
		this.departmentRepository = departmentRepository;
	}

	@Override
	public Department save(Department department) {
		log.debug("Request to save Department : {}", department);
		return departmentRepository.save(department);
	}

	@Override
	public Optional<Department> partialUpdate(Department department) {
		log.debug("Request to partially update Department : {}", department);

		return departmentRepository.findById(department.getDepartmentId()).map(existingDepartment -> {
			if (department.getName() != null) {
				existingDepartment.setName(department.getName());
			}

			return existingDepartment;
		}).map(departmentRepository::save);
	}

	@Override
	@Transactional(readOnly = true)
	public Page<Department> findAll(Pageable pageable) {
		log.debug("Request to get all Departments");

		AdminUserDTO user = userService.getUserWithAuthorities().map(AdminUserDTO::new)
				.orElseThrow(() -> new DepartmentResourceException("User could not be found"));
		
		Page<Department> page = null;
		if (user.getAuthorities().contains("ROLE_ADMIN")) {
			page = departmentRepository.findAll(pageable);
		} else  {
			page = departmentRepository.findByDepartmentId(user.getDepartmentId(), pageable);
		}

		return page;
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Department> findOne(String id) {
		log.debug("Request to get Department : {}", id);
		return departmentRepository.findById(id);
	}

	@Override
	public void delete(String id) {
		log.debug("Request to delete Department : {}", id);
		departmentRepository.deleteById(id);
	}
}
