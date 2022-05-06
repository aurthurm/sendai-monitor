import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DisasterService } from '../service/disaster.service';
import { IDisasterApproval } from '../disaster.model';
import { InterventionService } from 'app/entities/intervention/service/intervention.service';


@Component({
  selector: 'jhi-disaster-approval',
  templateUrl: './disaster-approval.component.html',
})
export class DisasterApprovalComponent implements OnInit {
  @Input() disasterApprover = false;
  @Input() disabled = false;
  @Input() disaster: any;
  @Input() canDisaApprove = false;
  approvals: IDisasterApproval[] = [];
  comment = ""

  constructor(
    protected disasterService: DisasterService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected interventionService: InterventionService,
    protected router: Router
  ) { }

  ngOnInit(): void {
   console.log(this.disaster, "Disaster ID")  // eslint-disable-line no-console
   this.disasterService.approvalsForDisaster(this.disaster?.disasterId).subscribe(res => {
     if(res.body){
      this.approvals = res.body
     }
   })

   if(this.canDisaApprove){
     this.disabled = false;
   }
  }

  updateComment(event: any): void {
    this.comment = event.target.value;
    console.log(this.comment); // eslint-disable-line no-console
  }

  submitForApproval(): void {
    const approval = {
      disasterId: this.disaster?.disasterId,
      approval: "PENDING",
      comment: this.comment,
    };
    this.disasterService.saveApproval(approval).subscribe(res => {
      if (res.body){
        this.approvals.push(res.body)
      }
      location.reload()
    })
  }

  approveData(): void {
    const approval = {
      disasterId: this.disaster?.disasterId,
      approval: "APPROVED",
      comment: this.comment,
    };
    this.disasterService.saveApproval(approval).subscribe(res => {
      if (res.body){
        this.approvals.push(res.body)
      }
      location.reload()
    })
  }
  
  requestChanges(): void {
    const approval = {
      disasterId: this.disaster?.disasterId,
      approval: "REQUESTCHANGES",
      comment: this.comment,
    };
    this.disasterService.saveApproval(approval).subscribe(res => {
      if (res.body){
        this.approvals.push(res.body)
      }
      location.reload()
    })
  }


}
