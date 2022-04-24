import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const humanPopulationRoute: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(humanPopulationRoute)],
  exports: [RouterModule],
})
export class HumanPopulationRoutingModule {}
