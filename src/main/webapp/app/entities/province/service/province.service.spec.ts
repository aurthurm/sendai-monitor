import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProvince, Province } from '../province.model';

import { ProvinceService } from './province.service';

describe('Province Service', () => {
  let service: ProvinceService;
  let httpMock: HttpTestingController;
  let elemDefault: IProvince;
  let expectedResult: IProvince | IProvince[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProvinceService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      countryId: 'AAAAAAA',
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

    it('should create a Province', () => {
      const returnedFromService = Object.assign(
        {
          id: 'ID',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Province()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Province', () => {
      const returnedFromService = Object.assign(
        {
          countryId: 'BBBBBB',
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

    it('should partial update a Province', () => {
      const patchObject = Object.assign(
        {
          provinceId: 'BBBBBB',
          latitude: 'BBBBBB',
          level: 1,
        },
        new Province()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Province', () => {
      const returnedFromService = Object.assign(
        {
          countryId: 'BBBBBB',
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

    it('should delete a Province', () => {
      service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addProvinceToCollectionIfMissing', () => {
      it('should add a Province to an empty array', () => {
        const province: IProvince = { countryId: 'ABC' };
        expectedResult = service.addProvinceToCollectionIfMissing([], province);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(province);
      });

      it('should not add a Province to an array that contains it', () => {
        const province: IProvince = { countryId: 'ABC' };
        const provinceCollection: IProvince[] = [
          {
            ...province,
          },
          { countryId: 'CBA' },
        ];
        expectedResult = service.addProvinceToCollectionIfMissing(provinceCollection, province);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Province to an array that doesn't contain it", () => {
        const province: IProvince = { countryId: 'ABC' };
        const provinceCollection: IProvince[] = [{ countryId: 'CBA' }];
        expectedResult = service.addProvinceToCollectionIfMissing(provinceCollection, province);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(province);
      });

      it('should add only unique Province to an array', () => {
        const provinceArray: IProvince[] = [
          { countryId: 'ABC' },
          { countryId: 'CBA' },
          { countryId: '0c633512-6692-4f43-808f-972f74fafa05' },
        ];
        const provinceCollection: IProvince[] = [{ countryId: 'ABC' }];
        expectedResult = service.addProvinceToCollectionIfMissing(provinceCollection, ...provinceArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const province: IProvince = { countryId: 'ABC' };
        const province2: IProvince = { countryId: 'CBA' };
        expectedResult = service.addProvinceToCollectionIfMissing([], province, province2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(province);
        expect(expectedResult).toContain(province2);
      });

      it('should accept null and undefined values', () => {
        const province: IProvince = { countryId: 'ABC' };
        expectedResult = service.addProvinceToCollectionIfMissing([], null, province, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(province);
      });

      it('should return initial array if no Province is added', () => {
        const provinceCollection: IProvince[] = [{ countryId: 'ABC' }];
        expectedResult = service.addProvinceToCollectionIfMissing(provinceCollection, undefined, null);
        expect(expectedResult).toEqual(provinceCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
