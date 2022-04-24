import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CasualtyDetailComponent } from './casualty-detail.component';

describe('Casualty Management Detail Component', () => {
  let comp: CasualtyDetailComponent;
  let fixture: ComponentFixture<CasualtyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CasualtyDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ casualty: { casualtyId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(CasualtyDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CasualtyDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load casualty on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.casualty).toEqual(expect.objectContaining({ casualtyId: 'ABC' }));
    });
  });
});
