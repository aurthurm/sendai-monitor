import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InfrastructureDetailComponent } from './infrastructure-detail.component';

describe('Infrastructure Management Detail Component', () => {
  let comp: InfrastructureDetailComponent;
  let fixture: ComponentFixture<InfrastructureDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfrastructureDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ infrastructure: { infractructureId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(InfrastructureDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InfrastructureDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load infrastructure on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.infrastructure).toEqual(expect.objectContaining({ infractructureId: 'ABC' }));
    });
  });
});
