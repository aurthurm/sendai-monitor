import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CropTypeService } from '../service/crop-type.service';
import { ICropType, CropType } from '../crop-type.model';

import { CropTypeUpdateComponent } from './crop-type-update.component';

describe('CropType Management Update Component', () => {
  let comp: CropTypeUpdateComponent;
  let fixture: ComponentFixture<CropTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let cropTypeService: CropTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CropTypeUpdateComponent],
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
      .overrideTemplate(CropTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CropTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    cropTypeService = TestBed.inject(CropTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const cropType: ICropType = { cropTypeId: 'CBA' };

      activatedRoute.data = of({ cropType });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(cropType));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CropType>>();
      const cropType = { cropTypeId: 'ABC' };
      jest.spyOn(cropTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cropType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cropType }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(cropTypeService.update).toHaveBeenCalledWith(cropType);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CropType>>();
      const cropType = new CropType();
      jest.spyOn(cropTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cropType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: cropType }));
      saveSubject.complete();

      // THEN
      expect(cropTypeService.create).toHaveBeenCalledWith(cropType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<CropType>>();
      const cropType = { cropTypeId: 'ABC' };
      jest.spyOn(cropTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ cropType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(cropTypeService.update).toHaveBeenCalledWith(cropType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
