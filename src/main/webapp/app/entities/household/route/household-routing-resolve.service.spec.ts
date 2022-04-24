import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IHousehold, Household } from '../household.model';
import { HouseholdService } from '../service/household.service';

import { HouseholdRoutingResolveService } from './household-routing-resolve.service';

describe('Household routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: HouseholdRoutingResolveService;
  let service: HouseholdService;
  let resultHousehold: IHousehold | undefined;

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
    routingResolveService = TestBed.inject(HouseholdRoutingResolveService);
    service = TestBed.inject(HouseholdService);
    resultHousehold = undefined;
  });

  describe('resolve', () => {
    it('should return IHousehold returned by find', () => {
      // GIVEN
      service.find = jest.fn(householdId => of(new HttpResponse({ body: { householdId } })));
      mockActivatedRouteSnapshot.params = { householdId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHousehold = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultHousehold).toEqual({ householdId: 'ABC' });
    });

    it('should return new IHousehold if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHousehold = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHousehold).toEqual(new Household());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Household })));
      mockActivatedRouteSnapshot.params = { householdId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHousehold = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultHousehold).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
