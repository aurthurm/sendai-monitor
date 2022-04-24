import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ResponseTeamDetailComponent } from './response-team-detail.component';

describe('ResponseTeam Management Detail Component', () => {
  let comp: ResponseTeamDetailComponent;
  let fixture: ComponentFixture<ResponseTeamDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseTeamDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ responseTeam: { responseTeamId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(ResponseTeamDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ResponseTeamDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load responseTeam on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.responseTeam).toEqual(expect.objectContaining({ responseTeamId: 'ABC' }));
    });
  });
});
