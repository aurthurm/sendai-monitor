import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { SEX } from 'app/entities/enumerations/sex.model';
import { ICasualty, Casualty } from '../casualty.model';

import { CasualtyService } from './casualty.service';

describe('Casualty Service', () => {
  let service: CasualtyService;
  let httpMock: HttpTestingController;
  let elemDefault: ICasualty;
  let expectedResult: ICasualty | ICasualty[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CasualtyService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      casualtyId: 'AAAAAAA',
      disasterId: 'AAAAAAA',
      nationalId: 'AAAAAAA',
      anonymous: false,
      dob: currentDate,
      dobEstimated: false,
      age: 0,
      sex: SEX.FEMALE,
      dependents: 0,
      occupation: 'AAAAAAA',
      nationality: 'AAAAAAA',
      displaced: false,
      affected: false,
      injured: false,
      missing: false,
      dead: false,
      disabilityBefore: false,
      disabilityAfter: false,
      replay: false,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          dob: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Casualty', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
          dob: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dob: currentDate,
        },
        returnedFromService
      );

      service.create(new Casualty()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Casualty', () => {
      const returnedFromService = Object.assign(
        {
          casualtyId: 'BBBBBB',
          disasterId: 'BBBBBB',
          nationalId: 'BBBBBB',
          anonymous: true,
          dob: currentDate.format(DATE_TIME_FORMAT),
          dobEstimated: true,
          age: 1,
          sex: 'BBBBBB',
          dependents: 1,
          occupation: 'BBBBBB',
          nationality: 'BBBBBB',
          displaced: true,
          affected: true,
          injured: true,
          missing: true,
          dead: true,
          disabilityBefore: true,
          disabilityAfter: true,
          replay: true,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dob: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Casualty', () => {
      const patchObject = Object.assign(
        {
          disasterId: 'BBBBBB',
          nationalId: 'BBBBBB',
          dob: currentDate.format(DATE_TIME_FORMAT),
          occupation: 'BBBBBB',
          nationality: 'BBBBBB',
          missing: true,
          dead: true,
          disabilityAfter: true,
          replay: true,
        },
        new Casualty()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          dob: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Casualty', () => {
      const returnedFromService = Object.assign(
        {
          casualtyId: 'BBBBBB',
          disasterId: 'BBBBBB',
          nationalId: 'BBBBBB',
          anonymous: true,
          dob: currentDate.format(DATE_TIME_FORMAT),
          dobEstimated: true,
          age: 1,
          sex: 'BBBBBB',
          dependents: 1,
          occupation: 'BBBBBB',
          nationality: 'BBBBBB',
          displaced: true,
          affected: true,
          injured: true,
          missing: true,
          dead: true,
          disabilityBefore: true,
          disabilityAfter: true,
          replay: true,
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          dob: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Casualty', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCasualtyToCollectionIfMissing', () => {
      it('should add a Casualty to an empty array', () => {
        const casualty: ICasualty = { casualtyId: 'ABC' };
        expectedResult = service.addCasualtyToCollectionIfMissing([], casualty);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(casualty);
      });

      it('should not add a Casualty to an array that contains it', () => {
        const casualty: ICasualty = { casualtyId: 'ABC' };
        const casualtyCollection: ICasualty[] = [
          {
            ...casualty,
          },
          { casualtyId: 'CBA' },
        ];
        expectedResult = service.addCasualtyToCollectionIfMissing(casualtyCollection, casualty);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Casualty to an array that doesn't contain it", () => {
        const casualty: ICasualty = { casualtyId: 'ABC' };
        const casualtyCollection: ICasualty[] = [{ casualtyId: 'CBA' }];
        expectedResult = service.addCasualtyToCollectionIfMissing(casualtyCollection, casualty);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(casualty);
      });

      it('should add only unique Casualty to an array', () => {
        const casualtyArray: ICasualty[] = [
          { casualtyId: 'ABC' },
          { casualtyId: 'CBA' },
          { casualtyId: 'd4a2a03a-694f-4ae0-9059-d8e866f5fac9' },
        ];
        const casualtyCollection: ICasualty[] = [{ casualtyId: 'ABC' }];
        expectedResult = service.addCasualtyToCollectionIfMissing(casualtyCollection, ...casualtyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const casualty: ICasualty = { casualtyId: 'ABC' };
        const casualty2: ICasualty = { casualtyId: 'CBA' };
        expectedResult = service.addCasualtyToCollectionIfMissing([], casualty, casualty2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(casualty);
        expect(expectedResult).toContain(casualty2);
      });

      it('should accept null and undefined values', () => {
        const casualty: ICasualty = { casualtyId: 'ABC' };
        expectedResult = service.addCasualtyToCollectionIfMissing([], null, casualty, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(casualty);
      });

      it('should return initial array if no Casualty is added', () => {
        const casualtyCollection: ICasualty[] = [{ casualtyId: 'ABC' }];
        expectedResult = service.addCasualtyToCollectionIfMissing(casualtyCollection, undefined, null);
        expect(expectedResult).toEqual(casualtyCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
