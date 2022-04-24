import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDonation, Donation } from '../donation.model';

import { DonationService } from './donation.service';

describe('Donation Service', () => {
  let service: DonationService;
  let httpMock: HttpTestingController;
  let elemDefault: IDonation;
  let expectedResult: IDonation | IDonation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DonationService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      donorId: 'AAAAAAA',
      disasterId: 'AAAAAAA',
      name: 'AAAAAAA',
      type: 'AAAAAAA',
      valueOfDonation: 0,
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

    it('should create a Donation', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Donation()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Donation', () => {
      const returnedFromService = Object.assign(
        {
          donorId: 'BBBBBB',
          disasterId: 'BBBBBB',
          name: 'BBBBBB',
          type: 'BBBBBB',
          valueOfDonation: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Donation', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          type: 'BBBBBB',
          valueOfDonation: 1,
        },
        new Donation()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Donation', () => {
      const returnedFromService = Object.assign(
        {
          donorId: 'BBBBBB',
          disasterId: 'BBBBBB',
          name: 'BBBBBB',
          type: 'BBBBBB',
          valueOfDonation: 1,
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

    it('should delete a Donation', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDonationToCollectionIfMissing', () => {
      it('should add a Donation to an empty array', () => {
        const donation: IDonation = { donorId: 'ABC' };
        expectedResult = service.addDonationToCollectionIfMissing([], donation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(donation);
      });

      it('should not add a Donation to an array that contains it', () => {
        const donation: IDonation = { donorId: 'ABC' };
        const donationCollection: IDonation[] = [
          {
            ...donation,
          },
          { donorId: 'CBA' },
        ];
        expectedResult = service.addDonationToCollectionIfMissing(donationCollection, donation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Donation to an array that doesn't contain it", () => {
        const donation: IDonation = { donorId: 'ABC' };
        const donationCollection: IDonation[] = [{ donorId: 'CBA' }];
        expectedResult = service.addDonationToCollectionIfMissing(donationCollection, donation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(donation);
      });

      it('should add only unique Donation to an array', () => {
        const donationArray: IDonation[] = [{ donorId: 'ABC' }, { donorId: 'CBA' }, { donorId: 'dc6bb616-8826-40a8-8fd2-75cf8c5ebe67' }];
        const donationCollection: IDonation[] = [{ donorId: 'ABC' }];
        expectedResult = service.addDonationToCollectionIfMissing(donationCollection, ...donationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const donation: IDonation = { donorId: 'ABC' };
        const donation2: IDonation = { donorId: 'CBA' };
        expectedResult = service.addDonationToCollectionIfMissing([], donation, donation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(donation);
        expect(expectedResult).toContain(donation2);
      });

      it('should accept null and undefined values', () => {
        const donation: IDonation = { donorId: 'ABC' };
        expectedResult = service.addDonationToCollectionIfMissing([], null, donation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(donation);
      });

      it('should return initial array if no Donation is added', () => {
        const donationCollection: IDonation[] = [{ donorId: 'ABC' }];
        expectedResult = service.addDonationToCollectionIfMissing(donationCollection, undefined, null);
        expect(expectedResult).toEqual(donationCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
