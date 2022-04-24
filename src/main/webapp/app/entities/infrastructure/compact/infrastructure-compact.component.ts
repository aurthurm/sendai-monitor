import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ASC, DESC, ITEMS_PER_PAGE, } from 'app/config/pagination.constants';
import { IInfrastructure } from '../infrastructure.model';
import { InfrastructureService } from '../service/infrastructure.service';

import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

import { ICasualty } from 'app/entities/casualty/casualty.model';
import { CasualtyService } from 'app/entities/casualty/service/casualty.service';

import { IInfrastructureType } from 'app/entities/infrastructure-type/infrastructure-type.model';
import { InfrastructureTypeService } from 'app/entities/infrastructure-type/service/infrastructure-type.service';


@Component({
  selector: 'jhi-infrastructure-compact',
  templateUrl: './infrastructure-compact.component.html',
})
export class InfrastructureCompactComponent implements OnInit {
  @Input() disasterId = "";
  @Input() casualtyId = "";
  disaster?: IDisaster
  casualties?: ICasualty[] = [];
  infrastructureTypes?: IInfrastructureType[] = [];
  infrastructures?: IInfrastructure[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate = "infractructureId";
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected infrastructureService: InfrastructureService,
    protected infrastructureTypeService: InfrastructureTypeService,
    protected disasterService: DisasterService,
    protected casualtyService: CasualtyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}


  ngOnInit(): void {
    this.getInfrastructures();

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

    this.infrastructureTypeService.query().subscribe(res => {
      if(res.body){
        this.infrastructureTypes = res.body;
      }
    })

  }

  getInfrastructures(): void {
    this.isLoading = true;

    const payload = {
      page: 0,
      size: this.itemsPerPage,
      sort: this.sort(),
      disasterId: this.disasterId,
    }
    this.infrastructureService
      .query(payload)
      .subscribe(res => {
        if(res.body){
          this.infrastructures = res.body;
        }
      });

    this.isLoading = false;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'infractructureId') {
      result.push('infractructureId');
    }
    return result;
  }

   trackInfrastructureId(index: number, item: IInfrastructure): string {
    return item.infractructureId!;
  }

  getInfrastructureType(id: string): IInfrastructureType| null {
    const ha = this.infrastructureTypes!.filter(h => h.infractructureTypeId === id)
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
