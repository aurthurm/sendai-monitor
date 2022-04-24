import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ASC, DESC, ITEMS_PER_PAGE, } from 'app/config/pagination.constants';
import { IHousehold } from '../household.model';
import { HouseholdService } from '../service/household.service';

import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';

import { IHouseholdType } from 'app/entities/household-type/household-type.model';
import { HouseholdTypeService } from 'app/entities/household-type/service/household-type.service';


@Component({
  selector: 'jhi-household-compact',
  templateUrl: './household-compact.component.html',
})
export class HouseholdCompactComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  disaster?: IDisaster
  casualties?: ICasualty[] = [];
  householdTypes?: IHouseholdType[] = [];
  households?: IHousehold[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate = "householdId";
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected householdService: HouseholdService,
    protected householdTypeService: HouseholdTypeService,
    protected disasterService: DisasterService,
    protected casualtyService: CasualtyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}


  ngOnInit(): void {
    this.getHouseholds();

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

    this.householdTypeService.query().subscribe(res => {
      if(res.body){
        this.householdTypes = res.body;
      }
    })

  }

  getHouseholds(): void {
    this.isLoading = true;

    const payload = {
      page: 0,
      size: this.itemsPerPage,
      sort: this.sort(),
      disasterId: this.disasterId,
    }
    this.householdService
      .query(payload)
      .subscribe(res => {
        if(res.body){
          this.households = res.body;
        }
      });

    this.isLoading = false;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'householdId') {
      result.push('householdId');
    }
    return result;
  }

   trackHouseholdId(index: number, item: IHousehold): string {
    return item.householdId!;
  }

  getHouseholdType(id: string): IHouseholdType| null {
    const ha = this.householdTypes!.filter(h => h.householdTypeId === id)
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
