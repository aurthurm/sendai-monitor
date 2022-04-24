import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDevelopmentPartner, DevelopmentPartner } from '../development-partner.model';
import { DevelopmentPartnerService } from '../service/development-partner.service';

import { DevelopmentPartnerRoutingResolveService } from './development-partner-routing-resolve.service';

describe('DevelopmentPartner routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DevelopmentPartnerRoutingResolveService;
  let service: DevelopmentPartnerService;
  let resultDevelopmentPartner: IDevelopmentPartner | undefined;

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
    routingResolveService = TestBed.inject(DevelopmentPartnerRoutingResolveService);
    service = TestBed.inject(DevelopmentPartnerService);
    resultDevelopmentPartner = undefined;
  });

  describe('resolve', () => {
    it('should return IDevelopmentPartner returned by find', () => {
      // GIVEN
      service.find = jest.fn(partnerId => of(new HttpResponse({ body: { partnerId } })));
      mockActivatedRouteSnapshot.params = { partnerId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDevelopmentPartner = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDevelopmentPartner).toEqual({ partnerId: 'ABC' });
    });

    it('should return new IDevelopmentPartner if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDevelopmentPartner = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDevelopmentPartner).toEqual(new DevelopmentPartner());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DevelopmentPartner })));
      mockActivatedRouteSnapshot.params = { partnerId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDevelopmentPartner = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDevelopmentPartner).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
