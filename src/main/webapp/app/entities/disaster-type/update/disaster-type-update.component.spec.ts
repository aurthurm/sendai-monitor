import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DisasterTypeService } from '../service/disaster-type.service';
import { IDisasterType, DisasterType } from '../disaster-type.model';

import { DisasterTypeUpdateComponent } from './disaster-type-update.component';

describe('DisasterType Management Update Component', () => {
  let comp: DisasterTypeUpdateComponent;
  let fixture: ComponentFixture<DisasterTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let disasterTypeService: DisasterTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DisasterTypeUpdateComponent],
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
      .overrideTemplate(DisasterTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisasterTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    disasterTypeService = TestBed.inject(DisasterTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const disasterType: IDisasterType = { disasterTypeId: 'CBA' };

      activatedRoute.data = of({ disasterType });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(disasterType));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisasterType>>();
      const disasterType = { disasterTypeId: 'ABC' };
      jest.spyOn(disasterTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disasterType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disasterType }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(disasterTypeService.update).toHaveBeenCalledWith(disasterType);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisasterType>>();
      const disasterType = new DisasterType();
      jest.spyOn(disasterTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disasterType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disasterType }));
      saveSubject.complete();

      // THEN
      expect(disasterTypeService.create).toHaveBeenCalledWith(disasterType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DisasterType>>();
      const disasterType = { disasterTypeId: 'ABC' };
      jest.spyOn(disasterTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disasterType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(disasterTypeService.update).toHaveBeenCalledWith(disasterType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
