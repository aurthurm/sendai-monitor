import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDisasterType, DisasterType } from '../disaster-type.model';
import { DisasterTypeService } from '../service/disaster-type.service';

import { DisasterTypeRoutingResolveService } from './disaster-type-routing-resolve.service';

describe('DisasterType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DisasterTypeRoutingResolveService;
  let service: DisasterTypeService;
  let resultDisasterType: IDisasterType | undefined;

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
    routingResolveService = TestBed.inject(DisasterTypeRoutingResolveService);
    service = TestBed.inject(DisasterTypeService);
    resultDisasterType = undefined;
  });

  describe('resolve', () => {
    it('should return IDisasterType returned by find', () => {
      // GIVEN
      service.find = jest.fn(disasterTypeId => of(new HttpResponse({ body: { disasterTypeId } })));
      mockActivatedRouteSnapshot.params = { disasterTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisasterType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDisasterType).toEqual({ disasterTypeId: 'ABC' });
    });

    it('should return new IDisasterType if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisasterType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDisasterType).toEqual(new DisasterType());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DisasterType })));
      mockActivatedRouteSnapshot.params = { disasterTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisasterType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDisasterType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
