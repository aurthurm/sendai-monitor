import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDepartment, Department } from '../department.model';

import { DepartmentService } from './department.service';

describe('Department Service', () => {
  let service: DepartmentService;
  let httpMock: HttpTestingController;
  let elemDefault: IDepartment;
  let expectedResult: IDepartment | IDepartment[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DepartmentService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      departmentId: 'AAAAAAA',
      name: 'AAAAAAA',
      phoneNumber: 'AAAAAAA',
      countryId: 'AAAAAAA',
      provinceId: 'AAAAAAA',
      districtId: 'AAAAAAA',
      wardId: 'AAAAAAA',
      villageId: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Department', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Department()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Department', () => {
      const returnedFromService = Object.assign(
        {
          departmentId: 'BBBBBB',
          name: 'BBBBBB',
          phoneNumber: 'BBBBBB',
          countryId: 'BBBBBB',
          provinceId: 'BBBBBB',
          districtId: 'BBBBBB',
          wardId: 'BBBBBB',
          villageId: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Department', () => {
      const patchObject = Object.assign(
        {
          countryId: 'BBBBBB',
          districtId: 'BBBBBB',
          wardId: 'BBBBBB',
        },
        new Department()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Department', () => {
      const returnedFromService = Object.assign(
        {
          departmentId: 'BBBBBB',
          name: 'BBBBBB',
          phoneNumber: 'BBBBBB',
          countryId: 'BBBBBB',
          provinceId: 'BBBBBB',
          districtId: 'BBBBBB',
          wardId: 'BBBBBB',
          villageId: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Department', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDepartmentToCollectionIfMissing', () => {
      it('should add a Department to an empty array', () => {
        const department: IDepartment = { departmentId: 'ABC' };
        expectedResult = service.addDepartmentToCollectionIfMissing([], department);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(department);
      });

      it('should not add a Department to an array that contains it', () => {
        const department: IDepartment = { departmentId: 'ABC' };
        const departmentCollection: IDepartment[] = [
          {
            ...department,
          },
          { departmentId: 'CBA' },
        ];
        expectedResult = service.addDepartmentToCollectionIfMissing(departmentCollection, department);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Department to an array that doesn't contain it", () => {
        const department: IDepartment = { departmentId: 'ABC' };
        const departmentCollection: IDepartment[] = [{ departmentId: 'CBA' }];
        expectedResult = service.addDepartmentToCollectionIfMissing(departmentCollection, department);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(department);
      });

      it('should add only unique Department to an array', () => {
        const departmentArray: IDepartment[] = [
          { departmentId: 'ABC' },
          { departmentId: 'CBA' },
          { departmentId: '6270d67d-326c-4580-9d66-9ccedcaa4088' },
        ];
        const departmentCollection: IDepartment[] = [{ departmentId: 'ABC' }];
        expectedResult = service.addDepartmentToCollectionIfMissing(departmentCollection, ...departmentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const department: IDepartment = { departmentId: 'ABC' };
        const department2: IDepartment = { departmentId: 'CBA' };
        expectedResult = service.addDepartmentToCollectionIfMissing([], department, department2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(department);
        expect(expectedResult).toContain(department2);
      });

      it('should accept null and undefined values', () => {
        const department: IDepartment = { departmentId: 'ABC' };
        expectedResult = service.addDepartmentToCollectionIfMissing([], null, department, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(department);
      });

      it('should return initial array if no Department is added', () => {
        const departmentCollection: IDepartment[] = [{ departmentId: 'ABC' }];
        expectedResult = service.addDepartmentToCollectionIfMissing(departmentCollection, undefined, null);
        expect(expectedResult).toEqual(departmentCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
