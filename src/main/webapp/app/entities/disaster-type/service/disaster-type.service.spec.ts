import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDisasterType, DisasterType } from '../disaster-type.model';

import { DisasterTypeService } from './disaster-type.service';

describe('DisasterType Service', () => {
  let service: DisasterTypeService;
  let httpMock: HttpTestingController;
  let elemDefault: IDisasterType;
  let expectedResult: IDisasterType | IDisasterType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DisasterTypeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      disasterTypeId: 'AAAAAAA',
      disasterCategoryId: 'AAAAAAA',
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

    it('should create a DisasterType', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new DisasterType()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DisasterType', () => {
      const returnedFromService = Object.assign(
        {
          disasterTypeId: 'BBBBBB',
          disasterCategoryId: 'BBBBBB',
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

    it('should partial update a DisasterType', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
        },
        new DisasterType()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DisasterType', () => {
      const returnedFromService = Object.assign(
        {
          disasterTypeId: 'BBBBBB',
          disasterCategoryId: 'BBBBBB',
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

    it('should delete a DisasterType', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDisasterTypeToCollectionIfMissing', () => {
      it('should add a DisasterType to an empty array', () => {
        const disasterType: IDisasterType = { disasterTypeId: 'ABC' };
        expectedResult = service.addDisasterTypeToCollectionIfMissing([], disasterType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disasterType);
      });

      it('should not add a DisasterType to an array that contains it', () => {
        const disasterType: IDisasterType = { disasterTypeId: 'ABC' };
        const disasterTypeCollection: IDisasterType[] = [
          {
            ...disasterType,
          },
          { disasterTypeId: 'CBA' },
        ];
        expectedResult = service.addDisasterTypeToCollectionIfMissing(disasterTypeCollection, disasterType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DisasterType to an array that doesn't contain it", () => {
        const disasterType: IDisasterType = { disasterTypeId: 'ABC' };
        const disasterTypeCollection: IDisasterType[] = [{ disasterTypeId: 'CBA' }];
        expectedResult = service.addDisasterTypeToCollectionIfMissing(disasterTypeCollection, disasterType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disasterType);
      });

      it('should add only unique DisasterType to an array', () => {
        const disasterTypeArray: IDisasterType[] = [
          { disasterTypeId: 'ABC' },
          { disasterTypeId: 'CBA' },
          { disasterTypeId: 'e1c068da-25af-4977-8d08-e21045094a5f' },
        ];
        const disasterTypeCollection: IDisasterType[] = [{ disasterTypeId: 'ABC' }];
        expectedResult = service.addDisasterTypeToCollectionIfMissing(disasterTypeCollection, ...disasterTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const disasterType: IDisasterType = { disasterTypeId: 'ABC' };
        const disasterType2: IDisasterType = { disasterTypeId: 'CBA' };
        expectedResult = service.addDisasterTypeToCollectionIfMissing([], disasterType, disasterType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disasterType);
        expect(expectedResult).toContain(disasterType2);
      });

      it('should accept null and undefined values', () => {
        const disasterType: IDisasterType = { disasterTypeId: 'ABC' };
        expectedResult = service.addDisasterTypeToCollectionIfMissing([], null, disasterType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disasterType);
      });

      it('should return initial array if no DisasterType is added', () => {
        const disasterTypeCollection: IDisasterType[] = [{ disasterTypeId: 'ABC' }];
        expectedResult = service.addDisasterTypeToCollectionIfMissing(disasterTypeCollection, undefined, null);
        expect(expectedResult).toEqual(disasterTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
