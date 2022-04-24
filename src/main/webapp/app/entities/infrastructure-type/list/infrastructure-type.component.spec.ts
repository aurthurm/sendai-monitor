import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { InfrastructureTypeService } from '../service/infrastructure-type.service';

import { InfrastructureTypeComponent } from './infrastructure-type.component';

describe('InfrastructureType Management Component', () => {
  let comp: InfrastructureTypeComponent;
  let fixture: ComponentFixture<InfrastructureTypeComponent>;
  let service: InfrastructureTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'infrastructure-type', component: InfrastructureTypeComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [InfrastructureTypeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'infractructureTypeId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'infractructureTypeId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(InfrastructureTypeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InfrastructureTypeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(InfrastructureTypeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ infractructureTypeId: 'ABC' }],
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
    expect(comp.infrastructureTypes?.[0]).toEqual(expect.objectContaining({ infractructureTypeId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.infrastructureTypes?.[0]).toEqual(expect.objectContaining({ infractructureTypeId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['infractructureTypeId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'infractructureTypeId'] }));
  });
});
