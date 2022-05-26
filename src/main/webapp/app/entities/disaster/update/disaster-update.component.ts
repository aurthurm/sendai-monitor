import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import dayjs from 'dayjs/esm';
import { DATE_FORMAT } from 'app/config/input.constants';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

import { IDisaster, Disaster, ITreeData, IProvince, IDistrict, IWard, IVillage, IDisasterIntervention } from '../disaster.model';
import { DisasterService } from '../service/disaster.service';
import { DepartmentService } from 'app/entities/department/service/department.service';
import { HazardService } from 'app/entities/hazard/service/hazard.service';
import { DisasterTypeService } from 'app/entities/disaster-type/service/disaster-type.service';
import { DisasterCategoryService } from 'app/entities/disaster-category/service/disaster-category.service';
import { LOCATION } from 'app/entities/enumerations/location.model';
import { IDepartment } from 'app/entities/department/department.model';
import { IHazard } from 'app/entities/hazard/hazard.model';
import { IDisasterType } from 'app/entities/disaster-type/disaster-type.model';
import { IDisasterCategory } from 'app/entities/disaster-category/disaster-category.model';

import { IIntervention } from 'app/entities/intervention/intervention.model';
import { InterventionService } from 'app/entities/intervention/service/intervention.service';


@Component({
  selector: 'jhi-disaster-update',
  templateUrl: './disaster-update.component.html',
  styleUrls: ['../disaster.scss'],
})
export class DisasterUpdateComponent implements OnInit {

  title = "ng-multiselect-dropdown";
  isDeclaredDefaultValue =[];
  dropdownList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  disasterInterventions: IDisasterIntervention[] = [];
  selectedItems: Array<any> = [];
  isSaving = false;
  lOCATIONValues = Object.keys(LOCATION);
  departments: IDepartment[] = [];
  hazards: IHazard[] = [];
  interventions: IIntervention[] = [];
  disasterTypes: IDisasterType[] = [];
  disasterCategories: IDisasterCategory[] = [];
  treeData!: ITreeData;
  treeNode!: ITreeData | IProvince | IDistrict | IWard | IVillage

  editForm = this.fb.group({
    disasterId: [],
    departmentId: [],
    name: [],
    hazardId: [],
    cause: [],
    location: [],
    locationId: [],
    description: [],
    disasterCategoryId: [],
    disasterTypeId: [],
    caseId: [],
    currency: [],
    estimatedDamage: [],
    isDeclared: [],
    declarationDate: [],
    incidentDate: [],
    closureDate: [],
    intervention: [],
    disasterIntervention: [],
    approvalStatus: [],
    approvalComment: [],
    approvedBy: [],
    eligibleForApproval: [],
    targetPopulation: [],
    targetPopulationEstimate: [],
    affectedPopulation: [],
    directEconomicLoss: [],
    dipTank: [],
    longitude:[],
    latitude:[],
  });

  constructor(
    protected disasterService: DisasterService,
    protected departmentService: DepartmentService,
    protected hazardService: HazardService,
    protected disasterTypeService: DisasterTypeService,
    protected disasterCategoryService: DisasterCategoryService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected interventionService: InterventionService,
    protected router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(({ disaster }) => {

      if (disaster.disasterId === undefined) {
        const today = dayjs().endOf('day').format(DATE_FORMAT);
        disaster.declarationDate = today;
        disaster.closureDate = today;
      }

      this.departmentService.query().subscribe(res => {
        if (res.body) {
          this.departments = res.body;
        }
      })

      this.hazardService.query().subscribe(res => {
        if (res.body) {
          this.hazards = res.body;
        }
      })

      this.interventionService.query().subscribe(res => {
        if (res.body) {
          this.dropdownList = res.body;
        }
      })

      this.disasterService.getDisasterIntervention(disaster.disasterId).subscribe((res: any) => {
        if (res.body) {
          this.disasterInterventions = res.body;
        }
      })



      this.disasterTypeService.query().subscribe(res => {
        if (res.body) {
          this.disasterTypes = res.body;
        }
      })

      this.disasterCategoryService.query().subscribe(res => {
        if (res.body) {
          this.disasterCategories = res.body;
        }
      })

      this.disasterService.getTreeData().subscribe(res => {
        if (res.body) {
          this.treeData = res.body as ITreeData;
          if(disaster.location?.length <= 0){
            this.treeNode = res.body as ITreeData;
            this.editForm.patchValue({
              location: "NATIONAL",
              locationId: this.treeNode.id,
            });
          } else {
            this.treeData.provinces.forEach(province => {
              if(province.id === disaster?.locationId) {
                this.treeNode = province;
              }
              province.districts.forEach(district => {
                if(district.id === disaster?.locationId) {
                  this.treeNode = district;
                }
                district.wards.forEach(ward => {
                  if(ward.id === disaster?.locationId) {
                    this.treeNode = ward;
                  }
                  ward.villages.forEach(village => {
                    if(village.id === disaster?.locationId) {
                      this.treeNode = ward;
                    }
                  })
                })
              })
            })
          }
          if((this.treeNode as any) === undefined) {
            this.treeNode = this.treeData;
          }
        }
      })

      if (disaster.disasterId !== undefined) {
        this.isDeclaredDefaultValue = disaster.isDeclared
        this.updateForm(disaster);
      } else {
        this.editForm.patchValue({
          currency: "ZWD",
        });
      }
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'interventionId',
      textField: 'name',
      allowSearchFilter: true,
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
    };

  }
  onItemSelect(item: any): void {
    this.disasterInterventions.push(item);
  }
  onItemDeSelect(item: any): void {
    this.disasterInterventions.forEach((i, index) => {
      if (i.interventionId === item.interventionId) {
        this.disasterInterventions.splice(index, 1);
      }
    })
    console.log(this.disasterInterventions) // eslint-disable-line
  }

  onSelectAll(items: any): void {
    this.disasterInterventions = this.dropdownList;
    console.log("onSelectAll", items); // eslint-disable-line
  }

  onDeSelectAll(item: any): void {
    this.disasterInterventions = [];
    console.log("onDeSelectAll", item); // eslint-disable-line
  }
  previousState(): void {
    window.history.back();
  }

  onDeclaration(value: any): void {
    console.log("onDeclaration", value); // eslint-disable-line
  }

  save(): void {
    this.isSaving = true;
    let disaster = this.createFromForm();
    disaster = {
      ...disaster,
      locationId: this.treeNode.id,
    }

    if ([undefined, null, ""].includes(disaster.disasterId) === false) {
      this.subscribeToSaveResponse(this.disasterService.update(disaster));
    } else {
      disaster.disasterId = undefined;
      this.subscribeToSaveResponse(this.disasterService.create(disaster));
    }
  }

  toggleTree(event: any, location: string, locationObject: any): void {
    event.preventDefault();

    this.treeNode = locationObject;
    this.editForm.patchValue({
      location: location.toUpperCase(),
      locationId: locationObject.id,
    });

    if (location !== 'village') {
      const subMenuList = event.target.nextElementSibling;
      if (subMenuList.style.display === "none") {
        event.target.classList.remove("collapsed");
        event.target.classList.add("expanded");
        subMenuList.style.display = "block";
      }
      else {
        event.target.classList.remove("expanded");
        event.target.classList.add("collapsed");
        subMenuList.style.display = "none";
      }
    }

    event.stopPropagation();
  }

  trackId(item: any): string {
    return item.id as string;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisaster>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.router.navigate(['/disaster']);
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(disaster: IDisaster): void {
    this.editForm.patchValue({
      disasterId: disaster.disasterId,
      departmentId: disaster.departmentId,
      name: disaster.name,
      hazardId: disaster.hazardId,
      cause: disaster.cause,
      location: disaster.location,
      locationId: disaster.locationId,
      description: disaster.description,
      disasterCategoryId: disaster.disasterCategoryId,
      disasterTypeId: disaster.disasterTypeId,
      caseId: disaster.caseId,
      currency: disaster.currency,
      estimatedDamage: disaster.estimatedDamage,
      isDeclared: disaster.isDeclared,
      declarationDate: disaster.declarationDate ? disaster.declarationDate.format(DATE_FORMAT) : null,
      incidentDate: disaster.incidentDate ? disaster.incidentDate.format(DATE_FORMAT) : null,
      closureDate: disaster.closureDate ? disaster.closureDate.format(DATE_FORMAT) : null,
      intervention: disaster.intervention,
      disasterIntervention: this.disasterInterventions,
      approvalStatus: disaster.approvalStatus,
      approvalComment: disaster.approvalComment,
      approvedBy: disaster.approvedBy,
      eligibleForApproval: disaster.eligibleForApproval,
      targetPopulation: disaster.targetPopulation,
      targetPopulationEstimate: disaster.targetPopulationEstimate,
      affectedPopulation: disaster.affectedPopulation,
      directEconomicLoss: disaster.directEconomicLoss,
      dipTank: disaster.dipTank,
      longitude: disaster.longitude,
      latitude: disaster.latitude,
    });
  }

  protected createFromForm(): IDisaster {
    return {
      ...new Disaster(),
      disasterId: this.editForm.get(['disasterId'])!.value,
      departmentId: this.editForm.get(['departmentId'])!.value,
      name: this.editForm.get(['name'])!.value,
      hazardId: this.editForm.get(['hazardId'])!.value,
      cause: this.editForm.get(['cause'])!.value,
      location: this.editForm.get(['location'])!.value,
      locationId: this.editForm.get(['locationId'])!.value,
      description: this.editForm.get(['description'])!.value,
      disasterCategoryId: this.editForm.get(['disasterCategoryId'])!.value,
      disasterTypeId: this.editForm.get(['disasterTypeId'])!.value,
      caseId: this.editForm.get(['caseId'])!.value,
      currency: this.editForm.get(['currency'])!.value,
      estimatedDamage: this.editForm.get(['estimatedDamage'])!.value,
      isDeclared: this.editForm.get(['isDeclared'])!.value,
      declarationDate: this.editForm.get(['declarationDate'])!.value
        ? dayjs(this.editForm.get(['declarationDate'])!.value, DATE_FORMAT)
        : undefined,
      incidentDate: this.editForm.get(['incidentDate'])!.value
        ? dayjs(this.editForm.get(['incidentDate'])!.value, DATE_FORMAT)
        : undefined,
      closureDate: this.editForm.get(['closureDate'])!.value
        ? dayjs(this.editForm.get(['closureDate'])!.value, DATE_FORMAT)
        : undefined,
      intervention: this.editForm.get(['intervention'])!.value,
      disasterInterventionRequired: this.disasterInterventions,
      approvalStatus: this.editForm.get(['approvalStatus'])!.value,
      approvalComment: this.editForm.get(['approvalComment'])!.value,
      approvedBy: this.editForm.get(['approvedBy'])!.value,
      eligibleForApproval: this.editForm.get(['eligibleForApproval'])!.value,
      targetPopulation: this.editForm.get(['targetPopulation'])!.value,
      targetPopulationEstimate: this.editForm.get(['targetPopulationEstimate'])!.value,
      affectedPopulation: this.editForm.get(['affectedPopulation'])!.value,
      directEconomicLoss: this.editForm.get(['directEconomicLoss'])!.value,
      dipTank: this.editForm.get(['dipTank'])!.value,
      longitude: this.editForm.get(['longitude'])!.value,
    latitude: this.editForm.get(['latitude'])!.value,

    };
  }


}
