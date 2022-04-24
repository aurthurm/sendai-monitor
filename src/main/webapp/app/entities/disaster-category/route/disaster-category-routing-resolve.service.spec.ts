import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IDisasterCategory, DisasterCategory } from '../disaster-category.model';
import { DisasterCategoryService } from '../service/disaster-category.service';

import { DisasterCategoryRoutingResolveService } from './disaster-category-routing-resolve.service';

describe('DisasterCategory routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: DisasterCategoryRoutingResolveService;
  let service: DisasterCategoryService;
  let resultDisasterCategory: IDisasterCategory | undefined;

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
    routingResolveService = TestBed.inject(DisasterCategoryRoutingResolveService);
    service = TestBed.inject(DisasterCategoryService);
    resultDisasterCategory = undefined;
  });

  describe('resolve', () => {
    it('should return IDisasterCategory returned by find', () => {
      // GIVEN
      service.find = jest.fn(disasterCategoryId => of(new HttpResponse({ body: { disasterCategoryId } })));
      mockActivatedRouteSnapshot.params = { disasterCategoryId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisasterCategory = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDisasterCategory).toEqual({ disasterCategoryId: 'ABC' });
    });

    it('should return new IDisasterCategory if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisasterCategory = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultDisasterCategory).toEqual(new DisasterCategory());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DisasterCategory })));
      mockActivatedRouteSnapshot.params = { disasterCategoryId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultDisasterCategory = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultDisasterCategory).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
