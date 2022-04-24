import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CasualtyService } from '../service/casualty.service';

import { CasualtyComponent } from './casualty.component';

describe('Casualty Management Component', () => {
  let comp: CasualtyComponent;
  let fixture: ComponentFixture<CasualtyComponent>;
  let service: CasualtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'casualty', component: CasualtyComponent }]), HttpClientTestingModule],
      declarations: [CasualtyComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'casualtyId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'casualtyId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(CasualtyComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CasualtyComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(CasualtyService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ casualtyId: 'ABC' }],
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
    expect(comp.casualties?.[0]).toEqual(expect.objectContaining({ casualtyId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.casualties?.[0]).toEqual(expect.objectContaining({ casualtyId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['casualtyId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'casualtyId'] }));
  });
});
