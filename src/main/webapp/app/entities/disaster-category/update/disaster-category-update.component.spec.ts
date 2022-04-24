import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DisasterCategoryService } from '../service/disaster-category.service';
import { IDisasterCategory, DisasterCategory } from '../disaster-category.model';

import { DisasterCategoryUpdateComponent } from './disaster-category-update.component';

describe('DisasterCategory Management Update Component', () => {
  let comp: DisasterCategoryUpdateComponent;
  let fixture: ComponentFixture<DisasterCategoryUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let disasterCategoryService: DisasterCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DisasterCategoryUpdateComponent],
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
      .overrideTemplate(DisasterCategoryUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisasterCategoryUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    disasterCategoryService = TestBed.inject(DisasterCategoryService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const disasterCategory: IDisasterCategory = { disasterCategoryId: 'CBA' };

      activatedRoute.data = of({ disasterCategory });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(disasterCategory));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisasterCategory>>();
      const disasterCategory = { disasterCategoryId: 'ABC' };
      jest.spyOn(disasterCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disasterCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disasterCategory }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(disasterCategoryService.update).toHaveBeenCalledWith(disasterCategory);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisasterCategory>>();
      const disasterCategory = new DisasterCategory();
      jest.spyOn(disasterCategoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disasterCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disasterCategory }));
      saveSubject.complete();

      // THEN
      expect(disasterCategoryService.create).toHaveBeenCalledWith(disasterCategory);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisasterCategory>>();
      const disasterCategory = { disasterCategoryId: 'ABC' };
      jest.spyOn(disasterCategoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disasterCategory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(disasterCategoryService.update).toHaveBeenCalledWith(disasterCategory);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
