import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IVillage, Village } from '../village.model';

import { VillageService } from './village.service';

describe('Village Service', () => {
  let service: VillageService;
  let httpMock: HttpTestingController;
  let elemDefault: IVillage;
  let expectedResult: IVillage | IVillage[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(VillageService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      villageId: 'AAAAAAA',
      wardId: 'AAAAAAA',
      name: 'AAAAAAA',
      latitude: 'AAAAAAA',
      longitude: 'AAAAAAA',
      level: 0,
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

    it('should create a Village', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Village()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Village', () => {
      const returnedFromService = Object.assign(
        {
          villageId: 'BBBBBB',
          wardId: 'BBBBBB',
          name: 'BBBBBB',
          latitude: 'BBBBBB',
          longitude: 'BBBBBB',
          level: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Village', () => {
      const patchObject = Object.assign(
        {
          latitude: 'BBBBBB',
          longitude: 'BBBBBB',
        },
        new Village()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Village', () => {
      const returnedFromService = Object.assign(
        {
          villageId: 'BBBBBB',
          wardId: 'BBBBBB',
          name: 'BBBBBB',
          latitude: 'BBBBBB',
          longitude: 'BBBBBB',
          level: 1,
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

    it('should delete a Village', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addVillageToCollectionIfMissing', () => {
      it('should add a Village to an empty array', () => {
        const village: IVillage = { villageId: 'ABC' };
        expectedResult = service.addVillageToCollectionIfMissing([], village);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(village);
      });

      it('should not add a Village to an array that contains it', () => {
        const village: IVillage = { villageId: 'ABC' };
        const villageCollection: IVillage[] = [
          {
            ...village,
          },
          { villageId: 'CBA' },
        ];
        expectedResult = service.addVillageToCollectionIfMissing(villageCollection, village);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Village to an array that doesn't contain it", () => {
        const village: IVillage = { villageId: 'ABC' };
        const villageCollection: IVillage[] = [{ villageId: 'CBA' }];
        expectedResult = service.addVillageToCollectionIfMissing(villageCollection, village);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(village);
      });

      it('should add only unique Village to an array', () => {
        const villageArray: IVillage[] = [
          { villageId: 'ABC' },
          { villageId: 'CBA' },
          { villageId: 'a2db3dff-d4d6-419d-b540-e60fcd2ffc72' },
        ];
        const villageCollection: IVillage[] = [{ villageId: 'ABC' }];
        expectedResult = service.addVillageToCollectionIfMissing(villageCollection, ...villageArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const village: IVillage = { villageId: 'ABC' };
        const village2: IVillage = { villageId: 'CBA' };
        expectedResult = service.addVillageToCollectionIfMissing([], village, village2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(village);
        expect(expectedResult).toContain(village2);
      });

      it('should accept null and undefined values', () => {
        const village: IVillage = { villageId: 'ABC' };
        expectedResult = service.addVillageToCollectionIfMissing([], null, village, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(village);
      });

      it('should return initial array if no Village is added', () => {
        const villageCollection: IVillage[] = [{ villageId: 'ABC' }];
        expectedResult = service.addVillageToCollectionIfMissing(villageCollection, undefined, null);
        expect(expectedResult).toEqual(villageCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
