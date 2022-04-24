import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ResponseTeamService } from '../service/response-team.service';
import { IResponseTeam, ResponseTeam } from '../response-team.model';

import { ResponseTeamUpdateComponent } from './response-team-update.component';

describe('ResponseTeam Management Update Component', () => {
  let comp: ResponseTeamUpdateComponent;
  let fixture: ComponentFixture<ResponseTeamUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let responseTeamService: ResponseTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ResponseTeamUpdateComponent],
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
      .overrideTemplate(ResponseTeamUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ResponseTeamUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    responseTeamService = TestBed.inject(ResponseTeamService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const responseTeam: IResponseTeam = { responseTeamId: 'CBA' };

      activatedRoute.data = of({ responseTeam });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(responseTeam));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ResponseTeam>>();
      const responseTeam = { responseTeamId: 'ABC' };
      jest.spyOn(responseTeamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ responseTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: responseTeam }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(responseTeamService.update).toHaveBeenCalledWith(responseTeam);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ResponseTeam>>();
      const responseTeam = new ResponseTeam();
      jest.spyOn(responseTeamService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ responseTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: responseTeam }));
      saveSubject.complete();

      // THEN
      expect(responseTeamService.create).toHaveBeenCalledWith(responseTeam);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ResponseTeam>>();
      const responseTeam = { responseTeamId: 'ABC' };
      jest.spyOn(responseTeamService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ responseTeam });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(responseTeamService.update).toHaveBeenCalledWith(responseTeam);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
