import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { CasualtyService } from '../service/casualty.service';
import { ICasualty, Casualty } from '../casualty.model';

import { CasualtyUpdateComponent } from './casualty-update.component';

describe('Casualty Management Update Component', () => {
  let comp: CasualtyUpdateComponent;
  let fixture: ComponentFixture<CasualtyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let casualtyService: CasualtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [CasualtyUpdateComponent],
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
      .overrideTemplate(CasualtyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CasualtyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    casualtyService = TestBed.inject(CasualtyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const casualty: ICasualty = { casualtyId: 'CBA' };

      activatedRoute.data = of({ casualty });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(casualty));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Casualty>>();
      const casualty = { casualtyId: 'ABC' };
      jest.spyOn(casualtyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ casualty });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: casualty }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(casualtyService.update).toHaveBeenCalledWith(casualty);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Casualty>>();
      const casualty = new Casualty();
      jest.spyOn(casualtyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ casualty });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: casualty }));
      saveSubject.complete();

      // THEN
      expect(casualtyService.create).toHaveBeenCalledWith(casualty);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Casualty>>();
      const casualty = { casualtyId: 'ABC' };
      jest.spyOn(casualtyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ casualty });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(casualtyService.update).toHaveBeenCalledWith(casualty);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
