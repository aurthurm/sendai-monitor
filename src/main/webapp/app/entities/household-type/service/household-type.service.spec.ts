import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHouseholdType, HouseholdType } from '../household-type.model';

import { HouseholdTypeService } from './household-type.service';

describe('HouseholdType Service', () => {
  let service: HouseholdTypeService;
  let httpMock: HttpTestingController;
  let elemDefault: IHouseholdType;
  let expectedResult: IHouseholdType | IHouseholdType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HouseholdTypeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      householdTypeId: 'AAAAAAA',
      name: 'AAAAAAA',
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

    it('should create a HouseholdType', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new HouseholdType()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HouseholdType', () => {
      const returnedFromService = Object.assign(
        {
          householdTypeId: 'BBBBBB',
          name: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HouseholdType', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
        },
        new HouseholdType()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HouseholdType', () => {
      const returnedFromService = Object.assign(
        {
          householdTypeId: 'BBBBBB',
          name: 'BBBBBB',
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

    it('should delete a HouseholdType', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addHouseholdTypeToCollectionIfMissing', () => {
      it('should add a HouseholdType to an empty array', () => {
        const householdType: IHouseholdType = { householdTypeId: 'ABC' };
        expectedResult = service.addHouseholdTypeToCollectionIfMissing([], householdType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(householdType);
      });

      it('should not add a HouseholdType to an array that contains it', () => {
        const householdType: IHouseholdType = { householdTypeId: 'ABC' };
        const householdTypeCollection: IHouseholdType[] = [
          {
            ...householdType,
          },
          { householdTypeId: 'CBA' },
        ];
        expectedResult = service.addHouseholdTypeToCollectionIfMissing(householdTypeCollection, householdType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HouseholdType to an array that doesn't contain it", () => {
        const householdType: IHouseholdType = { householdTypeId: 'ABC' };
        const householdTypeCollection: IHouseholdType[] = [{ householdTypeId: 'CBA' }];
        expectedResult = service.addHouseholdTypeToCollectionIfMissing(householdTypeCollection, householdType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(householdType);
      });

      it('should add only unique HouseholdType to an array', () => {
        const householdTypeArray: IHouseholdType[] = [
          { householdTypeId: 'ABC' },
          { householdTypeId: 'CBA' },
          { householdTypeId: '3bdc2066-1ad8-4c75-ade4-22111bee7c56' },
        ];
        const householdTypeCollection: IHouseholdType[] = [{ householdTypeId: 'ABC' }];
        expectedResult = service.addHouseholdTypeToCollectionIfMissing(householdTypeCollection, ...householdTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const householdType: IHouseholdType = { householdTypeId: 'ABC' };
        const householdType2: IHouseholdType = { householdTypeId: 'CBA' };
        expectedResult = service.addHouseholdTypeToCollectionIfMissing([], householdType, householdType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(householdType);
        expect(expectedResult).toContain(householdType2);
      });

      it('should accept null and undefined values', () => {
        const householdType: IHouseholdType = { householdTypeId: 'ABC' };
        expectedResult = service.addHouseholdTypeToCollectionIfMissing([], null, householdType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(householdType);
      });

      it('should return initial array if no HouseholdType is added', () => {
        const householdTypeCollection: IHouseholdType[] = [{ householdTypeId: 'ABC' }];
        expectedResult = service.addHouseholdTypeToCollectionIfMissing(householdTypeCollection, undefined, null);
        expect(expectedResult).toEqual(householdTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
