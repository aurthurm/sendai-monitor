import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DevelopmentPartnerService } from '../service/development-partner.service';
import { IDevelopmentPartner, DevelopmentPartner } from '../development-partner.model';

import { DevelopmentPartnerUpdateComponent } from './development-partner-update.component';

describe('DevelopmentPartner Management Update Component', () => {
  let comp: DevelopmentPartnerUpdateComponent;
  let fixture: ComponentFixture<DevelopmentPartnerUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let developmentPartnerService: DevelopmentPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DevelopmentPartnerUpdateComponent],
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
      .overrideTemplate(DevelopmentPartnerUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DevelopmentPartnerUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    developmentPartnerService = TestBed.inject(DevelopmentPartnerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const developmentPartner: IDevelopmentPartner = { partnerId: 'CBA' };

      activatedRoute.data = of({ developmentPartner });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(developmentPartner));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DevelopmentPartner>>();
      const developmentPartner = { partnerId: 'ABC' };
      jest.spyOn(developmentPartnerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ developmentPartner });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: developmentPartner }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(developmentPartnerService.update).toHaveBeenCalledWith(developmentPartner);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DevelopmentPartner>>();
      const developmentPartner = new DevelopmentPartner();
      jest.spyOn(developmentPartnerService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ developmentPartner });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: developmentPartner }));
      saveSubject.complete();

      // THEN
      expect(developmentPartnerService.create).toHaveBeenCalledWith(developmentPartner);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<DevelopmentPartner>>();
      const developmentPartner = { partnerId: 'ABC' };
      jest.spyOn(developmentPartnerService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ developmentPartner });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(developmentPartnerService.update).toHaveBeenCalledWith(developmentPartner);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
