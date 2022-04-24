import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InfrastructureTypeDetailComponent } from './infrastructure-type-detail.component';

describe('InfrastructureType Management Detail Component', () => {
  let comp: InfrastructureTypeDetailComponent;
  let fixture: ComponentFixture<InfrastructureTypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfrastructureTypeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ infrastructureType: { infractructureTypeId: 'ABC' } }) },
        },
      ],
    })
      .overrideTemplate(InfrastructureTypeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(InfrastructureTypeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load infrastructureType on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.infrastructureType).toEqual(expect.objectContaining({ infractructureTypeId: 'ABC' }));
    });
  });
});
