import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IHazard, Hazard } from '../hazard.model';
import { HazardService } from '../service/hazard.service';

import { HazardRoutingResolveService } from './hazard-routing-resolve.service';

describe('Hazard routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: HazardRoutingResolveService;
  let service: HazardService;
  let resultHazard: IHazard | undefined;

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
    routingResolveService = TestBed.inject(HazardRoutingResolveService);
    service = TestBed.inject(HazardService);
    resultHazard = undefined;
  });

  describe('resolve', () => {
    it('should return IHazard returned by find', () => {
      // GIVEN
      service.find = jest.fn(hazardId => of(new HttpResponse({ body: { hazardId } })));
      mockActivatedRouteSnapshot.params = { hazardId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHazard = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultHazard).toEqual({ hazardId: 'ABC' });
    });

    it('should return new IHazard if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHazard = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHazard).toEqual(new Hazard());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Hazard })));
      mockActivatedRouteSnapshot.params = { hazardId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHazard = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultHazard).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
