import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IProvince, Province } from '../province.model';
import { ProvinceService } from '../service/province.service';

import { ProvinceRoutingResolveService } from './province-routing-resolve.service';

describe('Province routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ProvinceRoutingResolveService;
  let service: ProvinceService;
  let resultProvince: IProvince | undefined;

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
    routingResolveService = TestBed.inject(ProvinceRoutingResolveService);
    service = TestBed.inject(ProvinceService);
    resultProvince = undefined;
  });

  describe('resolve', () => {
    it('should return IProvince returned by find', () => {
      // GIVEN
      service.find = jest.fn(countryId => of(new HttpResponse({ body: { countryId } })));
      mockActivatedRouteSnapshot.params = { countryId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProvince = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultProvince).toEqual({ countryId: 'ABC' });
    });

    it('should return new IProvince if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProvince = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultProvince).toEqual(new Province());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Province })));
      mockActivatedRouteSnapshot.params = { countryId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultProvince = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultProvince).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
