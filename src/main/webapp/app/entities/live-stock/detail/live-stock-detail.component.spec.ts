import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LiveStockDetailComponent } from './live-stock-detail.component';

describe('LiveStock Management Detail Component', () => {
  let comp: LiveStockDetailComponent;
  let fixture: ComponentFixture<LiveStockDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveStockDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ liveStock: { liveStockId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(LiveStockDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(LiveStockDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load liveStock on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.liveStock).toEqual(expect.objectContaining({ liveStockId: 'ABC' }));
    });
  });
});
