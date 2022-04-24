import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IBeneficiary, Beneficiary } from '../beneficiary.model';
import { BeneficiaryService } from '../service/beneficiary.service';

import { BeneficiaryRoutingResolveService } from './beneficiary-routing-resolve.service';

describe('Beneficiary routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: BeneficiaryRoutingResolveService;
  let service: BeneficiaryService;
  let resultBeneficiary: IBeneficiary | undefined;

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
    routingResolveService = TestBed.inject(BeneficiaryRoutingResolveService);
    service = TestBed.inject(BeneficiaryService);
    resultBeneficiary = undefined;
  });

  describe('resolve', () => {
    it('should return IBeneficiary returned by find', () => {
      // GIVEN
      service.find = jest.fn(beneficiaryId => of(new HttpResponse({ body: { beneficiaryId } })));
      mockActivatedRouteSnapshot.params = { beneficiaryId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBeneficiary = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultBeneficiary).toEqual({ beneficiaryId: 'ABC' });
    });

    it('should return new IBeneficiary if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBeneficiary = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultBeneficiary).toEqual(new Beneficiary());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Beneficiary })));
      mockActivatedRouteSnapshot.params = { beneficiaryId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBeneficiary = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultBeneficiary).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
