import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDisasterCategory, DisasterCategory } from '../disaster-category.model';

import { DisasterCategoryService } from './disaster-category.service';

describe('DisasterCategory Service', () => {
  let service: DisasterCategoryService;
  let httpMock: HttpTestingController;
  let elemDefault: IDisasterCategory;
  let expectedResult: IDisasterCategory | IDisasterCategory[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DisasterCategoryService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
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

    it('should create a DisasterCategory', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new DisasterCategory()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DisasterCategory', () => {
      const returnedFromService = Object.assign(
        {
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

    it('should partial update a DisasterCategory', () => {
      const patchObject = Object.assign({}, new DisasterCategory());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DisasterCategory', () => {
      const returnedFromService = Object.assign(
        {
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

    it('should delete a DisasterCategory', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDisasterCategoryToCollectionIfMissing', () => {
      it('should add a DisasterCategory to an empty array', () => {
        const disasterCategory: IDisasterCategory = { disasterCategoryId: 'ABC' };
        expectedResult = service.addDisasterCategoryToCollectionIfMissing([], disasterCategory);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disasterCategory);
      });

      it('should not add a DisasterCategory to an array that contains it', () => {
        const disasterCategory: IDisasterCategory = { disasterCategoryId: 'ABC' };
        const disasterCategoryCollection: IDisasterCategory[] = [
          {
            ...disasterCategory,
          },
          { disasterCategoryId: 'CBA' },
        ];
        expectedResult = service.addDisasterCategoryToCollectionIfMissing(disasterCategoryCollection, disasterCategory);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DisasterCategory to an array that doesn't contain it", () => {
        const disasterCategory: IDisasterCategory = { disasterCategoryId: 'ABC' };
        const disasterCategoryCollection: IDisasterCategory[] = [{ disasterCategoryId: 'CBA' }];
        expectedResult = service.addDisasterCategoryToCollectionIfMissing(disasterCategoryCollection, disasterCategory);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disasterCategory);
      });

      it('should add only unique DisasterCategory to an array', () => {
        const disasterCategoryArray: IDisasterCategory[] = [
          { disasterCategoryId: 'ABC' },
          { disasterCategoryId: 'CBA' },
          { disasterCategoryId: '94973d4a-9dd6-4d2e-8a6b-c943879a0fa6' },
        ];
        const disasterCategoryCollection: IDisasterCategory[] = [{ disasterCategoryId: 'ABC' }];
        expectedResult = service.addDisasterCategoryToCollectionIfMissing(disasterCategoryCollection, ...disasterCategoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const disasterCategory: IDisasterCategory = { disasterCategoryId: 'ABC' };
        const disasterCategory2: IDisasterCategory = { disasterCategoryId: 'CBA' };
        expectedResult = service.addDisasterCategoryToCollectionIfMissing([], disasterCategory, disasterCategory2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disasterCategory);
        expect(expectedResult).toContain(disasterCategory2);
      });

      it('should accept null and undefined values', () => {
        const disasterCategory: IDisasterCategory = { disasterCategoryId: 'ABC' };
        expectedResult = service.addDisasterCategoryToCollectionIfMissing([], null, disasterCategory, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disasterCategory);
      });

      it('should return initial array if no DisasterCategory is added', () => {
        const disasterCategoryCollection: IDisasterCategory[] = [{ disasterCategoryId: 'ABC' }];
        expectedResult = service.addDisasterCategoryToCollectionIfMissing(disasterCategoryCollection, undefined, null);
        expect(expectedResult).toEqual(disasterCategoryCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
