import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDisaster, Disaster } from '../disaster.model';
import { DisasterService } from '../service/disaster.service';

import { DisasterRoutingResolveService } from './disaster-routing-resolve.service';

describe('Disaster routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DisasterRoutingResolveService;
  let service: DisasterService;
  let resultDisaster: IDisaster | undefined;

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
    routingResolveService = TestBed.inject(DisasterRoutingResolveService);
    service = TestBed.inject(DisasterService);
    resultDisaster = undefined;
  });

  describe('resolve', () => {
    it('should return IDisaster returned by find', () => {
      // GIVEN
      service.find = jest.fn(disasterId => of(new HttpResponse({ body: { disasterId } })));
      mockActivatedRouteSnapshot.params = { disasterId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisaster = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDisaster).toEqual({ disasterId: 'ABC' });
    });

    it('should return new IDisaster if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisaster = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDisaster).toEqual(new Disaster());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Disaster })));
      mockActivatedRouteSnapshot.params = { disasterId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisaster = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDisaster).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
