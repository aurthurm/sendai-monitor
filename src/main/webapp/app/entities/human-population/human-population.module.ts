import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HumanPopulationUpdateComponent } from './update/human-population-update.component';
import { HumanPopulationRoutingModule } from './route/human-population-routing.module';

@NgModule({
  imports: [SharedModule, HumanPopulationRoutingModule],
  declarations: [HumanPopulationUpdateComponent],
  entryComponents: [],
  exports: [ HumanPopulationUpdateComponent] 
})
export class HumanPopulationModule {}

export { HumanPopulationUpdateComponent }