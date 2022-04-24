import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { BeneficiaryService } from '../service/beneficiary.service';

import { BeneficiaryComponent } from './beneficiary.component';

describe('Beneficiary Management Component', () => {
  let comp: BeneficiaryComponent;
  let fixture: ComponentFixture<BeneficiaryComponent>;
  let service: BeneficiaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'beneficiary', component: BeneficiaryComponent }]), HttpClientTestingModule],
      declarations: [BeneficiaryComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'beneficiaryId,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'beneficiaryId,desc',
              })
            ),
          },
        },
      ],
    })
      .overrideTemplate(BeneficiaryComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BeneficiaryComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(BeneficiaryService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ beneficiaryId: 'ABC' }],
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
    expect(comp.beneficiaries?.[0]).toEqual(expect.objectContaining({ beneficiaryId: 'ABC' }));
  });

  it('should load a page', () => {
    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.beneficiaries?.[0]).toEqual(expect.objectContaining({ beneficiaryId: 'ABC' }));
  });

  it('should calculate the sort attribute for an id', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['beneficiaryId,desc'] }));
  });

  it('should calculate the sort attribute for a non-id attribute', () => {
    // INIT
    comp.ngOnInit();

    // GIVEN
    comp.predicate = 'name';

    // WHEN
    comp.loadPage(1);

    // THEN
    expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,desc', 'beneficiaryId'] }));
  });
});
