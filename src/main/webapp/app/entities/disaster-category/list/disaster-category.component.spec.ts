import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DisasterCategoryService } from '../service/disaster-category.service';

import { DisasterCategoryComponent } from './disaster-category.component';

describe('DisasterCategory Management Component', () => {
  let comp: DisasterCategoryComponent;
  let fixture: ComponentFixture<DisasterCategoryComponent>;
  let service: DisasterCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'disaster-category', component: DisasterCategoryComponent }]),
        HttpClientTestingModule,
      ],
      declarations: [DisasterCategoryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'disasterCategoryId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'disasterCategoryId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(DisasterCategoryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisasterCategoryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DisasterCategoryService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ disasterCategoryId: 'ABC' }],
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
    expect(comp.disasterCategories?.[0]).toEqual(expect.objectContaining({ disasterCategoryId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.disasterCategories?.[0]).toEqual(expect.objectContaining({ disasterCategoryId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['disasterCategoryId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'disasterCategoryId'] }));
  });
});
