import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDevelopmentPartner, DevelopmentPartner } from '../development-partner.model';

import { DevelopmentPartnerService } from './development-partner.service';

describe('DevelopmentPartner Service', () => {
  let service: DevelopmentPartnerService;
  let httpMock: HttpTestingController;
  let elemDefault: IDevelopmentPartner;
  let expectedResult: IDevelopmentPartner | IDevelopmentPartner[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DevelopmentPartnerService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      partnerId: 'AAAAAAA',
      name: 'AAAAAAA',
      description: 'AAAAAAA',
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

    it('should create a DevelopmentPartner', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new DevelopmentPartner()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DevelopmentPartner', () => {
      const returnedFromService = Object.assign(
        {
          partnerId: 'BBBBBB',
          name: 'BBBBBB',
          description: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DevelopmentPartner', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
        },
        new DevelopmentPartner()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DevelopmentPartner', () => {
      const returnedFromService = Object.assign(
        {
          partnerId: 'BBBBBB',
          name: 'BBBBBB',
          description: 'BBBBBB',
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

    it('should delete a DevelopmentPartner', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDevelopmentPartnerToCollectionIfMissing', () => {
      it('should add a DevelopmentPartner to an empty array', () => {
        const developmentPartner: IDevelopmentPartner = { partnerId: 'ABC' };
        expectedResult = service.addDevelopmentPartnerToCollectionIfMissing([], developmentPartner);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(developmentPartner);
      });

      it('should not add a DevelopmentPartner to an array that contains it', () => {
        const developmentPartner: IDevelopmentPartner = { partnerId: 'ABC' };
        const developmentPartnerCollection: IDevelopmentPartner[] = [
          {
            ...developmentPartner,
          },
          { partnerId: 'CBA' },
        ];
        expectedResult = service.addDevelopmentPartnerToCollectionIfMissing(developmentPartnerCollection, developmentPartner);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DevelopmentPartner to an array that doesn't contain it", () => {
        const developmentPartner: IDevelopmentPartner = { partnerId: 'ABC' };
        const developmentPartnerCollection: IDevelopmentPartner[] = [{ partnerId: 'CBA' }];
        expectedResult = service.addDevelopmentPartnerToCollectionIfMissing(developmentPartnerCollection, developmentPartner);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(developmentPartner);
      });

      it('should add only unique DevelopmentPartner to an array', () => {
        const developmentPartnerArray: IDevelopmentPartner[] = [
          { partnerId: 'ABC' },
          { partnerId: 'CBA' },
          { partnerId: '67736eb8-6fbd-41e5-8816-3a3ee6299395' },
        ];
        const developmentPartnerCollection: IDevelopmentPartner[] = [{ partnerId: 'ABC' }];
        expectedResult = service.addDevelopmentPartnerToCollectionIfMissing(developmentPartnerCollection, ...developmentPartnerArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const developmentPartner: IDevelopmentPartner = { partnerId: 'ABC' };
        const developmentPartner2: IDevelopmentPartner = { partnerId: 'CBA' };
        expectedResult = service.addDevelopmentPartnerToCollectionIfMissing([], developmentPartner, developmentPartner2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(developmentPartner);
        expect(expectedResult).toContain(developmentPartner2);
      });

      it('should accept null and undefined values', () => {
        const developmentPartner: IDevelopmentPartner = { partnerId: 'ABC' };
        expectedResult = service.addDevelopmentPartnerToCollectionIfMissing([], null, developmentPartner, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(developmentPartner);
      });

      it('should return initial array if no DevelopmentPartner is added', () => {
        const developmentPartnerCollection: IDevelopmentPartner[] = [{ partnerId: 'ABC' }];
        expectedResult = service.addDevelopmentPartnerToCollectionIfMissing(developmentPartnerCollection, undefined, null);
        expect(expectedResult).toEqual(developmentPartnerCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
