import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDistrict, District } from '../district.model';

import { DistrictService } from './district.service';

describe('District Service', () => {
  let service: DistrictService;
  let httpMock: HttpTestingController;
  let elemDefault: IDistrict;
  let expectedResult: IDistrict | IDistrict[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DistrictService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      districtId: 'AAAAAAA',
      provinceId: 'AAAAAAA',
      name: 'AAAAAAA',
      latitude: 'AAAAAAA',
      longitude: 'AAAAAAA',
      level: 0,
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

    it('should create a District', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new District()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a District', () => {
      const returnedFromService = Object.assign(
        {
          districtId: 'BBBBBB',
          provinceId: 'BBBBBB',
          name: 'BBBBBB',
          latitude: 'BBBBBB',
          longitude: 'BBBBBB',
          level: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a District', () => {
      const patchObject = Object.assign(
        {
          provinceId: 'BBBBBB',
          latitude: 'BBBBBB',
        },
        new District()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of District', () => {
      const returnedFromService = Object.assign(
        {
          districtId: 'BBBBBB',
          provinceId: 'BBBBBB',
          name: 'BBBBBB',
          latitude: 'BBBBBB',
          longitude: 'BBBBBB',
          level: 1,
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

    it('should delete a District', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDistrictToCollectionIfMissing', () => {
      it('should add a District to an empty array', () => {
        const district: IDistrict = { districtId: 'ABC' };
        expectedResult = service.addDistrictToCollectionIfMissing([], district);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(district);
      });

      it('should not add a District to an array that contains it', () => {
        const district: IDistrict = { districtId: 'ABC' };
        const districtCollection: IDistrict[] = [
          {
            ...district,
          },
          { districtId: 'CBA' },
        ];
        expectedResult = service.addDistrictToCollectionIfMissing(districtCollection, district);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a District to an array that doesn't contain it", () => {
        const district: IDistrict = { districtId: 'ABC' };
        const districtCollection: IDistrict[] = [{ districtId: 'CBA' }];
        expectedResult = service.addDistrictToCollectionIfMissing(districtCollection, district);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(district);
      });

      it('should add only unique District to an array', () => {
        const districtArray: IDistrict[] = [
          { districtId: 'ABC' },
          { districtId: 'CBA' },
          { districtId: 'f9262017-3b68-4630-a5c1-ebbc079dabce' },
        ];
        const districtCollection: IDistrict[] = [{ districtId: 'ABC' }];
        expectedResult = service.addDistrictToCollectionIfMissing(districtCollection, ...districtArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const district: IDistrict = { districtId: 'ABC' };
        const district2: IDistrict = { districtId: 'CBA' };
        expectedResult = service.addDistrictToCollectionIfMissing([], district, district2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(district);
        expect(expectedResult).toContain(district2);
      });

      it('should accept null and undefined values', () => {
        const district: IDistrict = { districtId: 'ABC' };
        expectedResult = service.addDistrictToCollectionIfMissing([], null, district, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(district);
      });

      it('should return initial array if no District is added', () => {
        const districtCollection: IDistrict[] = [{ districtId: 'ABC' }];
        expectedResult = service.addDistrictToCollectionIfMissing(districtCollection, undefined, null);
        expect(expectedResult).toEqual(districtCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
