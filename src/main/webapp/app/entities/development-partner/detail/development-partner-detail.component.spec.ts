import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DevelopmentPartnerDetailComponent } from './development-partner-detail.component';

describe('DevelopmentPartner Management Detail Component', () => {
  let comp: DevelopmentPartnerDetailComponent;
  let fixture: ComponentFixture<DevelopmentPartnerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevelopmentPartnerDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ developmentPartner: { partnerId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(DevelopmentPartnerDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DevelopmentPartnerDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load developmentPartner on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.developmentPartner).toEqual(expect.objectContaining({ partnerId: 'ABC' }));
    });
  });
});
