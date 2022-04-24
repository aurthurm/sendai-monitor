import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { IDisaster } from '../disaster.model';

import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/config/pagination.constants';
import { DisasterService } from '../service/disaster.service';
import { DepartmentService } from 'app/entities/department/service/department.service';
import { HazardService } from 'app/entities/hazard/service/hazard.service';
import { DisasterTypeService } from 'app/entities/disaster-type/service/disaster-type.service';
import { DisasterCategoryService } from 'app/entities/disaster-category/service/disaster-category.service';
import { DisasterDeleteDialogComponent } from '../delete/disaster-delete-dialog.component';
import { IDepartment } from 'app/entities/department/department.model';
import { IHazard } from 'app/entities/hazard/hazard.model';
import { IDisasterType } from 'app/entities/disaster-type/disaster-type.model';
import { IDisasterCategory } from 'app/entities/disaster-category/disaster-category.model';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-disaster',
  templateUrl: './disaster.component.html',
})
export class DisasterComponent implements OnInit {
  account: Account | null = null;
  disasters?: IDisaster[];
  departments: IDepartment[] = [];
  hazards: IHazard[] = [];
  disasterTypes: IDisasterType[] = [];
  disasterCategories: IDisasterCategory[] = [];
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  filterBy = "all"

  private readonly destroy$ = new Subject<void>();

  constructor(
    protected disasterService: DisasterService,
    protected departmentService: DepartmentService, 
    protected hazardService: HazardService,
    protected disasterTypeService: DisasterTypeService,
    protected disasterCategoryService: DisasterCategoryService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.disasterService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        filterBy: this.filterBy,
      })
      .subscribe({
        next: (res: HttpResponse<IDisaster[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        error: () => {
          this.isLoading = false;
          this.onError();
        },
      });
  }

  filter(value: string): void {
    this.filterBy = value;
    this.loadPage()
  }

  search(event: any): void {
    this.disasterService.search({
      page: 0,
      size: 50,
      sort: this.sort(),
      text: event.target.value
    }).subscribe(res => {
      if (res.body){
        this.disasters = res.body
      }
    })
  }

  ngOnInit(): void {
    this.accountService
    .getAuthenticationState()
    .pipe(takeUntil(this.destroy$))
    .subscribe(account => {
      this.account = account
    });

    this.handleNavigation();      
    
    this.departmentService.query().subscribe(res => {
      if(res.body){
        this.departments = res.body;
      }
    })

    this.hazardService.query().subscribe(res => {
      if(res.body){
        this.hazards = res.body;
      }
    })

    this.disasterTypeService.query().subscribe(res => {
      if(res.body){
        this.disasterTypes = res.body;
      }
    })

    this.disasterCategoryService.query().subscribe(res => {
      if(res.body){
        this.disasterCategories = res.body;
      }
    })
  }

  trackDisasterId(index: number, item: IDisaster): string {
    return item.disasterId!;
  }

  delete(disaster: IDisaster): void {
    const modalRef = this.modalService.open(DisasterDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.disaster = disaster;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadPage();
      }
    });
  }

  getHazard(disaster: IDisaster): IHazard | null {
    const ha = this.hazards.filter(h => h.hazardId === disaster.hazardId)
    if(ha.length > 0) {
      return ha[0]
    }
    return null;
  }

  getDisasterType(disaster: IDisaster): IDisasterType | null {
    const dts = this.disasterTypes.filter(dt => dt.disasterTypeId === disaster.disasterTypeId)
    if(dts.length > 0) {
      return dts[0]
    }
    return null;
  }

  getDisasterCategory(disaster: IDisaster): IDisasterCategory | null {
    const dc = this.disasterCategories.filter(d => d.disasterCategoryId === disaster.disasterCategoryId)
    if(dc.length > 0) {
      return dc[0]
    }
    return null;
  }

  getDepartment(disaster: IDisaster): IDepartment | null {
    const dc = this.departments.filter(d => d.departmentId === disaster.departmentId)
    if(dc.length > 0) {
      return dc[0]
    }
    return null;
  }


  canEdit(disaster: IDisaster): boolean {
    if(disaster.approvalStatus === "APPROVED") {
      return false;
    }
    if(disaster.approvedBy === this.account?.login){
      return false;
    }
    return true;
  }

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'disasterId') {
      result.push('disasterId');
    }
    return result;
  }

  protected handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: IDisaster[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/disaster'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.disasters = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
  
}
