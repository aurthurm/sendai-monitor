import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ICropType, CropType } from '../crop-type.model';
import { CropTypeService } from '../service/crop-type.service';

import { CropTypeRoutingResolveService } from './crop-type-routing-resolve.service';

describe('CropType routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: CropTypeRoutingResolveService;
  let service: CropTypeService;
  let resultCropType: ICropType | undefined;

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
    routingResolveService = TestBed.inject(CropTypeRoutingResolveService);
    service = TestBed.inject(CropTypeService);
    resultCropType = undefined;
  });

  describe('resolve', () => {
    it('should return ICropType returned by find', () => {
      // GIVEN
      service.find = jest.fn(cropTypeId => of(new HttpResponse({ body: { cropTypeId } })));
      mockActivatedRouteSnapshot.params = { cropTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCropType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultCropType).toEqual({ cropTypeId: 'ABC' });
    });

    it('should return new ICropType if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCropType = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultCropType).toEqual(new CropType());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as CropType })));
      mockActivatedRouteSnapshot.params = { cropTypeId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultCropType = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultCropType).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
