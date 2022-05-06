import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICasualty } from '../casualty.model';
import { CasualtyService } from '../service/casualty.service';

@Component({
  selector: 'jhi-casualty-upload',
  templateUrl: './casualty-upload.component.html',
})
export class CasualtyUploadComponent implements OnInit {
  disasterId = ""
  selectedFiles!: FileList | undefined;
  selectedFile!: null;
  casualties: ICasualty[] = [];
  loading = false

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected casualtyService: CasualtyService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ disasterId }) => {
      this.disasterId = disasterId;
    });
  }

  previousState(): void {
    window.history.back();
  }

  upload(): void {
    this.loading = true;
    const uploadFile = this.selectedFiles!.item(0);
    this.casualtyService.uploadFile(uploadFile!, this.disasterId).subscribe(res => {
      this.casualties = res.body?? [];
      this.loading = false;
    });
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    this.selectedFile = event.target.files[0];
  }

  trackCasualtyId(index: number, item: ICasualty): string {
    return item.casualtyId!;
  }

}
