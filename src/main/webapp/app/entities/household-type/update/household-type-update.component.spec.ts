import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HouseholdTypeService } from '../service/household-type.service';
import { IHouseholdType, HouseholdType } from '../household-type.model';

import { HouseholdTypeUpdateComponent } from './household-type-update.component';

describe('HouseholdType Management Update Component', () => {
  let comp: HouseholdTypeUpdateComponent;
  let fixture: ComponentFixture<HouseholdTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let householdTypeService: HouseholdTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HouseholdTypeUpdateComponent],
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
      .overrideTemplate(HouseholdTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HouseholdTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    householdTypeService = TestBed.inject(HouseholdTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const householdType: IHouseholdType = { householdTypeId: 'CBA' };

      activatedRoute.data = of({ householdType });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(householdType));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HouseholdType>>();
      const householdType = { householdTypeId: 'ABC' };
      jest.spyOn(householdTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ householdType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: householdType }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(householdTypeService.update).toHaveBeenCalledWith(householdType);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HouseholdType>>();
      const householdType = new HouseholdType();
      jest.spyOn(householdTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ householdType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: householdType }));
      saveSubject.complete();

      // THEN
      expect(householdTypeService.create).toHaveBeenCalledWith(householdType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<HouseholdType>>();
      const householdType = { householdTypeId: 'ABC' };
      jest.spyOn(householdTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ householdType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(householdTypeService.update).toHaveBeenCalledWith(householdType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
