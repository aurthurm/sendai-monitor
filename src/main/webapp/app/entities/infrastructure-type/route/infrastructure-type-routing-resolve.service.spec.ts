import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IInfrastructureType, InfrastructureType } from '../infrastructure-type.model';
import { InfrastructureTypeService } from '../service/infrastructure-type.service';

import { InfrastructureTypeRoutingResolveService } from './infrastructure-type-routing-resolve.service';

describe('InfrastructureType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InfrastructureTypeRoutingResolveService;
  let service: InfrastructureTypeService;
  let resultInfrastructureType: IInfrastructureType | undefined;

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
    routingResolveService = TestBed.inject(InfrastructureTypeRoutingResolveService);
    service = TestBed.inject(InfrastructureTypeService);
    resultInfrastructureType = undefined;
  });

  describe('resolve', () => {
    it('should return IInfrastructureType returned by find', () => {
      // GIVEN
      service.find = jest.fn(infractructureTypeId => of(new HttpResponse({ body: { infractructureTypeId } })));
      mockActivatedRouteSnapshot.params = { infractructureTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInfrastructureType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultInfrastructureType).toEqual({ infractructureTypeId: 'ABC' });
    });

    it('should return new IInfrastructureType if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInfrastructureType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultInfrastructureType).toEqual(new InfrastructureType());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as InfrastructureType })));
      mockActivatedRouteSnapshot.params = { infractructureTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInfrastructureType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultInfrastructureType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
