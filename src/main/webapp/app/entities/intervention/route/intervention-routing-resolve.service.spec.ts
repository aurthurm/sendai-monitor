import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IIntervention, Intervention } from '../intervention.model';
import { InterventionService } from '../service/intervention.service';

import { InterventionRoutingResolveService } from './intervention-routing-resolve.service';

describe('Intervention routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: InterventionRoutingResolveService;
  let service: InterventionService;
  let resultIntervention: IIntervention | undefined;

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
    routingResolveService = TestBed.inject(InterventionRoutingResolveService);
    service = TestBed.inject(InterventionService);
    resultIntervention = undefined;
  });

  describe('resolve', () => {
    it('should return IIntervention returned by find', () => {
      // GIVEN
      service.find = jest.fn(interventionId => of(new HttpResponse({ body: { interventionId } })));
      mockActivatedRouteSnapshot.params = { interventionId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIntervention = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultIntervention).toEqual({ interventionId: 'ABC' });
    });

    it('should return new IIntervention if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIntervention = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultIntervention).toEqual(new Intervention());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Intervention })));
      mockActivatedRouteSnapshot.params = { interventionId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultIntervention = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultIntervention).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
