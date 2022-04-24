import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PartnerInterventionService } from '../service/partner-intervention.service';

import { PartnerInterventionComponent } from './partner-intervention.component';

describe('PartnerIntervention Management Component', () => {
  let comp: PartnerInterventionComponent;
  let fixture: ComponentFixture<PartnerInterventionComponent>;
  let service: PartnerInterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'partner-intervention', component: PartnerInterventionComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [PartnerInterventionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'inteventionId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'inteventionId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(PartnerInterventionComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PartnerInterventionComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PartnerInterventionService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ inteventionId: 'ABC' }],
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
    expect(comp.partnerInterventions?.[0]).toEqual(expect.objectContaining({ inteventionId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.partnerInterventions?.[0]).toEqual(expect.objectContaining({ inteventionId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['inteventionId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'inteventionId'] }));
  });
});
