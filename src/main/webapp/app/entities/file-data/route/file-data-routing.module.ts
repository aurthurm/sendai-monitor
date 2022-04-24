import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const fileDataRoute: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(fileDataRoute)],
  exports: [RouterModule],
})
export class FileDataRoutingModule {}
