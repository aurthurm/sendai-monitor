import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ILiveStock, LiveStock } from '../live-stock.model';
import { LiveStockService } from '../service/live-stock.service';

import { LiveStockRoutingResolveService } from './live-stock-routing-resolve.service';

describe('LiveStock routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: LiveStockRoutingResolveService;
  let service: LiveStockService;
  let resultLiveStock: ILiveStock | undefined;

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
    routingResolveService = TestBed.inject(LiveStockRoutingResolveService);
    service = TestBed.inject(LiveStockService);
    resultLiveStock = undefined;
  });

  describe('resolve', () => {
    it('should return ILiveStock returned by find', () => {
      // GIVEN
      service.find = jest.fn(liveStockId => of(new HttpResponse({ body: { liveStockId } })));
      mockActivatedRouteSnapshot.params = { liveStockId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLiveStock = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultLiveStock).toEqual({ liveStockId: 'ABC' });
    });

    it('should return new ILiveStock if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLiveStock = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultLiveStock).toEqual(new LiveStock());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as LiveStock })));
      mockActivatedRouteSnapshot.params = { liveStockId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultLiveStock = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultLiveStock).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
