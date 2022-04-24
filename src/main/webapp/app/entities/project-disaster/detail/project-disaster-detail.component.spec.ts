import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectDisasterDetailComponent } from './project-disaster-detail.component';

describe('ProjectDisaster Management Detail Component', () => {
  let comp: ProjectDisasterDetailComponent;
  let fixture: ComponentFixture<ProjectDisasterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDisasterDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ projectDisaster: { projectDisasterId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(ProjectDisasterDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProjectDisasterDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load projectDisaster on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.projectDisaster).toEqual(expect.objectContaining({ projectDisasterId: 'ABC' }));
    });
  });
});
