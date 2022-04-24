import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ASC, DESC, ITEMS_PER_PAGE, } from 'app/config/pagination.constants';
import { ILiveStock } from '../live-stock.model';
import { LiveStockService } from '../service/live-stock.service';

import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';

import { ILiveStockType } from 'app/entities/live-stock-type/live-stock-type.model';
import { LiveStockTypeService } from 'app/entities/live-stock-type/service/live-stock-type.service';


@Component({
  selector: 'jhi-live-stock-compact',
  templateUrl: './live-stock-compact.component.html',
})
export class LiveStockCompactComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  disaster?: IDisaster
  casualties?: ICasualty[] = [];
  liveStockTypes?: ILiveStockType[] = [];
  liveStocks?: ILiveStock[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate = "liveStockId";
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected liveStockService: LiveStockService,
    protected liveStockTypeService: LiveStockTypeService,
    protected disasterService: DisasterService,
    protected casualtyService: CasualtyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}


  ngOnInit(): void {
    this.getLiveStocks();

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

    this.liveStockTypeService.query().subscribe(res => {
      if(res.body){
        this.liveStockTypes = res.body;
      }
    })

  }

  getLiveStocks(): void {
    this.isLoading = true;

    const payload = {
      page: 0,
      size: this.itemsPerPage,
      sort: this.sort(),
      disasterId: this.disasterId,
    }
    this.liveStockService
      .query(payload)
      .subscribe(res => {
        if(res.body){
          this.liveStocks = res.body;
        }
      });

    this.isLoading = false;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'liveStockId') {
      result.push('liveStockId');
    }
    return result;
  }

   trackLiveStockId(index: number, item: ILiveStock): string {
    return item.liveStockId!;
  }

  getLiveStockType(id: string): ILiveStockType| null {
    const ha = this.liveStockTypes!.filter(h => h.liveStockTypeId === id)
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
