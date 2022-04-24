import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICasualty, Casualty } from '../casualty.model';
import { CasualtyService } from '../service/casualty.service';

import { CasualtyRoutingResolveService } from './casualty-routing-resolve.service';

describe('Casualty routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CasualtyRoutingResolveService;
  let service: CasualtyService;
  let resultCasualty: ICasualty | undefined;

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
    routingResolveService = TestBed.inject(CasualtyRoutingResolveService);
    service = TestBed.inject(CasualtyService);
    resultCasualty = undefined;
  });

  describe('resolve', () => {
    it('should return ICasualty returned by find', () => {
      // GIVEN
      service.find = jest.fn(casualtyId => of(new HttpResponse({ body: { casualtyId } })));
      mockActivatedRouteSnapshot.params = { casualtyId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCasualty = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultCasualty).toEqual({ casualtyId: 'ABC' });
    });

    it('should return new ICasualty if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCasualty = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCasualty).toEqual(new Casualty());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Casualty })));
      mockActivatedRouteSnapshot.params = { casualtyId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCasualty = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultCasualty).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
