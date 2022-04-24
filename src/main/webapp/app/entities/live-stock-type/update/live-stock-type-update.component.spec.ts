import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { LiveStockTypeService } from '../service/live-stock-type.service';
import { ILiveStockType, LiveStockType } from '../live-stock-type.model';

import { LiveStockTypeUpdateComponent } from './live-stock-type-update.component';

describe('LiveStockType Management Update Component', () => {
  let comp: LiveStockTypeUpdateComponent;
  let fixture: ComponentFixture<LiveStockTypeUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let liveStockTypeService: LiveStockTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [LiveStockTypeUpdateComponent],
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
      .overrideTemplate(LiveStockTypeUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(LiveStockTypeUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    liveStockTypeService = TestBed.inject(LiveStockTypeService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const liveStockType: ILiveStockType = { liveStockTypeId: 'CBA' };

      activatedRoute.data = of({ liveStockType });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(liveStockType));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LiveStockType>>();
      const liveStockType = { liveStockTypeId: 'ABC' };
      jest.spyOn(liveStockTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ liveStockType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: liveStockType }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(liveStockTypeService.update).toHaveBeenCalledWith(liveStockType);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LiveStockType>>();
      const liveStockType = new LiveStockType();
      jest.spyOn(liveStockTypeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ liveStockType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: liveStockType }));
      saveSubject.complete();

      // THEN
      expect(liveStockTypeService.create).toHaveBeenCalledWith(liveStockType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<LiveStockType>>();
      const liveStockType = { liveStockTypeId: 'ABC' };
      jest.spyOn(liveStockTypeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ liveStockType });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(liveStockTypeService.update).toHaveBeenCalledWith(liveStockType);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
