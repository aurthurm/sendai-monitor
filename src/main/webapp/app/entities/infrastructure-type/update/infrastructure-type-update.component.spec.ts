import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { InfrastructureTypeService } from '../service/infrastructure-type.service';
import { IInfrastructureType, InfrastructureType } from '../infrastructure-type.model';

import { InfrastructureTypeUpdateComponent } from './infrastructure-type-update.component';

describe('InfrastructureType Management Update Component', () => {
  let comp: InfrastructureTypeUpdateComponent;
  let fixture: ComponentFixture<InfrastructureTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let infrastructureTypeService: InfrastructureTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [InfrastructureTypeUpdateComponent],
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
      .overrideTemplate(InfrastructureTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InfrastructureTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    infrastructureTypeService = TestBed.inject(InfrastructureTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const infrastructureType: IInfrastructureType = { infractructureTypeId: 'CBA' };

      activatedRoute.data = of({ infrastructureType });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(infrastructureType));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InfrastructureType>>();
      const infrastructureType = { infractructureTypeId: 'ABC' };
      jest.spyOn(infrastructureTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ infrastructureType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: infrastructureType }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(infrastructureTypeService.update).toHaveBeenCalledWith(infrastructureType);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InfrastructureType>>();
      const infrastructureType = new InfrastructureType();
      jest.spyOn(infrastructureTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ infrastructureType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: infrastructureType }));
      saveSubject.complete();

      // THEN
      expect(infrastructureTypeService.create).toHaveBeenCalledWith(infrastructureType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<InfrastructureType>>();
      const infrastructureType = { infractructureTypeId: 'ABC' };
      jest.spyOn(infrastructureTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ infrastructureType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(infrastructureTypeService.update).toHaveBeenCalledWith(infrastructureType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
