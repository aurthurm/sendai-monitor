import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { HazardService } from '../service/hazard.service';
import { IHazard, Hazard } from '../hazard.model';

import { HazardUpdateComponent } from './hazard-update.component';

describe('Hazard Management Update Component', () => {
  let comp: HazardUpdateComponent;
  let fixture: ComponentFixture<HazardUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let hazardService: HazardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [HazardUpdateComponent],
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
      .overrideTemplate(HazardUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HazardUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    hazardService = TestBed.inject(HazardService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const hazard: IHazard = { hazardId: 'CBA' };

      activatedRoute.data = of({ hazard });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(hazard));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Hazard>>();
      const hazard = { hazardId: 'ABC' };
      jest.spyOn(hazardService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hazard });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hazard }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(hazardService.update).toHaveBeenCalledWith(hazard);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Hazard>>();
      const hazard = new Hazard();
      jest.spyOn(hazardService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hazard });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hazard }));
      saveSubject.complete();

      // THEN
      expect(hazardService.create).toHaveBeenCalledWith(hazard);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Hazard>>();
      const hazard = { hazardId: 'ABC' };
      jest.spyOn(hazardService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hazard });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(hazardService.update).toHaveBeenCalledWith(hazard);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
