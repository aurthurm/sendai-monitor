import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PartnerInterventionService } from '../service/partner-intervention.service';
import { IPartnerIntervention, PartnerIntervention } from '../partner-intervention.model';

import { PartnerInterventionUpdateComponent } from './partner-intervention-update.component';

describe('PartnerIntervention Management Update Component', () => {
  let comp: PartnerInterventionUpdateComponent;
  let fixture: ComponentFixture<PartnerInterventionUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let partnerInterventionService: PartnerInterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PartnerInterventionUpdateComponent],
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
      .overrideTemplate(PartnerInterventionUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PartnerInterventionUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    partnerInterventionService = TestBed.inject(PartnerInterventionService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const partnerIntervention: IPartnerIntervention = { inteventionId: 'CBA' };

      activatedRoute.data = of({ partnerIntervention });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(partnerIntervention));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PartnerIntervention>>();
      const partnerIntervention = { inteventionId: 'ABC' };
      jest.spyOn(partnerInterventionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partnerIntervention });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: partnerIntervention }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(partnerInterventionService.update).toHaveBeenCalledWith(partnerIntervention);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PartnerIntervention>>();
      const partnerIntervention = new PartnerIntervention();
      jest.spyOn(partnerInterventionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partnerIntervention });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: partnerIntervention }));
      saveSubject.complete();

      // THEN
      expect(partnerInterventionService.create).toHaveBeenCalledWith(partnerIntervention);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<PartnerIntervention>>();
      const partnerIntervention = { inteventionId: 'ABC' };
      jest.spyOn(partnerInterventionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ partnerIntervention });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(partnerInterventionService.update).toHaveBeenCalledWith(partnerIntervention);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
