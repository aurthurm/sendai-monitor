import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { InfrastructureService } from '../service/infrastructure.service';

import { InfrastructureComponent } from './infrastructure.component';

describe('Infrastructure Management Component', () => {
  let comp: InfrastructureComponent;
  let fixture: ComponentFixture<InfrastructureComponent>;
  let service: InfrastructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'infrastructure', component: InfrastructureComponent }]), HttpClientTestingModule],
      declarations: [InfrastructureComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'infractructureId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'infractructureId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(InfrastructureComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InfrastructureComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(InfrastructureService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ infractructureId: 'ABC' }],
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
    expect(comp.infrastructures?.[0]).toEqual(expect.objectContaining({ infractructureId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.infrastructures?.[0]).toEqual(expect.objectContaining({ infractructureId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['infractructureId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'infractructureId'] }));
  });
});
