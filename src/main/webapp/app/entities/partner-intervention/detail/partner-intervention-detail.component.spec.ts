import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PartnerInterventionDetailComponent } from './partner-intervention-detail.component';

describe('PartnerIntervention Management Detail Component', () => {
  let comp: PartnerInterventionDetailComponent;
  let fixture: ComponentFixture<PartnerInterventionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerInterventionDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ partnerIntervention: { inteventionId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(PartnerInterventionDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PartnerInterventionDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load partnerIntervention on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.partnerIntervention).toEqual(expect.objectContaining({ inteventionId: 'ABC' }));
    });
  });
});
