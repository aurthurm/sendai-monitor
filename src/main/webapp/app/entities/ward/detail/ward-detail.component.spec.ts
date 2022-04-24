import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { WardDetailComponent } from './ward-detail.component';

describe('Ward Management Detail Component', () => {
  let comp: WardDetailComponent;
  let fixture: ComponentFixture<WardDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WardDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ ward: { wardId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(WardDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(WardDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load ward on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.ward).toEqual(expect.objectContaining({ wardId: 'ABC' }));
    });
  });
});
