import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HouseholdTypeDetailComponent } from './household-type-detail.component';

describe('HouseholdType Management Detail Component', () => {
  let comp: HouseholdTypeDetailComponent;
  let fixture: ComponentFixture<HouseholdTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseholdTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ householdType: { householdTypeId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(HouseholdTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HouseholdTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load householdType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.householdType).toEqual(expect.objectContaining({ householdTypeId: 'ABC' }));
    });
  });
});
