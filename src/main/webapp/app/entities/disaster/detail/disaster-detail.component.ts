import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { DepartmentService } from 'app/entities/department/service/department.service';
import { HazardService } from 'app/entities/hazard/service/hazard.service';
import { DisasterTypeService } from 'app/entities/disaster-type/service/disaster-type.service';
import { DisasterCategoryService } from 'app/entities/disaster-category/service/disaster-category.service';
import { IDisaster, ITreeData } from '../disaster.model';
import { DisasterService } from '../service/disaster.service';
import { IDepartment } from 'app/entities/department/department.model';
import { IHazard } from 'app/entities/hazard/hazard.model';
import { IDisasterType } from 'app/entities/disaster-type/disaster-type.model';
import { IDisasterCategory } from 'app/entities/disaster-category/disaster-category.model';
import { ReportService } from 'app/entities/report/service/report.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';

@Component({
  selector: 'jhi-disaster-detail',
  templateUrl: './disaster-detail.component.html',
  styleUrls: ['../disaster.scss'],
})
export class DisasterDetailComponent implements OnInit {
  account: Account | null = null;
  disaster: IDisaster | null = null;
  department: IDepartment | null = null;
  hazard: IHazard | null = null;
  disasterType: IDisasterType | null = null;
  disasterCategory: IDisasterCategory | null = null;
  isCollapsed = true;
  treeData!: ITreeData;
  pdfSrc: any = null;
  fetchingReport = false;
  disasterApprover = true;
  editDisabled = false;
  canDisaApprove = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected disasterService: DisasterService, 
    protected departmentService: DepartmentService, 
    protected hazardService: HazardService,
    protected reportService: ReportService,
    protected disasterTypeService: DisasterTypeService,
    protected disasterCategoryService: DisasterCategoryService,
    protected accountService: AccountService,
    protected router: Router,
  ) {}

  ngOnInit(): void {

    this.accountService
    .getAuthenticationState()
    .pipe(takeUntil(this.destroy$))
    .subscribe(account => {
      this.account = account
      if(account?.authorities.includes('DATA_APPROVER')){
        this.disasterApprover = true;
      }
    });

    this.activatedRoute.data.subscribe(({ disaster }) => {
      this.disaster = disaster;   

      if(['APPROVED'].includes(disaster?.approvalStatus)){
        this.editDisabled = true;
      }
      if(['PENDING', 'REQUESTCHANGES'].includes(disaster?.approvalStatus) && this.account?.login === disaster?.approvedBy){
        this.editDisabled = true;
      }
      if(['APPROVED'].includes(disaster?.approvalStatus) && this.account?.authorities.includes('ROLE_ADMIN')){
        this.canDisaApprove = true;
      }

      if(disaster.departmentId){
        this.departmentService.find(disaster.departmentId).subscribe(res => {
          if(res.body){
            this.department = res.body;
          }
        })
      }
      
      if(disaster.hazardId){
        this.hazardService.find(disaster.hazardId).subscribe(res => {
          if(res.body){
            this.hazard = res.body;
          }
        })
      }

      if(disaster.disasterTypeId){
        this.disasterTypeService.find(disaster.disasterTypeId).subscribe(res => {
          if(res.body){
            this.disasterType = res.body;
          }
        })
      }

      if(disaster.disasterCategoryId){
        this.disasterCategoryService.find(disaster.disasterCategoryId).subscribe(res => {
          if(res.body){
            this.disasterCategory = res.body;
          }
        })
      }

      this.disasterService.getTreeData().subscribe(res => {
        if(res.body){
          this.treeData = res.body as ITreeData;
        }
      })

    });
  }

  getLocation(): string {

    if((this.treeData as any) === undefined) {
      return ""
    }
    
    let final = "";
    switch (this.disaster?.location) {
      case "NATIONAL":
        return this.treeData.name

      case "PROVINCE":
        return this.treeData.provinces.filter(p => p.id === this.disaster?.locationId)[0].name

      case "DISTRICT":
        for(const province of this.treeData.provinces){
          province.districts.some(p => {
            if(p.id === this.disaster?.locationId) {
              final = p.name;
            }
            return p.id === this.disaster?.locationId;
          })
        }

        return final;

      case "WARD":
        for(const province of this.treeData.provinces){
          for(const district of province.districts){
            district.wards.some(p => {
              if(p.id === this.disaster?.locationId) {
                final = p.name;
              }
              return p.id === this.disaster?.locationId;
            })
          }
        }
        return final;

      case "VILLAGE":
        for(const province of this.treeData.provinces){
          for(const district of province.districts){
            for(const ward of district.wards){
              ward.villages.some(p => {
                if(p.id === this.disaster?.locationId) {
                  final = p.name;
                }
                return p.id === this.disaster?.locationId;
              })
            }
          }
        }
        return final;
    
      default:
        return "unknown"
    }
  }

  downloadAggregateReport(fileType: string, id: string): void {
    this.fetchingReport = true;
    this.reportService.downloadAggregate(fileType, [id]).subscribe(res => {
      this.fetchingReport = false;
      const buffer: any = res.body;
      const filed = new Blob([buffer], { 
        type: fileType === "pdf" ? 'application/pdf' : 'application/vnd.ms-excel'
      });
      const fileURL = URL.createObjectURL(filed);
      if(fileType === "pdf"){
        this.pdfSrc = fileURL;
        window.open(fileURL, '', '');
      } else {
        window.open(fileURL, '', '');
      }

    })
  }

  addCasualty(disasterId: string): void {
    this.router.navigate(['/casualty/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  viewCasualties(disasterId: string): void {
    this.router.navigate(['/casualty'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addProject(disasterId: string): void {
    this.router.navigate(['/project/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addDonor(disasterId: string): void {
    this.router.navigate(['/donation/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addResponseTeam(disasterId: string): void {
    this.router.navigate(['/response-team/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addPartner(disasterId: string): void {
    this.router.navigate(['/development-partner/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addInfrastructure(disasterId: string): void {
    this.router.navigate(['/infrastructure/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addLivestock(disasterId: string): void {
    this.router.navigate(['/live-stock/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addCrop(disasterId: string): void {
    this.router.navigate(['/crop/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addHousehold(disasterId: string): void {
    this.router.navigate(['/household/new'], {
      queryParams: {
        disasterId,
      },
    });
  }

  addFile(disasterId: string, fileType: string): void {
    this.router.navigate(['/file-data/new'], {
      queryParams: {
        disasterId,
        fileType
      },
    });
  }

  previousState(): void {
    window.history.back();
  }

}
