import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IProjectDisaster, ProjectDisaster } from '../project-disaster.model';
import { ProjectDisasterService } from '../service/project-disaster.service';

import { ProjectDisasterRoutingResolveService } from './project-disaster-routing-resolve.service';

describe('ProjectDisaster routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProjectDisasterRoutingResolveService;
  let service: ProjectDisasterService;
  let resultProjectDisaster: IProjectDisaster | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(ProjectDisasterRoutingResolveService);
    service = TestBed.inject(ProjectDisasterService);
    resultProjectDisaster = undefined;
  });

  describe('resolve', () => {
    it('should return IProjectDisaster returned by find', () => {
      // GIVEN
      service.find = jest.fn(projectDisasterId => of(new HttpResponse({ body: { projectDisasterId } })));
      mockActivatedRouteSnapshot.params = { projectDisasterId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProjectDisaster = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultProjectDisaster).toEqual({ projectDisasterId: 'ABC' });
    });

    it('should return new IProjectDisaster if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProjectDisaster = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProjectDisaster).toEqual(new ProjectDisaster());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ProjectDisaster })));
      mockActivatedRouteSnapshot.params = { projectDisasterId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProjectDisaster = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultProjectDisaster).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
