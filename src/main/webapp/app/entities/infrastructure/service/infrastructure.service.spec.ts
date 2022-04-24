import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInfrastructure, Infrastructure } from '../infrastructure.model';

import { InfrastructureService } from './infrastructure.service';

describe('Infrastructure Service', () => {
  let service: InfrastructureService;
  let httpMock: HttpTestingController;
  let elemDefault: IInfrastructure;
  let expectedResult: IInfrastructure | IInfrastructure[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InfrastructureService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      infractructureId: 'AAAAAAA',
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

    it('should create a Infrastructure', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Infrastructure()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Infrastructure', () => {
      const returnedFromService = Object.assign(
        {
          infractructureId: 'BBBBBB',
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

    it('should partial update a Infrastructure', () => {
      const patchObject = Object.assign(
        {
          disasterId: 'BBBBBB',
          infractructureTypeId: 'BBBBBB',
          damaged: 1,
          destroyed: 1,
          value: 1,
        },
        new Infrastructure()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Infrastructure', () => {
      const returnedFromService = Object.assign(
        {
          infractructureId: 'BBBBBB',
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

    it('should delete a Infrastructure', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInfrastructureToCollectionIfMissing', () => {
      it('should add a Infrastructure to an empty array', () => {
        const infrastructure: IInfrastructure = { infractructureId: 'ABC' };
        expectedResult = service.addInfrastructureToCollectionIfMissing([], infrastructure);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(infrastructure);
      });

      it('should not add a Infrastructure to an array that contains it', () => {
        const infrastructure: IInfrastructure = { infractructureId: 'ABC' };
        const infrastructureCollection: IInfrastructure[] = [
          {
            ...infrastructure,
          },
          { infractructureId: 'CBA' },
        ];
        expectedResult = service.addInfrastructureToCollectionIfMissing(infrastructureCollection, infrastructure);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Infrastructure to an array that doesn't contain it", () => {
        const infrastructure: IInfrastructure = { infractructureId: 'ABC' };
        const infrastructureCollection: IInfrastructure[] = [{ infractructureId: 'CBA' }];
        expectedResult = service.addInfrastructureToCollectionIfMissing(infrastructureCollection, infrastructure);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(infrastructure);
      });

      it('should add only unique Infrastructure to an array', () => {
        const infrastructureArray: IInfrastructure[] = [
          { infractructureId: 'ABC' },
          { infractructureId: 'CBA' },
          { infractructureId: 'd2964d8f-ba5a-42a3-baba-7a693ee3248b' },
        ];
        const infrastructureCollection: IInfrastructure[] = [{ infractructureId: 'ABC' }];
        expectedResult = service.addInfrastructureToCollectionIfMissing(infrastructureCollection, ...infrastructureArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const infrastructure: IInfrastructure = { infractructureId: 'ABC' };
        const infrastructure2: IInfrastructure = { infractructureId: 'CBA' };
        expectedResult = service.addInfrastructureToCollectionIfMissing([], infrastructure, infrastructure2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(infrastructure);
        expect(expectedResult).toContain(infrastructure2);
      });

      it('should accept null and undefined values', () => {
        const infrastructure: IInfrastructure = { infractructureId: 'ABC' };
        expectedResult = service.addInfrastructureToCollectionIfMissing([], null, infrastructure, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(infrastructure);
      });

      it('should return initial array if no Infrastructure is added', () => {
        const infrastructureCollection: IInfrastructure[] = [{ infractructureId: 'ABC' }];
        expectedResult = service.addInfrastructureToCollectionIfMissing(infrastructureCollection, undefined, null);
        expect(expectedResult).toEqual(infrastructureCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
