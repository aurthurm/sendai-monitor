import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IHouseholdType, HouseholdType } from '../household-type.model';
import { HouseholdTypeService } from '../service/household-type.service';

import { HouseholdTypeRoutingResolveService } from './household-type-routing-resolve.service';

describe('HouseholdType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: HouseholdTypeRoutingResolveService;
  let service: HouseholdTypeService;
  let resultHouseholdType: IHouseholdType | undefined;

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
    routingResolveService = TestBed.inject(HouseholdTypeRoutingResolveService);
    service = TestBed.inject(HouseholdTypeService);
    resultHouseholdType = undefined;
  });

  describe('resolve', () => {
    it('should return IHouseholdType returned by find', () => {
      // GIVEN
      service.find = jest.fn(householdTypeId => of(new HttpResponse({ body: { householdTypeId } })));
      mockActivatedRouteSnapshot.params = { householdTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHouseholdType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultHouseholdType).toEqual({ householdTypeId: 'ABC' });
    });

    it('should return new IHouseholdType if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHouseholdType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultHouseholdType).toEqual(new HouseholdType());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as HouseholdType })));
      mockActivatedRouteSnapshot.params = { householdTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultHouseholdType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultHouseholdType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
