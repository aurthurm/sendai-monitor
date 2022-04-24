import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IInfrastructure, Infrastructure } from '../infrastructure.model';
import { InfrastructureService } from '../service/infrastructure.service';

import { InfrastructureRoutingResolveService } from './infrastructure-routing-resolve.service';

describe('Infrastructure routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InfrastructureRoutingResolveService;
  let service: InfrastructureService;
  let resultInfrastructure: IInfrastructure | undefined;

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
    routingResolveService = TestBed.inject(InfrastructureRoutingResolveService);
    service = TestBed.inject(InfrastructureService);
    resultInfrastructure = undefined;
  });

  describe('resolve', () => {
    it('should return IInfrastructure returned by find', () => {
      // GIVEN
      service.find = jest.fn(infractructureId => of(new HttpResponse({ body: { infractructureId } })));
      mockActivatedRouteSnapshot.params = { infractructureId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInfrastructure = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultInfrastructure).toEqual({ infractructureId: 'ABC' });
    });

    it('should return new IInfrastructure if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInfrastructure = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultInfrastructure).toEqual(new Infrastructure());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Infrastructure })));
      mockActivatedRouteSnapshot.params = { infractructureId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultInfrastructure = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultInfrastructure).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
