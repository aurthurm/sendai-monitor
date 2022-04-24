import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { LOCATION } from 'app/entities/enumerations/location.model';
import { IDisaster, Disaster } from '../disaster.model';

import { DisasterService } from './disaster.service';

describe('Disaster Service', () => {
  let service: DisasterService;
  let httpMock: HttpTestingController;
  let elemDefault: IDisaster;
  let expectedResult: IDisaster | IDisaster[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DisasterService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      disasterId: 'AAAAAAA',
      departmentId: 'AAAAAAA',
      hazardId: 'AAAAAAA',
      type: 'AAAAAAA',
      cause: 'AAAAAAA',
      location: LOCATION.NATIONAL,
      locationId: 'AAAAAAA',
      description: 'AAAAAAA',
      disasterCategoryId: 'AAAAAAA',
      disasterTypeId: 'AAAAAAA',
      caseId: 'AAAAAAA',
      estimatedDamage: 'AAAAAAA',
      isDeclared: false,
      declarationDate: currentDate,
      closureDate: currentDate,
      intervention: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          declarationDate: currentDate.format(DATE_TIME_FORMAT),
          closureDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Disaster', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
          declarationDate: currentDate.format(DATE_TIME_FORMAT),
          closureDate: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          declarationDate: currentDate,
          closureDate: currentDate,
        },
        returnedFromService
      );

      service.create(new Disaster()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Disaster', () => {
      const returnedFromService = Object.assign(
        {
          disasterId: 'BBBBBB',
          departmentId: 'BBBBBB',
          hazardId: 'BBBBBB',
          type: 'BBBBBB',
          cause: 'BBBBBB',
          location: 'BBBBBB',
          locationId: 'BBBBBB',
          description: 'BBBBBB',
          disasterCategoryId: 'BBBBBB',
          disasterTypeId: 'BBBBBB',
          caseName: 'BBBBBB',
          estimatedDamage: 'BBBBBB',
          isDeclared: true,
          declarationDate: currentDate.format(DATE_TIME_FORMAT),
          closureDate: currentDate.format(DATE_TIME_FORMAT),
          intervention: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          declarationDate: currentDate,
          closureDate: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Disaster', () => {
      const patchObject = Object.assign(
        {
          cause: 'BBBBBB',
          locationId: 'BBBBBB',
          description: 'BBBBBB',
          disasterTypeId: 'BBBBBB',
          isDeclared: true,
          declarationDate: currentDate.format(DATE_TIME_FORMAT),
          closureDate: currentDate.format(DATE_TIME_FORMAT),
          intervention: 'BBBBBB',
        },
        new Disaster()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          declarationDate: currentDate,
          closureDate: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Disaster', () => {
      const returnedFromService = Object.assign(
        {
          disasterId: 'BBBBBB',
          departmentId: 'BBBBBB',
          hazardId: 'BBBBBB',
          type: 'BBBBBB',
          cause: 'BBBBBB',
          location: 'BBBBBB',
          locationId: 'BBBBBB',
          description: 'BBBBBB',
          disasterCategoryId: 'BBBBBB',
          disasterTypeId: 'BBBBBB',
          caseName: 'BBBBBB',
          estimatedDamage: 'BBBBBB',
          isDeclared: true,
          declarationDate: currentDate.format(DATE_TIME_FORMAT),
          closureDate: currentDate.format(DATE_TIME_FORMAT),
          intervention: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          declarationDate: currentDate,
          closureDate: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Disaster', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDisasterToCollectionIfMissing', () => {
      it('should add a Disaster to an empty array', () => {
        const disaster: IDisaster = { disasterId: 'ABC' };
        expectedResult = service.addDisasterToCollectionIfMissing([], disaster);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disaster);
      });

      it('should not add a Disaster to an array that contains it', () => {
        const disaster: IDisaster = { disasterId: 'ABC' };
        const disasterCollection: IDisaster[] = [
          {
            ...disaster,
          },
          { disasterId: 'CBA' },
        ];
        expectedResult = service.addDisasterToCollectionIfMissing(disasterCollection, disaster);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Disaster to an array that doesn't contain it", () => {
        const disaster: IDisaster = { disasterId: 'ABC' };
        const disasterCollection: IDisaster[] = [{ disasterId: 'CBA' }];
        expectedResult = service.addDisasterToCollectionIfMissing(disasterCollection, disaster);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disaster);
      });

      it('should add only unique Disaster to an array', () => {
        const disasterArray: IDisaster[] = [
          { disasterId: 'ABC' },
          { disasterId: 'CBA' },
          { disasterId: '218834ab-5de7-47a0-8d60-725013cbfa67' },
        ];
        const disasterCollection: IDisaster[] = [{ disasterId: 'ABC' }];
        expectedResult = service.addDisasterToCollectionIfMissing(disasterCollection, ...disasterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const disaster: IDisaster = { disasterId: 'ABC' };
        const disaster2: IDisaster = { disasterId: 'CBA' };
        expectedResult = service.addDisasterToCollectionIfMissing([], disaster, disaster2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disaster);
        expect(expectedResult).toContain(disaster2);
      });

      it('should accept null and undefined values', () => {
        const disaster: IDisaster = { disasterId: 'ABC' };
        expectedResult = service.addDisasterToCollectionIfMissing([], null, disaster, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disaster);
      });

      it('should return initial array if no Disaster is added', () => {
        const disasterCollection: IDisaster[] = [{ disasterId: 'ABC' }];
        expectedResult = service.addDisasterToCollectionIfMissing(disasterCollection, undefined, null);
        expect(expectedResult).toEqual(disasterCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
