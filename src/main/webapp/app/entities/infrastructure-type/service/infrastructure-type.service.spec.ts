import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IInfrastructureType, InfrastructureType } from '../infrastructure-type.model';

import { InfrastructureTypeService } from './infrastructure-type.service';

describe('InfrastructureType Service', () => {
  let service: InfrastructureTypeService;
  let httpMock: HttpTestingController;
  let elemDefault: IInfrastructureType;
  let expectedResult: IInfrastructureType | IInfrastructureType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(InfrastructureTypeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      infractructureTypeId: 'AAAAAAA',
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

    it('should create a InfrastructureType', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new InfrastructureType()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a InfrastructureType', () => {
      const returnedFromService = Object.assign(
        {
          infractructureTypeId: 'BBBBBB',
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

    it('should partial update a InfrastructureType', () => {
      const patchObject = Object.assign({}, new InfrastructureType());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of InfrastructureType', () => {
      const returnedFromService = Object.assign(
        {
          infractructureTypeId: 'BBBBBB',
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

    it('should delete a InfrastructureType', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addInfrastructureTypeToCollectionIfMissing', () => {
      it('should add a InfrastructureType to an empty array', () => {
        const infrastructureType: IInfrastructureType = { infractructureTypeId: 'ABC' };
        expectedResult = service.addInfrastructureTypeToCollectionIfMissing([], infrastructureType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(infrastructureType);
      });

      it('should not add a InfrastructureType to an array that contains it', () => {
        const infrastructureType: IInfrastructureType = { infractructureTypeId: 'ABC' };
        const infrastructureTypeCollection: IInfrastructureType[] = [
          {
            ...infrastructureType,
          },
          { infractructureTypeId: 'CBA' },
        ];
        expectedResult = service.addInfrastructureTypeToCollectionIfMissing(infrastructureTypeCollection, infrastructureType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a InfrastructureType to an array that doesn't contain it", () => {
        const infrastructureType: IInfrastructureType = { infractructureTypeId: 'ABC' };
        const infrastructureTypeCollection: IInfrastructureType[] = [{ infractructureTypeId: 'CBA' }];
        expectedResult = service.addInfrastructureTypeToCollectionIfMissing(infrastructureTypeCollection, infrastructureType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(infrastructureType);
      });

      it('should add only unique InfrastructureType to an array', () => {
        const infrastructureTypeArray: IInfrastructureType[] = [
          { infractructureTypeId: 'ABC' },
          { infractructureTypeId: 'CBA' },
          { infractructureTypeId: '03632c4f-8153-4f00-be79-d4977309fec8' },
        ];
        const infrastructureTypeCollection: IInfrastructureType[] = [{ infractructureTypeId: 'ABC' }];
        expectedResult = service.addInfrastructureTypeToCollectionIfMissing(infrastructureTypeCollection, ...infrastructureTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const infrastructureType: IInfrastructureType = { infractructureTypeId: 'ABC' };
        const infrastructureType2: IInfrastructureType = { infractructureTypeId: 'CBA' };
        expectedResult = service.addInfrastructureTypeToCollectionIfMissing([], infrastructureType, infrastructureType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(infrastructureType);
        expect(expectedResult).toContain(infrastructureType2);
      });

      it('should accept null and undefined values', () => {
        const infrastructureType: IInfrastructureType = { infractructureTypeId: 'ABC' };
        expectedResult = service.addInfrastructureTypeToCollectionIfMissing([], null, infrastructureType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(infrastructureType);
      });

      it('should return initial array if no InfrastructureType is added', () => {
        const infrastructureTypeCollection: IInfrastructureType[] = [{ infractructureTypeId: 'ABC' }];
        expectedResult = service.addInfrastructureTypeToCollectionIfMissing(infrastructureTypeCollection, undefined, null);
        expect(expectedResult).toEqual(infrastructureTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
