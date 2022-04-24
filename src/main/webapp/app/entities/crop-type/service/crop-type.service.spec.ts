import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICropType, CropType } from '../crop-type.model';

import { CropTypeService } from './crop-type.service';

describe('CropType Service', () => {
  let service: CropTypeService;
  let httpMock: HttpTestingController;
  let elemDefault: ICropType;
  let expectedResult: ICropType | ICropType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CropTypeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      cropTypeId: 'AAAAAAA',
      name: 'AAAAAAA',
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

    it('should create a CropType', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new CropType()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CropType', () => {
      const returnedFromService = Object.assign(
        {
          cropTypeId: 'BBBBBB',
          name: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CropType', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
        },
        new CropType()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CropType', () => {
      const returnedFromService = Object.assign(
        {
          cropTypeId: 'BBBBBB',
          name: 'BBBBBB',
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

    it('should delete a CropType', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCropTypeToCollectionIfMissing', () => {
      it('should add a CropType to an empty array', () => {
        const cropType: ICropType = { cropTypeId: 'ABC' };
        expectedResult = service.addCropTypeToCollectionIfMissing([], cropType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cropType);
      });

      it('should not add a CropType to an array that contains it', () => {
        const cropType: ICropType = { cropTypeId: 'ABC' };
        const cropTypeCollection: ICropType[] = [
          {
            ...cropType,
          },
          { cropTypeId: 'CBA' },
        ];
        expectedResult = service.addCropTypeToCollectionIfMissing(cropTypeCollection, cropType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CropType to an array that doesn't contain it", () => {
        const cropType: ICropType = { cropTypeId: 'ABC' };
        const cropTypeCollection: ICropType[] = [{ cropTypeId: 'CBA' }];
        expectedResult = service.addCropTypeToCollectionIfMissing(cropTypeCollection, cropType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cropType);
      });

      it('should add only unique CropType to an array', () => {
        const cropTypeArray: ICropType[] = [
          { cropTypeId: 'ABC' },
          { cropTypeId: 'CBA' },
          { cropTypeId: '3bdc2066-1ad8-4c75-ade4-22111bee7c56' },
        ];
        const cropTypeCollection: ICropType[] = [{ cropTypeId: 'ABC' }];
        expectedResult = service.addCropTypeToCollectionIfMissing(cropTypeCollection, ...cropTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const cropType: ICropType = { cropTypeId: 'ABC' };
        const cropType2: ICropType = { cropTypeId: 'CBA' };
        expectedResult = service.addCropTypeToCollectionIfMissing([], cropType, cropType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(cropType);
        expect(expectedResult).toContain(cropType2);
      });

      it('should accept null and undefined values', () => {
        const cropType: ICropType = { cropTypeId: 'ABC' };
        expectedResult = service.addCropTypeToCollectionIfMissing([], null, cropType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(cropType);
      });

      it('should return initial array if no CropType is added', () => {
        const cropTypeCollection: ICropType[] = [{ cropTypeId: 'ABC' }];
        expectedResult = service.addCropTypeToCollectionIfMissing(cropTypeCollection, undefined, null);
        expect(expectedResult).toEqual(cropTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
