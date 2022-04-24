import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBeneficiary, Beneficiary } from '../beneficiary.model';

import { BeneficiaryService } from './beneficiary.service';

describe('Beneficiary Service', () => {
  let service: BeneficiaryService;
  let httpMock: HttpTestingController;
  let elemDefault: IBeneficiary;
  let expectedResult: IBeneficiary | IBeneficiary[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BeneficiaryService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      beneficiaryId: 'AAAAAAA',
      projectId: 'AAAAAAA',
      amountReceived: 0,
      valueOfGoodsReceived: 0,
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

    it('should create a Beneficiary', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Beneficiary()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Beneficiary', () => {
      const returnedFromService = Object.assign(
        {
          beneficiaryId: 'BBBBBB',
          projectId: 'BBBBBB',
          amountReceived: 1,
          valueOfGoodsReceived: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Beneficiary', () => {
      const patchObject = Object.assign(
        {
          projectId: 'BBBBBB',
          amountReceived: 1,
          valueOfGoodsReceived: 1,
        },
        new Beneficiary()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Beneficiary', () => {
      const returnedFromService = Object.assign(
        {
          beneficiaryId: 'BBBBBB',
          projectId: 'BBBBBB',
          amountReceived: 1,
          valueOfGoodsReceived: 1,
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

    it('should delete a Beneficiary', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addBeneficiaryToCollectionIfMissing', () => {
      it('should add a Beneficiary to an empty array', () => {
        const beneficiary: IBeneficiary = { beneficiaryId: 'ABC' };
        expectedResult = service.addBeneficiaryToCollectionIfMissing([], beneficiary);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(beneficiary);
      });

      it('should not add a Beneficiary to an array that contains it', () => {
        const beneficiary: IBeneficiary = { beneficiaryId: 'ABC' };
        const beneficiaryCollection: IBeneficiary[] = [
          {
            ...beneficiary,
          },
          { beneficiaryId: 'CBA' },
        ];
        expectedResult = service.addBeneficiaryToCollectionIfMissing(beneficiaryCollection, beneficiary);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Beneficiary to an array that doesn't contain it", () => {
        const beneficiary: IBeneficiary = { beneficiaryId: 'ABC' };
        const beneficiaryCollection: IBeneficiary[] = [{ beneficiaryId: 'CBA' }];
        expectedResult = service.addBeneficiaryToCollectionIfMissing(beneficiaryCollection, beneficiary);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(beneficiary);
      });

      it('should add only unique Beneficiary to an array', () => {
        const beneficiaryArray: IBeneficiary[] = [
          { beneficiaryId: 'ABC' },
          { beneficiaryId: 'CBA' },
          { beneficiaryId: '9375189c-a5d9-4ce7-b571-341a3325e16d' },
        ];
        const beneficiaryCollection: IBeneficiary[] = [{ beneficiaryId: 'ABC' }];
        expectedResult = service.addBeneficiaryToCollectionIfMissing(beneficiaryCollection, ...beneficiaryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const beneficiary: IBeneficiary = { beneficiaryId: 'ABC' };
        const beneficiary2: IBeneficiary = { beneficiaryId: 'CBA' };
        expectedResult = service.addBeneficiaryToCollectionIfMissing([], beneficiary, beneficiary2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(beneficiary);
        expect(expectedResult).toContain(beneficiary2);
      });

      it('should accept null and undefined values', () => {
        const beneficiary: IBeneficiary = { beneficiaryId: 'ABC' };
        expectedResult = service.addBeneficiaryToCollectionIfMissing([], null, beneficiary, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(beneficiary);
      });

      it('should return initial array if no Beneficiary is added', () => {
        const beneficiaryCollection: IBeneficiary[] = [{ beneficiaryId: 'ABC' }];
        expectedResult = service.addBeneficiaryToCollectionIfMissing(beneficiaryCollection, undefined, null);
        expect(expectedResult).toEqual(beneficiaryCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
