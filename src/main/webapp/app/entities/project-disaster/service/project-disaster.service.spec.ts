import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProjectDisaster, ProjectDisaster } from '../project-disaster.model';

import { ProjectDisasterService } from './project-disaster.service';

describe('ProjectDisaster Service', () => {
  let service: ProjectDisasterService;
  let httpMock: HttpTestingController;
  let elemDefault: IProjectDisaster;
  let expectedResult: IProjectDisaster | IProjectDisaster[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProjectDisasterService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      projectDisasterId: 'AAAAAAA',
      projectId: 'AAAAAAA',
      disastertId: 'AAAAAAA',
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

    it('should create a ProjectDisaster', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ProjectDisaster()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProjectDisaster', () => {
      const returnedFromService = Object.assign(
        {
          projectDisasterId: 'BBBBBB',
          projectId: 'BBBBBB',
          disastertId: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProjectDisaster', () => {
      const patchObject = Object.assign(
        {
          projectId: 'BBBBBB',
          disastertId: 'BBBBBB',
        },
        new ProjectDisaster()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProjectDisaster', () => {
      const returnedFromService = Object.assign(
        {
          projectDisasterId: 'BBBBBB',
          projectId: 'BBBBBB',
          disastertId: 'BBBBBB',
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

    it('should delete a ProjectDisaster', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProjectDisasterToCollectionIfMissing', () => {
      it('should add a ProjectDisaster to an empty array', () => {
        const projectDisaster: IProjectDisaster = { projectDisasterId: 'ABC' };
        expectedResult = service.addProjectDisasterToCollectionIfMissing([], projectDisaster);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(projectDisaster);
      });

      it('should not add a ProjectDisaster to an array that contains it', () => {
        const projectDisaster: IProjectDisaster = { projectDisasterId: 'ABC' };
        const projectDisasterCollection: IProjectDisaster[] = [
          {
            ...projectDisaster,
          },
          { projectDisasterId: 'CBA' },
        ];
        expectedResult = service.addProjectDisasterToCollectionIfMissing(projectDisasterCollection, projectDisaster);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProjectDisaster to an array that doesn't contain it", () => {
        const projectDisaster: IProjectDisaster = { projectDisasterId: 'ABC' };
        const projectDisasterCollection: IProjectDisaster[] = [{ projectDisasterId: 'CBA' }];
        expectedResult = service.addProjectDisasterToCollectionIfMissing(projectDisasterCollection, projectDisaster);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projectDisaster);
      });

      it('should add only unique ProjectDisaster to an array', () => {
        const projectDisasterArray: IProjectDisaster[] = [
          { projectDisasterId: 'ABC' },
          { projectDisasterId: 'CBA' },
          { projectDisasterId: '0cacee8a-8ff6-43b1-b8e8-889750df2bad' },
        ];
        const projectDisasterCollection: IProjectDisaster[] = [{ projectDisasterId: 'ABC' }];
        expectedResult = service.addProjectDisasterToCollectionIfMissing(projectDisasterCollection, ...projectDisasterArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const projectDisaster: IProjectDisaster = { projectDisasterId: 'ABC' };
        const projectDisaster2: IProjectDisaster = { projectDisasterId: 'CBA' };
        expectedResult = service.addProjectDisasterToCollectionIfMissing([], projectDisaster, projectDisaster2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(projectDisaster);
        expect(expectedResult).toContain(projectDisaster2);
      });

      it('should accept null and undefined values', () => {
        const projectDisaster: IProjectDisaster = { projectDisasterId: 'ABC' };
        expectedResult = service.addProjectDisasterToCollectionIfMissing([], null, projectDisaster, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(projectDisaster);
      });

      it('should return initial array if no ProjectDisaster is added', () => {
        const projectDisasterCollection: IProjectDisaster[] = [{ projectDisasterId: 'ABC' }];
        expectedResult = service.addProjectDisasterToCollectionIfMissing(projectDisasterCollection, undefined, null);
        expect(expectedResult).toEqual(projectDisasterCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
