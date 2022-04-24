import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProjectDisasterService } from '../service/project-disaster.service';
import { IProjectDisaster, ProjectDisaster } from '../project-disaster.model';

import { ProjectDisasterUpdateComponent } from './project-disaster-update.component';

describe('ProjectDisaster Management Update Component', () => {
  let comp: ProjectDisasterUpdateComponent;
  let fixture: ComponentFixture<ProjectDisasterUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let projectDisasterService: ProjectDisasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProjectDisasterUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProjectDisasterUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProjectDisasterUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    projectDisasterService = TestBed.inject(ProjectDisasterService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const projectDisaster: IProjectDisaster = { projectDisasterId: 'CBA' };

      activatedRoute.data = of({ projectDisaster });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(projectDisaster));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProjectDisaster>>();
      const projectDisaster = { projectDisasterId: 'ABC' };
      jest.spyOn(projectDisasterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectDisaster });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: projectDisaster }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(projectDisasterService.update).toHaveBeenCalledWith(projectDisaster);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProjectDisaster>>();
      const projectDisaster = new ProjectDisaster();
      jest.spyOn(projectDisasterService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectDisaster });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: projectDisaster }));
      saveSubject.complete();

      // THEN
      expect(projectDisasterService.create).toHaveBeenCalledWith(projectDisaster);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ProjectDisaster>>();
      const projectDisaster = { projectDisasterId: 'ABC' };
      jest.spyOn(projectDisasterService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ projectDisaster });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(projectDisasterService.update).toHaveBeenCalledWith(projectDisaster);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
