import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CropTypeDetailComponent } from './crop-type-detail.component';

describe('CropType Management Detail Component', () => {
  let comp: CropTypeDetailComponent;
  let fixture: ComponentFixture<CropTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ cropType: { cropTypeId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(CropTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(CropTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load cropType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.cropType).toEqual(expect.objectContaining({ cropTypeId: 'ABC' }));
    });
  });
});
