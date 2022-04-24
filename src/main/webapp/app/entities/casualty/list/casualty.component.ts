import { Component, Input, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICasualty } from '../casualty.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { CasualtyService } from '../service/casualty.service';
import { CasualtyDeleteDialogComponent } from '../delete/casualty-delete-dialog.component';

import { IDisaster } from 'app/entities/disaster/disaster.model';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

@Component({
  selector: 'jhi-casualty',
  templateUrl: './casualty.component.html',
})
export class CasualtyComponent implements OnInit {
  @Input() disasterId = "";
  casualties?: ICasualty[];
  disasters?: IDisaster[] = [];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected disasterService: DisasterService,
    protected casualtyService: CasualtyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    const payload = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      sort: this.sort(),
      disasterId: this.disasterId,
    }
    this.casualtyService
      .query(payload, this.disasterId)
      .subscribe({
        next: (res: HttpResponse<ICasualty[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  ngOnInit(): void {
    if(this.disasterId){
      this.predicate = 'casualtyId';
      this.ascending = true;
      this.loadPage(0, true);
    }else{
      this.handleNavigation();
    }

    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.disasterId) {
        this.disasterId = params.disasterId;
      }
    });
    
    this.disasterService.query().subscribe(res => {
      if(res.body){
        this.disasters = res.body;
      }
    })

  }

  getDisaster(disasterId: string): IDisaster | null {
    const ha = this.disasters!.filter(h => h.disasterId === disasterId)
    if(ha.length > 0) {
      return ha[0]
    }
    return null;
  }

  trackCasualtyId(index: number, item: ICasualty): string {
    return item.casualtyId!;
  }

  delete(casualty: ICasualty): void {
    const modalRef = this.modalService.open(CasualtyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.casualty = casualty;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'casualtyId') {
      result.push('casualtyId');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort'])?.split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: ICasualty[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/casualty'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.casualties = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
