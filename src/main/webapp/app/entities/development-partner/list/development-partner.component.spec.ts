import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DevelopmentPartnerService } from '../service/development-partner.service';

import { DevelopmentPartnerComponent } from './development-partner.component';

describe('DevelopmentPartner Management Component', () => {
  let comp: DevelopmentPartnerComponent;
  let fixture: ComponentFixture<DevelopmentPartnerComponent>;
  let service: DevelopmentPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'development-partner', component: DevelopmentPartnerComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [DevelopmentPartnerComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'partnerId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'partnerId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(DevelopmentPartnerComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DevelopmentPartnerComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DevelopmentPartnerService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ partnerId: 'ABC' }],
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
    expect(comp.developmentPartners?.[0]).toEqual(expect.objectContaining({ partnerId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.developmentPartners?.[0]).toEqual(expect.objectContaining({ partnerId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['partnerId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'partnerId'] }));
  });
});
