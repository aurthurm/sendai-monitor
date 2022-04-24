import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DisasterCategoryDetailComponent } from './disaster-category-detail.component';

describe('DisasterCategory Management Detail Component', () => {
  let comp: DisasterCategoryDetailComponent;
  let fixture: ComponentFixture<DisasterCategoryDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisasterCategoryDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ disasterCategory: { disasterCategoryId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(DisasterCategoryDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DisasterCategoryDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load disasterCategory on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.disasterCategory).toEqual(expect.objectContaining({ disasterCategoryId: 'ABC' }));
    });
  });
});
