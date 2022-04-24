import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ASC, DESC, ITEMS_PER_PAGE, } from 'app/config/pagination.constants';
import { ICrop } from '../crop.model';
import { CropService } from '../service/crop.service';

import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';

import { ICropType } from 'app/entities/crop-type/crop-type.model';
import { CropTypeService } from 'app/entities/crop-type/service/crop-type.service';


@Component({
  selector: 'jhi-crop-compact',
  templateUrl: './crop-compact.component.html',
})
export class CropCompactComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  disaster?: IDisaster
  casualties?: ICasualty[] = [];
  cropTypes?: ICropType[] = [];
  crops?: ICrop[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate = "cropId";
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected cropService: CropService,
    protected cropTypeService: CropTypeService,
    protected disasterService: DisasterService,
    protected casualtyService: CasualtyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}


  ngOnInit(): void {
    this.getCrops();

    this.disasterService.find(this.disasterId).subscribe(res => {
      if(res.body){
        this.disaster = res.body;
      }
    })

    this.casualtyService.query().subscribe(res => {
      if(res.body){
        this.casualties = res.body;
      }
    })

    this.cropTypeService.query().subscribe(res => {
      if(res.body){
        this.cropTypes = res.body;
      }
    })

  }

  getCrops(): void {
    this.isLoading = true;

    const payload = {
      page: 0,
      size: this.itemsPerPage,
      sort: this.sort(),
      disasterId: this.disasterId,
    }
    this.cropService
      .query(payload)
      .subscribe(res => {
        if(res.body){
          this.crops = res.body;
        }
      });

    this.isLoading = false;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'cropId') {
      result.push('cropId');
    }
    return result;
  }

   trackCropId(index: number, item: ICrop): string {
    return item.cropId!;
  }

  getCropType(id: string): ICropType| null {
    const ha = this.cropTypes!.filter(h => h.cropTypeId === id)
    if(ha.length > 0) {
      return ha[0]
    }
    return null;
  }

  getCasualty(id: string): ICasualty | null {
    const ha = this.casualties!.filter(h => h.casualtyId === id)
    if(ha.length > 0) {
      return ha[0]
    }
    return null;
  }

}
