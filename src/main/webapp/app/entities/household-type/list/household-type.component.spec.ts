import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HouseholdTypeService } from '../service/household-type.service';

import { HouseholdTypeComponent } from './household-type.component';

describe('HouseholdType Management Component', () => {
  let comp: HouseholdTypeComponent;
  let fixture: ComponentFixture<HouseholdTypeComponent>;
  let service: HouseholdTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'household-type', component: HouseholdTypeComponent }]), HttpClientTestingModule],
      declarations: [HouseholdTypeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'householdTypeId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'householdTypeId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(HouseholdTypeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HouseholdTypeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HouseholdTypeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ householdTypeId: 'ABC' }],
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
    expect(comp.householdTypes?.[0]).toEqual(expect.objectContaining({ householdTypeId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.householdTypes?.[0]).toEqual(expect.objectContaining({ householdTypeId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['householdTypeId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'householdTypeId'] }));
  });
});
