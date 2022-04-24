import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DisasterTypeDetailComponent } from './disaster-type-detail.component';

describe('DisasterType Management Detail Component', () => {
  let comp: DisasterTypeDetailComponent;
  let fixture: ComponentFixture<DisasterTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisasterTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ disasterType: { disasterTypeId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(DisasterTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DisasterTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load disasterType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.disasterType).toEqual(expect.objectContaining({ disasterTypeId: 'ABC' }));
    });
  });
});
