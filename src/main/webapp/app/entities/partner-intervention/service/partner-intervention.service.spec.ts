import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPartnerIntervention, PartnerIntervention } from '../partner-intervention.model';

import { PartnerInterventionService } from './partner-intervention.service';

describe('PartnerIntervention Service', () => {
  let service: PartnerInterventionService;
  let httpMock: HttpTestingController;
  let elemDefault: IPartnerIntervention;
  let expectedResult: IPartnerIntervention | IPartnerIntervention[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PartnerInterventionService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      inteventionId: 'AAAAAAA',
      partnerId: 'AAAAAAA',
      disasterId: 'AAAAAAA',
      projectId: 'AAAAAAA',
      hazardId: 'AAAAAAA',
      amountReceived: 0,
      assistanceOffered: 'AAAAAAA',
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

    it('should create a PartnerIntervention', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new PartnerIntervention()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a PartnerIntervention', () => {
      const returnedFromService = Object.assign(
        {
          inteventionId: 'BBBBBB',
          partnerId: 'BBBBBB',
          disasterId: 'BBBBBB',
          projectId: 'BBBBBB',
          hazardId: 'BBBBBB',
          amountReceived: 1,
          assistanceOffered: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a PartnerIntervention', () => {
      const patchObject = Object.assign(
        {
          disasterId: 'BBBBBB',
          projectId: 'BBBBBB',
          assistanceOffered: 'BBBBBB',
        },
        new PartnerIntervention()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of PartnerIntervention', () => {
      const returnedFromService = Object.assign(
        {
          inteventionId: 'BBBBBB',
          partnerId: 'BBBBBB',
          disasterId: 'BBBBBB',
          projectId: 'BBBBBB',
          hazardId: 'BBBBBB',
          amountReceived: 1,
          assistanceOffered: 'BBBBBB',
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

    it('should delete a PartnerIntervention', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPartnerInterventionToCollectionIfMissing', () => {
      it('should add a PartnerIntervention to an empty array', () => {
        const partnerIntervention: IPartnerIntervention = { inteventionId: 'ABC' };
        expectedResult = service.addPartnerInterventionToCollectionIfMissing([], partnerIntervention);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(partnerIntervention);
      });

      it('should not add a PartnerIntervention to an array that contains it', () => {
        const partnerIntervention: IPartnerIntervention = { inteventionId: 'ABC' };
        const partnerInterventionCollection: IPartnerIntervention[] = [
          {
            ...partnerIntervention,
          },
          { inteventionId: 'CBA' },
        ];
        expectedResult = service.addPartnerInterventionToCollectionIfMissing(partnerInterventionCollection, partnerIntervention);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a PartnerIntervention to an array that doesn't contain it", () => {
        const partnerIntervention: IPartnerIntervention = { inteventionId: 'ABC' };
        const partnerInterventionCollection: IPartnerIntervention[] = [{ inteventionId: 'CBA' }];
        expectedResult = service.addPartnerInterventionToCollectionIfMissing(partnerInterventionCollection, partnerIntervention);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(partnerIntervention);
      });

      it('should add only unique PartnerIntervention to an array', () => {
        const partnerInterventionArray: IPartnerIntervention[] = [
          { inteventionId: 'ABC' },
          { inteventionId: 'CBA' },
          { inteventionId: 'ff066541-e6ef-4f75-a47c-79dd52254e7a' },
        ];
        const partnerInterventionCollection: IPartnerIntervention[] = [{ inteventionId: 'ABC' }];
        expectedResult = service.addPartnerInterventionToCollectionIfMissing(partnerInterventionCollection, ...partnerInterventionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const partnerIntervention: IPartnerIntervention = { inteventionId: 'ABC' };
        const partnerIntervention2: IPartnerIntervention = { inteventionId: 'CBA' };
        expectedResult = service.addPartnerInterventionToCollectionIfMissing([], partnerIntervention, partnerIntervention2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(partnerIntervention);
        expect(expectedResult).toContain(partnerIntervention2);
      });

      it('should accept null and undefined values', () => {
        const partnerIntervention: IPartnerIntervention = { inteventionId: 'ABC' };
        expectedResult = service.addPartnerInterventionToCollectionIfMissing([], null, partnerIntervention, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(partnerIntervention);
      });

      it('should return initial array if no PartnerIntervention is added', () => {
        const partnerInterventionCollection: IPartnerIntervention[] = [{ inteventionId: 'ABC' }];
        expectedResult = service.addPartnerInterventionToCollectionIfMissing(partnerInterventionCollection, undefined, null);
        expect(expectedResult).toEqual(partnerInterventionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
