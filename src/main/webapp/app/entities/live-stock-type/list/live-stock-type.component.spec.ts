import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LiveStockTypeService } from '../service/live-stock-type.service';

import { LiveStockTypeComponent } from './live-stock-type.component';

describe('LiveStockType Management Component', () => {
  let comp: LiveStockTypeComponent;
  let fixture: ComponentFixture<LiveStockTypeComponent>;
  let service: LiveStockTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'live-stock-type', component: LiveStockTypeComponent }]), HttpClientTestingModule],
      declarations: [LiveStockTypeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'liveStockTypeId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'liveStockTypeId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(LiveStockTypeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LiveStockTypeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LiveStockTypeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ liveStockTypeId: 'ABC' }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.liveStockTypes?.[0]).toEqual(expect.objectContaining({ liveStockTypeId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.liveStockTypes?.[0]).toEqual(expect.objectContaining({ liveStockTypeId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['liveStockTypeId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'liveStockTypeId'] }));
  });
});
