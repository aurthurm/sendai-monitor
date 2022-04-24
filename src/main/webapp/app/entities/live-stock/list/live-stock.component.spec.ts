import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { LiveStockService } from '../service/live-stock.service';

import { LiveStockComponent } from './live-stock.component';

describe('LiveStock Management Component', () => {
  let comp: LiveStockComponent;
  let fixture: ComponentFixture<LiveStockComponent>;
  let service: LiveStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'live-stock', component: LiveStockComponent }]), HttpClientTestingModule],
      declarations: [LiveStockComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'liveStockId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'liveStockId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(LiveStockComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LiveStockComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(LiveStockService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ liveStockId: 'ABC' }],
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
    expect(comp.liveStocks?.[0]).toEqual(expect.objectContaining({ liveStockId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.liveStocks?.[0]).toEqual(expect.objectContaining({ liveStockId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['liveStockId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'liveStockId'] }));
  });
});
