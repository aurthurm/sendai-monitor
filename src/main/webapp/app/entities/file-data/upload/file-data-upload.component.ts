import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IFileData, FileData } from '../file-data.model';
import { FileDataService } from '../service/file-data.service';

@Component({
  selector: 'jhi-file-data-upload',
  templateUrl: './file-data-upload.component.html',
})
export class FileDataUploadComponent implements OnInit {
  @Input() disasterId = "";
  isSaving = false;
  myFiles: File[] = [];

  uploadForm = this.fb.group({
    name: [],
    file: [],
  });

  constructor(protected fileDataService: FileDataService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fileData }) => {
      if(fileData?.file)
      {
        this.updateForm(fileData);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    // const fileData = this.createFromForm();
    const formData = new FormData();

    for (const file of this.myFiles) { 
      formData.append("file", file);
    }  
    this.subscribeToSaveResponse(this.fileDataService.upload(formData, this.disasterId))
  }

  onFileChange(event:any): void {
    this.myFiles = [];
      for (let i = 0; i < event.target.files.length; i++) { 
          this.myFiles.push(event.target.files[i]);
      }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFileData>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.uploadForm.patchValue({
      name: "",
      file: null,
    });
    this.myFiles = [];
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(fileData: IFileData): void {
    this.uploadForm.patchValue({
      name: "" ,
      file: fileData.file,
    });
  }

  protected createFromForm(): IFileData {
    return {
      ...new FileData(),
      name: this.uploadForm.get(['name'])!.value,
      file: this.uploadForm.get(['file'])!.value,
    };
  }





}
