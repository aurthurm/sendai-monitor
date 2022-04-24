import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DisasterTypeService } from '../service/disaster-type.service';

import { DisasterTypeComponent } from './disaster-type.component';

describe('DisasterType Management Component', () => {
  let comp: DisasterTypeComponent;
  let fixture: ComponentFixture<DisasterTypeComponent>;
  let service: DisasterTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'disaster-type', component: DisasterTypeComponent }]), HttpClientTestingModule],
      declarations: [DisasterTypeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'disasterTypeId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'disasterTypeId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(DisasterTypeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisasterTypeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DisasterTypeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ disasterTypeId: 'ABC' }],
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
    expect(comp.disasterTypes?.[0]).toEqual(expect.objectContaining({ disasterTypeId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.disasterTypes?.[0]).toEqual(expect.objectContaining({ disasterTypeId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['disasterTypeId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'disasterTypeId'] }));
  });
});
