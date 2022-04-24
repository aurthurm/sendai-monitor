import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HouseholdDetailComponent } from './household-detail.component';

describe('Household Management Detail Component', () => {
  let comp: HouseholdDetailComponent;
  let fixture: ComponentFixture<HouseholdDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseholdDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ household: { householdId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(HouseholdDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(HouseholdDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load household on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.household).toEqual(expect.objectContaining({ householdId: 'ABC' }));
    });
  });
});
