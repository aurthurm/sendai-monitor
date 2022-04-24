import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICrop, Crop } from '../crop.model';

import { CropService } from './crop.service';

describe('Crop Service', () => {
  let service: CropService;
  let httpMock: HttpTestingController;
  let elemDefault: ICrop;
  let expectedResult: ICrop | ICrop[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CropService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      cropId: 'AAAAAAA',
      disasterId: 'AAAAAAA',
      casualtyId: 'AAAAAAA',
      cropTypeId: 'AAAAAAA',
      hecterageAffected: 0,
      estimatedLoss: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find('ABC').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Crop', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Crop()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Crop', () => {
      const returnedFromService = Object.assign(
        {
          cropId: 'BBBBBB',
          disasterId: 'BBBBBB',
          casualtyId: 'BBBBBB',
          cropTypeId: 'BBBBBB',
          hecterageAffected: 1,
          estimatedLoss: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Crop', () => {
      const patchObject = Object.assign(
        {
          disasterId: 'BBBBBB',
          hecterageAffected: 1,
          estimatedLoss: 1,
        },
        new Crop()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Crop', () => {
      const returnedFromService = Object.assign(
        {
          cropId: 'BBBBBB',
          disasterId: 'BBBBBB',
          casualtyId: 'BBBBBB',
          cropTypeId: 'BBBBBB',
          hecterageAffected: 1,
          estimatedLoss: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Crop', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCropToCollectionIfMissing', () => {
      it('should add a Crop to an empty array', () => {
        const crop: ICrop = { cropId: 'ABC' };
        expectedResult = service.addCropToCollectionIfMissing([], crop);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crop);
      });

      it('should not add a Crop to an array that contains it', () => {
        const crop: ICrop = { cropId: 'ABC' };
        const cropCollection: ICrop[] = [
          {
            ...crop,
          },
          { cropId: 'CBA' },
        ];
        expectedResult = service.addCropToCollectionIfMissing(cropCollection, crop);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Crop to an array that doesn't contain it", () => {
        const crop: ICrop = { cropId: 'ABC' };
        const cropCollection: ICrop[] = [{ cropId: 'CBA' }];
        expectedResult = service.addCropToCollectionIfMissing(cropCollection, crop);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crop);
      });

      it('should add only unique Crop to an array', () => {
        const cropArray: ICrop[] = [{ cropId: 'ABC' }, { cropId: 'CBA' }, { cropId: 'b0da62ee-ea59-4ace-ba1e-aa2d56e12cc0' }];
        const cropCollection: ICrop[] = [{ cropId: 'ABC' }];
        expectedResult = service.addCropToCollectionIfMissing(cropCollection, ...cropArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const crop: ICrop = { cropId: 'ABC' };
        const crop2: ICrop = { cropId: 'CBA' };
        expectedResult = service.addCropToCollectionIfMissing([], crop, crop2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(crop);
        expect(expectedResult).toContain(crop2);
      });

      it('should accept null and undefined values', () => {
        const crop: ICrop = { cropId: 'ABC' };
        expectedResult = service.addCropToCollectionIfMissing([], null, crop, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(crop);
      });

      it('should return initial array if no Crop is added', () => {
        const cropCollection: ICrop[] = [{ cropId: 'ABC' }];
        expectedResult = service.addCropToCollectionIfMissing(cropCollection, undefined, null);
        expect(expectedResult).toEqual(cropCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
