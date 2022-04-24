import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IPartnerIntervention, PartnerIntervention } from '../partner-intervention.model';
import { PartnerInterventionService } from '../service/partner-intervention.service';

import { PartnerInterventionRoutingResolveService } from './partner-intervention-routing-resolve.service';

describe('PartnerIntervention routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: PartnerInterventionRoutingResolveService;
  let service: PartnerInterventionService;
  let resultPartnerIntervention: IPartnerIntervention | undefined;

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
    routingResolveService = TestBed.inject(PartnerInterventionRoutingResolveService);
    service = TestBed.inject(PartnerInterventionService);
    resultPartnerIntervention = undefined;
  });

  describe('resolve', () => {
    it('should return IPartnerIntervention returned by find', () => {
      // GIVEN
      service.find = jest.fn(inteventionId => of(new HttpResponse({ body: { inteventionId } })));
      mockActivatedRouteSnapshot.params = { inteventionId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPartnerIntervention = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultPartnerIntervention).toEqual({ inteventionId: 'ABC' });
    });

    it('should return new IPartnerIntervention if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPartnerIntervention = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultPartnerIntervention).toEqual(new PartnerIntervention());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PartnerIntervention })));
      mockActivatedRouteSnapshot.params = { inteventionId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultPartnerIntervention = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultPartnerIntervention).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
