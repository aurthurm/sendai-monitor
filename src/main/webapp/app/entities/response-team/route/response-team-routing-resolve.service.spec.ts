import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IResponseTeam, ResponseTeam } from '../response-team.model';
import { ResponseTeamService } from '../service/response-team.service';

import { ResponseTeamRoutingResolveService } from './response-team-routing-resolve.service';

describe('ResponseTeam routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: ResponseTeamRoutingResolveService;
  let service: ResponseTeamService;
  let resultResponseTeam: IResponseTeam | undefined;

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
    routingResolveService = TestBed.inject(ResponseTeamRoutingResolveService);
    service = TestBed.inject(ResponseTeamService);
    resultResponseTeam = undefined;
  });

  describe('resolve', () => {
    it('should return IResponseTeam returned by find', () => {
      // GIVEN
      service.find = jest.fn(responseTeamId => of(new HttpResponse({ body: { responseTeamId } })));
      mockActivatedRouteSnapshot.params = { responseTeamId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultResponseTeam = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultResponseTeam).toEqual({ responseTeamId: 'ABC' });
    });

    it('should return new IResponseTeam if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultResponseTeam = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultResponseTeam).toEqual(new ResponseTeam());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as ResponseTeam })));
      mockActivatedRouteSnapshot.params = { responseTeamId: 'ABC' };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultResponseTeam = result;
      });

      // THEN
      expect(service.find).toBeCalledWith('ABC');
      expect(resultResponseTeam).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
