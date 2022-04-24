import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICasualty } from '../casualty.model';

import { ASC, DESC, ITEMS_PER_PAGE, } from 'app/config/pagination.constants';
import { CasualtyService } from '../service/casualty.service';

@Component({
  selector: 'jhi-casualty-compact',
  templateUrl: './casualty-compact.component.html',
})
export class CasualtyCompactComponent implements OnInit {
  @Input() disasterId = "";
  casualties?: ICasualty[];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate = "casualtyId";
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected casualtyService: CasualtyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}


  ngOnInit(): void {
    this.getCasualites()
  }

  getCasualites(): void {
    this.isLoading = true;

    const payload = {
      page: 0,
      size: this.itemsPerPage,
      sort: this.sort(),
      disasterId: this.disasterId,
    }
    this.casualtyService
      .query(payload)
      .subscribe(res => {
        if(res.body){
          this.casualties = res.body;
        }
      });

    this.isLoading = false;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'casualtyId') {
      result.push('casualtyId');
    }
    return result;
  }

   trackCasualtyId(index: number, item: ICasualty): string {
    return item.casualtyId!;
  }

  addInfrastructure(casualtyId: string): void {
    this.router.navigate(['/infrastructure/new'], {
      queryParams: {
        disasterId: this.disasterId,
        casualtyId
      },
    });
  }

  addLivestock(casualtyId: string): void {
    this.router.navigate(['/live-stock/new'], {
      queryParams: {
        disasterId: this.disasterId,
        casualtyId
      },
    });
  }

  addCrop(casualtyId: string): void {
    this.router.navigate(['/crop/new'], {
      queryParams: {
        disasterId: this.disasterId,
        casualtyId
      },
    });
  }

}
