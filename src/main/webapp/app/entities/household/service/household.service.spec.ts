import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHousehold, Household } from '../household.model';

import { HouseholdService } from './household.service';

describe('Household Service', () => {
  let service: HouseholdService;
  let httpMock: HttpTestingController;
  let elemDefault: IHousehold;
  let expectedResult: IHousehold | IHousehold[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HouseholdService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      householdId: 'AAAAAAA',
      disasterId: 'AAAAAAA',
      casualtyId: 'AAAAAAA',
      infractructureTypeId: 'AAAAAAA',
      damaged: 0,
      destroyed: 0,
      value: 0,
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

    it('should create a Household', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Household()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Household', () => {
      const returnedFromService = Object.assign(
        {
          householdId: 'BBBBBB',
          disasterId: 'BBBBBB',
          casualtyId: 'BBBBBB',
          infractructureTypeId: 'BBBBBB',
          damaged: 1,
          destroyed: 1,
          value: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Household', () => {
      const patchObject = Object.assign(
        {
          disasterId: 'BBBBBB',
          infractructureTypeId: 'BBBBBB',
          damaged: 1,
          destroyed: 1,
          value: 1,
        },
        new Household()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Household', () => {
      const returnedFromService = Object.assign(
        {
          householdId: 'BBBBBB',
          disasterId: 'BBBBBB',
          casualtyId: 'BBBBBB',
          infractructureTypeId: 'BBBBBB',
          damaged: 1,
          destroyed: 1,
          value: 1,
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

    it('should delete a Household', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addHouseholdToCollectionIfMissing', () => {
      it('should add a Household to an empty array', () => {
        const household: IHousehold = { householdId: 'ABC' };
        expectedResult = service.addHouseholdToCollectionIfMissing([], household);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(household);
      });

      it('should not add a Household to an array that contains it', () => {
        const household: IHousehold = { householdId: 'ABC' };
        const householdCollection: IHousehold[] = [
          {
            ...household,
          },
          { householdId: 'CBA' },
        ];
        expectedResult = service.addHouseholdToCollectionIfMissing(householdCollection, household);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Household to an array that doesn't contain it", () => {
        const household: IHousehold = { householdId: 'ABC' };
        const householdCollection: IHousehold[] = [{ householdId: 'CBA' }];
        expectedResult = service.addHouseholdToCollectionIfMissing(householdCollection, household);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(household);
      });

      it('should add only unique Household to an array', () => {
        const householdArray: IHousehold[] = [
          { householdId: 'ABC' },
          { householdId: 'CBA' },
          { householdId: 'd2964d8f-ba5a-42a3-baba-7a693ee3248b' },
        ];
        const householdCollection: IHousehold[] = [{ householdId: 'ABC' }];
        expectedResult = service.addHouseholdToCollectionIfMissing(householdCollection, ...householdArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const household: IHousehold = { householdId: 'ABC' };
        const household2: IHousehold = { householdId: 'CBA' };
        expectedResult = service.addHouseholdToCollectionIfMissing([], household, household2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(household);
        expect(expectedResult).toContain(household2);
      });

      it('should accept null and undefined values', () => {
        const household: IHousehold = { householdId: 'ABC' };
        expectedResult = service.addHouseholdToCollectionIfMissing([], null, household, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(household);
      });

      it('should return initial array if no Household is added', () => {
        const householdCollection: IHousehold[] = [{ householdId: 'ABC' }];
        expectedResult = service.addHouseholdToCollectionIfMissing(householdCollection, undefined, null);
        expect(expectedResult).toEqual(householdCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
