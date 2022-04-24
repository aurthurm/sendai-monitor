import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { WardService } from '../service/ward.service';
import { IWard, Ward } from '../ward.model';

import { WardUpdateComponent } from './ward-update.component';

describe('Ward Management Update Component', () => {
  let comp: WardUpdateComponent;
  let fixture: ComponentFixture<WardUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let wardService: WardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [WardUpdateComponent],
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
      .overrideTemplate(WardUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(WardUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    wardService = TestBed.inject(WardService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const ward: IWard = { wardId: 'CBA' };

      activatedRoute.data = of({ ward });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(ward));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Ward>>();
      const ward = { wardId: 'ABC' };
      jest.spyOn(wardService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ward });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ward }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(wardService.update).toHaveBeenCalledWith(ward);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Ward>>();
      const ward = new Ward();
      jest.spyOn(wardService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ward });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ward }));
      saveSubject.complete();

      // THEN
      expect(wardService.create).toHaveBeenCalledWith(ward);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Ward>>();
      const ward = { wardId: 'ABC' };
      jest.spyOn(wardService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ward });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(wardService.update).toHaveBeenCalledWith(ward);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
