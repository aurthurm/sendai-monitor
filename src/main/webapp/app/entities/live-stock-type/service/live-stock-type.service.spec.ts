import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILiveStockType, LiveStockType } from '../live-stock-type.model';

import { LiveStockTypeService } from './live-stock-type.service';

describe('LiveStockType Service', () => {
  let service: LiveStockTypeService;
  let httpMock: HttpTestingController;
  let elemDefault: ILiveStockType;
  let expectedResult: ILiveStockType | ILiveStockType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LiveStockTypeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      liveStockTypeId: 'AAAAAAA',
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

    it('should create a LiveStockType', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new LiveStockType()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LiveStockType', () => {
      const returnedFromService = Object.assign(
        {
          liveStockTypeId: 'BBBBBB',
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

    it('should partial update a LiveStockType', () => {
      const patchObject = Object.assign({}, new LiveStockType());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LiveStockType', () => {
      const returnedFromService = Object.assign(
        {
          liveStockTypeId: 'BBBBBB',
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

    it('should delete a LiveStockType', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLiveStockTypeToCollectionIfMissing', () => {
      it('should add a LiveStockType to an empty array', () => {
        const liveStockType: ILiveStockType = { liveStockTypeId: 'ABC' };
        expectedResult = service.addLiveStockTypeToCollectionIfMissing([], liveStockType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(liveStockType);
      });

      it('should not add a LiveStockType to an array that contains it', () => {
        const liveStockType: ILiveStockType = { liveStockTypeId: 'ABC' };
        const liveStockTypeCollection: ILiveStockType[] = [
          {
            ...liveStockType,
          },
          { liveStockTypeId: 'CBA' },
        ];
        expectedResult = service.addLiveStockTypeToCollectionIfMissing(liveStockTypeCollection, liveStockType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LiveStockType to an array that doesn't contain it", () => {
        const liveStockType: ILiveStockType = { liveStockTypeId: 'ABC' };
        const liveStockTypeCollection: ILiveStockType[] = [{ liveStockTypeId: 'CBA' }];
        expectedResult = service.addLiveStockTypeToCollectionIfMissing(liveStockTypeCollection, liveStockType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(liveStockType);
      });

      it('should add only unique LiveStockType to an array', () => {
        const liveStockTypeArray: ILiveStockType[] = [
          { liveStockTypeId: 'ABC' },
          { liveStockTypeId: 'CBA' },
          { liveStockTypeId: '678d6f26-72a2-4f09-92ce-3de2dca5d598' },
        ];
        const liveStockTypeCollection: ILiveStockType[] = [{ liveStockTypeId: 'ABC' }];
        expectedResult = service.addLiveStockTypeToCollectionIfMissing(liveStockTypeCollection, ...liveStockTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const liveStockType: ILiveStockType = { liveStockTypeId: 'ABC' };
        const liveStockType2: ILiveStockType = { liveStockTypeId: 'CBA' };
        expectedResult = service.addLiveStockTypeToCollectionIfMissing([], liveStockType, liveStockType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(liveStockType);
        expect(expectedResult).toContain(liveStockType2);
      });

      it('should accept null and undefined values', () => {
        const liveStockType: ILiveStockType = { liveStockTypeId: 'ABC' };
        expectedResult = service.addLiveStockTypeToCollectionIfMissing([], null, liveStockType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(liveStockType);
      });

      it('should return initial array if no LiveStockType is added', () => {
        const liveStockTypeCollection: ILiveStockType[] = [{ liveStockTypeId: 'ABC' }];
        expectedResult = service.addLiveStockTypeToCollectionIfMissing(liveStockTypeCollection, undefined, null);
        expect(expectedResult).toEqual(liveStockTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
