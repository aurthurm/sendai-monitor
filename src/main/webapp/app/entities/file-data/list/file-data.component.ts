import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FileDataService } from '../service/file-data.service';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-file-data-list',
  templateUrl: './file-data.component.html',
})
export class FileDataComponent implements OnInit {
  @Input() disasterId = "";
  files: any[] = [];
  isLoading = false;

  constructor(
    protected fileDataService: FileDataService,
    protected activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    protected router: Router,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchFiles()
  }

  fetchFiles():void {
    this.isLoading = true;
    this.fileDataService.query({ disasterId: this.disasterId }).subscribe(res => {
      if(res.body){
        this.files = res.body;
      }
    })
    this.isLoading = false;
  }

  sanitizeImage(data: string): any {
    const objectURL = 'data:image/png;base64,' + data;
    return this.sanitizer.bypassSecurityTrustUrl(objectURL); 
  }

}
