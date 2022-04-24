import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LiveStockTypeDetailComponent } from './live-stock-type-detail.component';

describe('LiveStockType Management Detail Component', () => {
  let comp: LiveStockTypeDetailComponent;
  let fixture: ComponentFixture<LiveStockTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveStockTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ liveStockType: { liveStockTypeId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(LiveStockTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LiveStockTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load liveStockType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.liveStockType).toEqual(expect.objectContaining({ liveStockTypeId: 'ABC' }));
    });
  });
});
