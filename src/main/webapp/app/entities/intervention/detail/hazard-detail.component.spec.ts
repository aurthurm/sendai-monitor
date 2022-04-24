import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HazardDetailComponent } from './hazard-detail.component';

describe('Hazard Management Detail Component', () => {
  let comp: HazardDetailComponent;
  let fixture: ComponentFixture<HazardDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HazardDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ hazard: { hazardId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(HazardDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HazardDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load hazard on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.hazard).toEqual(expect.objectContaining({ hazardId: 'ABC' }));
    });
  });
});
