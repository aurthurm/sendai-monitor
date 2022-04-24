import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IHazard, Hazard } from '../hazard.model';

import { HazardService } from './hazard.service';

describe('Hazard Service', () => {
  let service: HazardService;
  let httpMock: HttpTestingController;
  let elemDefault: IHazard;
  let expectedResult: IHazard | IHazard[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(HazardService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      hazardId: 'AAAAAAA',
      type: 'AAAAAAA',
      locationId: 'AAAAAAA',
      mitigation: 'AAAAAAA',
      description: 'AAAAAAA',
      severity: 'AAAAAAA',
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

    it('should create a Hazard', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Hazard()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Hazard', () => {
      const returnedFromService = Object.assign(
        {
          hazardId: 'BBBBBB',
          type: 'BBBBBB',
          locationId: 'BBBBBB',
          mitigation: 'BBBBBB',
          description: 'BBBBBB',
          severity: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Hazard', () => {
      const patchObject = Object.assign(
        {
          locationId: 'BBBBBB',
          description: 'BBBBBB',
        },
        new Hazard()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Hazard', () => {
      const returnedFromService = Object.assign(
        {
          hazardId: 'BBBBBB',
          type: 'BBBBBB',
          locationId: 'BBBBBB',
          mitigation: 'BBBBBB',
          description: 'BBBBBB',
          severity: 'BBBBBB',
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

    it('should delete a Hazard', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addHazardToCollectionIfMissing', () => {
      it('should add a Hazard to an empty array', () => {
        const hazard: IHazard = { hazardId: 'ABC' };
        expectedResult = service.addHazardToCollectionIfMissing([], hazard);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hazard);
      });

      it('should not add a Hazard to an array that contains it', () => {
        const hazard: IHazard = { hazardId: 'ABC' };
        const hazardCollection: IHazard[] = [
          {
            ...hazard,
          },
          { hazardId: 'CBA' },
        ];
        expectedResult = service.addHazardToCollectionIfMissing(hazardCollection, hazard);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Hazard to an array that doesn't contain it", () => {
        const hazard: IHazard = { hazardId: 'ABC' };
        const hazardCollection: IHazard[] = [{ hazardId: 'CBA' }];
        expectedResult = service.addHazardToCollectionIfMissing(hazardCollection, hazard);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hazard);
      });

      it('should add only unique Hazard to an array', () => {
        const hazardArray: IHazard[] = [{ hazardId: 'ABC' }, { hazardId: 'CBA' }, { hazardId: '69df44e3-b0ea-4c62-b530-27d4df508d22' }];
        const hazardCollection: IHazard[] = [{ hazardId: 'ABC' }];
        expectedResult = service.addHazardToCollectionIfMissing(hazardCollection, ...hazardArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const hazard: IHazard = { hazardId: 'ABC' };
        const hazard2: IHazard = { hazardId: 'CBA' };
        expectedResult = service.addHazardToCollectionIfMissing([], hazard, hazard2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hazard);
        expect(expectedResult).toContain(hazard2);
      });

      it('should accept null and undefined values', () => {
        const hazard: IHazard = { hazardId: 'ABC' };
        expectedResult = service.addHazardToCollectionIfMissing([], null, hazard, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hazard);
      });

      it('should return initial array if no Hazard is added', () => {
        const hazardCollection: IHazard[] = [{ hazardId: 'ABC' }];
        expectedResult = service.addHazardToCollectionIfMissing(hazardCollection, undefined, null);
        expect(expectedResult).toEqual(hazardCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
