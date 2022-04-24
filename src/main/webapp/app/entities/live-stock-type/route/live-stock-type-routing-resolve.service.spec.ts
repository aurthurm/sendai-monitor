import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ILiveStockType, LiveStockType } from '../live-stock-type.model';
import { LiveStockTypeService } from '../service/live-stock-type.service';

import { LiveStockTypeRoutingResolveService } from './live-stock-type-routing-resolve.service';

describe('LiveStockType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: LiveStockTypeRoutingResolveService;
  let service: LiveStockTypeService;
  let resultLiveStockType: ILiveStockType | undefined;

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
    routingResolveService = TestBed.inject(LiveStockTypeRoutingResolveService);
    service = TestBed.inject(LiveStockTypeService);
    resultLiveStockType = undefined;
  });

  describe('resolve', () => {
    it('should return ILiveStockType returned by find', () => {
      // GIVEN
      service.find = jest.fn(liveStockTypeId => of(new HttpResponse({ body: { liveStockTypeId } })));
      mockActivatedRouteSnapshot.params = { liveStockTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLiveStockType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultLiveStockType).toEqual({ liveStockTypeId: 'ABC' });
    });

    it('should return new ILiveStockType if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLiveStockType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLiveStockType).toEqual(new LiveStockType());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as LiveStockType })));
      mockActivatedRouteSnapshot.params = { liveStockTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLiveStockType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultLiveStockType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
