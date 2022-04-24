import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IResponseTeam, ResponseTeam } from '../response-team.model';

import { ResponseTeamService } from './response-team.service';

describe('ResponseTeam Service', () => {
  let service: ResponseTeamService;
  let httpMock: HttpTestingController;
  let elemDefault: IResponseTeam;
  let expectedResult: IResponseTeam | IResponseTeam[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ResponseTeamService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      responseTeamId: 'AAAAAAA',
      disasterId: 'AAAAAAA',
      name: 'AAAAAAA',
      teamLead: 'AAAAAAA',
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

    it('should create a ResponseTeam', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ResponseTeam()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ResponseTeam', () => {
      const returnedFromService = Object.assign(
        {
          responseTeamId: 'BBBBBB',
          disasterId: 'BBBBBB',
          name: 'BBBBBB',
          teamLead: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ResponseTeam', () => {
      const patchObject = Object.assign(
        {
          teamLead: 'BBBBBB',
        },
        new ResponseTeam()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ResponseTeam', () => {
      const returnedFromService = Object.assign(
        {
          responseTeamId: 'BBBBBB',
          disasterId: 'BBBBBB',
          name: 'BBBBBB',
          teamLead: 'BBBBBB',
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

    it('should delete a ResponseTeam', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addResponseTeamToCollectionIfMissing', () => {
      it('should add a ResponseTeam to an empty array', () => {
        const responseTeam: IResponseTeam = { responseTeamId: 'ABC' };
        expectedResult = service.addResponseTeamToCollectionIfMissing([], responseTeam);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(responseTeam);
      });

      it('should not add a ResponseTeam to an array that contains it', () => {
        const responseTeam: IResponseTeam = { responseTeamId: 'ABC' };
        const responseTeamCollection: IResponseTeam[] = [
          {
            ...responseTeam,
          },
          { responseTeamId: 'CBA' },
        ];
        expectedResult = service.addResponseTeamToCollectionIfMissing(responseTeamCollection, responseTeam);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ResponseTeam to an array that doesn't contain it", () => {
        const responseTeam: IResponseTeam = { responseTeamId: 'ABC' };
        const responseTeamCollection: IResponseTeam[] = [{ responseTeamId: 'CBA' }];
        expectedResult = service.addResponseTeamToCollectionIfMissing(responseTeamCollection, responseTeam);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(responseTeam);
      });

      it('should add only unique ResponseTeam to an array', () => {
        const responseTeamArray: IResponseTeam[] = [
          { responseTeamId: 'ABC' },
          { responseTeamId: 'CBA' },
          { responseTeamId: '15fca7f2-e6db-4408-89ef-3916a5a837b4' },
        ];
        const responseTeamCollection: IResponseTeam[] = [{ responseTeamId: 'ABC' }];
        expectedResult = service.addResponseTeamToCollectionIfMissing(responseTeamCollection, ...responseTeamArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const responseTeam: IResponseTeam = { responseTeamId: 'ABC' };
        const responseTeam2: IResponseTeam = { responseTeamId: 'CBA' };
        expectedResult = service.addResponseTeamToCollectionIfMissing([], responseTeam, responseTeam2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(responseTeam);
        expect(expectedResult).toContain(responseTeam2);
      });

      it('should accept null and undefined values', () => {
        const responseTeam: IResponseTeam = { responseTeamId: 'ABC' };
        expectedResult = service.addResponseTeamToCollectionIfMissing([], null, responseTeam, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(responseTeam);
      });

      it('should return initial array if no ResponseTeam is added', () => {
        const responseTeamCollection: IResponseTeam[] = [{ responseTeamId: 'ABC' }];
        expectedResult = service.addResponseTeamToCollectionIfMissing(responseTeamCollection, undefined, null);
        expect(expectedResult).toEqual(responseTeamCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
