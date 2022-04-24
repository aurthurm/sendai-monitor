import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProjectDisasterService } from '../service/project-disaster.service';

import { ProjectDisasterComponent } from './project-disaster.component';

describe('ProjectDisaster Management Component', () => {
  let comp: ProjectDisasterComponent;
  let fixture: ComponentFixture<ProjectDisasterComponent>;
  let service: ProjectDisasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'project-disaster', component: ProjectDisasterComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [ProjectDisasterComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'projectDisasterId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'projectDisasterId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(ProjectDisasterComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProjectDisasterComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProjectDisasterService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ projectDisasterId: 'ABC' }],
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
    expect(comp.projectDisasters?.[0]).toEqual(expect.objectContaining({ projectDisasterId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.projectDisasters?.[0]).toEqual(expect.objectContaining({ projectDisasterId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['projectDisasterId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'projectDisasterId'] }));
  });
});
