import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILiveStock, LiveStock } from '../live-stock.model';

import { LiveStockService } from './live-stock.service';

describe('LiveStock Service', () => {
  let service: LiveStockService;
  let httpMock: HttpTestingController;
  let elemDefault: ILiveStock;
  let expectedResult: ILiveStock | ILiveStock[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LiveStockService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      liveStockId: 'AAAAAAA',
      disasterId: 'AAAAAAA',
      casualtyId: 'AAAAAAA',
      liveStockTypeId: 'AAAAAAA',
      liveStockAffected: 0,
      estimatedLoss: 0,
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

    it('should create a LiveStock', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new LiveStock()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LiveStock', () => {
      const returnedFromService = Object.assign(
        {
          liveStockId: 'BBBBBB',
          disasterId: 'BBBBBB',
          casualtyId: 'BBBBBB',
          liveStockTypeId: 'BBBBBB',
          liveStockAffected: 1,
          estimatedLoss: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LiveStock', () => {
      const patchObject = Object.assign(
        {
          liveStockTypeId: 'BBBBBB',
          liveStockAffected: 1,
          estimatedLoss: 1,
        },
        new LiveStock()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LiveStock', () => {
      const returnedFromService = Object.assign(
        {
          liveStockId: 'BBBBBB',
          disasterId: 'BBBBBB',
          casualtyId: 'BBBBBB',
          liveStockTypeId: 'BBBBBB',
          liveStockAffected: 1,
          estimatedLoss: 1,
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

    it('should delete a LiveStock', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLiveStockToCollectionIfMissing', () => {
      it('should add a LiveStock to an empty array', () => {
        const liveStock: ILiveStock = { liveStockId: 'ABC' };
        expectedResult = service.addLiveStockToCollectionIfMissing([], liveStock);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(liveStock);
      });

      it('should not add a LiveStock to an array that contains it', () => {
        const liveStock: ILiveStock = { liveStockId: 'ABC' };
        const liveStockCollection: ILiveStock[] = [
          {
            ...liveStock,
          },
          { liveStockId: 'CBA' },
        ];
        expectedResult = service.addLiveStockToCollectionIfMissing(liveStockCollection, liveStock);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LiveStock to an array that doesn't contain it", () => {
        const liveStock: ILiveStock = { liveStockId: 'ABC' };
        const liveStockCollection: ILiveStock[] = [{ liveStockId: 'CBA' }];
        expectedResult = service.addLiveStockToCollectionIfMissing(liveStockCollection, liveStock);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(liveStock);
      });

      it('should add only unique LiveStock to an array', () => {
        const liveStockArray: ILiveStock[] = [
          { liveStockId: 'ABC' },
          { liveStockId: 'CBA' },
          { liveStockId: 'cdde6e9f-fb72-4726-808a-e849383b1649' },
        ];
        const liveStockCollection: ILiveStock[] = [{ liveStockId: 'ABC' }];
        expectedResult = service.addLiveStockToCollectionIfMissing(liveStockCollection, ...liveStockArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const liveStock: ILiveStock = { liveStockId: 'ABC' };
        const liveStock2: ILiveStock = { liveStockId: 'CBA' };
        expectedResult = service.addLiveStockToCollectionIfMissing([], liveStock, liveStock2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(liveStock);
        expect(expectedResult).toContain(liveStock2);
      });

      it('should accept null and undefined values', () => {
        const liveStock: ILiveStock = { liveStockId: 'ABC' };
        expectedResult = service.addLiveStockToCollectionIfMissing([], null, liveStock, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(liveStock);
      });

      it('should return initial array if no LiveStock is added', () => {
        const liveStockCollection: ILiveStock[] = [{ liveStockId: 'ABC' }];
        expectedResult = service.addLiveStockToCollectionIfMissing(liveStockCollection, undefined, null);
        expect(expectedResult).toEqual(liveStockCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
