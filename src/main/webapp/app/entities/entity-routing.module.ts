import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'entities-admin',
        loadChildren: () => import('./entities-admin/entities-admin.module').then(m => m.EntitiesAdminModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'report',
        data: { pageTitle: 'sendaiMonitorApp.report.home.title' },
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
      },
      {
        path: 'custom-report',
        data: { pageTitle: 'sendaiMonitorApp.report.home.title' },
        loadChildren: () => import('./custom-report/custom-report.module').then(m => m.CustomReportModule),
      },
      {
        path: 'project',
        data: { pageTitle: 'sendaiMonitorApp.project.home.title' },
        loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
      },
      {
        path: 'project-disaster',
        data: { pageTitle: 'sendaiMonitorApp.projectDisaster.home.title' },
        loadChildren: () => import('./project-disaster/project-disaster.module').then(m => m.ProjectDisasterModule),
      },
      {
        path: 'development-partner',
        data: { pageTitle: 'sendaiMonitorApp.developmentPartner.home.title' },
        loadChildren: () => import('./development-partner/development-partner.module').then(m => m.DevelopmentPartnerModule),
      },
      {
        path: 'partner-intervention',
        data: { pageTitle: 'sendaiMonitorApp.partnerIntervention.home.title' },
        loadChildren: () => import('./partner-intervention/partner-intervention.module').then(m => m.PartnerInterventionModule),
      },
      {
        path: 'disaster-category',
        data: { pageTitle: 'sendaiMonitorApp.disasterCategory.home.title' },
        loadChildren: () => import('./disaster-category/disaster-category.module').then(m => m.DisasterCategoryModule),
      },
      {
        path: 'disaster-type',
        data: { pageTitle: 'sendaiMonitorApp.disasterType.home.title' },
        loadChildren: () => import('./disaster-type/disaster-type.module').then(m => m.DisasterTypeModule),
      },
      {
        path: 'department',
        data: { pageTitle: 'sendaiMonitorApp.department.home.title' },
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
      },
      {
        path: 'disaster',
        data: { pageTitle: 'sendaiMonitorApp.disaster.home.title' },
        loadChildren: () => import('./disaster/disaster.module').then(m => m.DisasterModule),
      },
      {
        path: 'beneficiary',
        data: { pageTitle: 'sendaiMonitorApp.beneficiary.home.title' },
        loadChildren: () => import('./beneficiary/beneficiary.module').then(m => m.BeneficiaryModule),
      },
      {
        path: 'casualty',
        data: { pageTitle: 'sendaiMonitorApp.casualty.home.title' },
        loadChildren: () => import('./casualty/casualty.module').then(m => m.CasualtyModule),
      },
      {
        path: 'address',
        data: { pageTitle: 'sendaiMonitorApp.address.home.title' },
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: 'hazard',
        data: { pageTitle: 'sendaiMonitorApp.hazard.home.title' },
        loadChildren: () => import('./hazard/hazard.module').then(m => m.HazardModule),
      },
      {
        path: 'donation',
        data: { pageTitle: 'sendaiMonitorApp.donation.home.title' },
        loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule),
      },
      {
        path: 'response-team',
        data: { pageTitle: 'sendaiMonitorApp.responseTeam.home.title' },
        loadChildren: () => import('./response-team/response-team.module').then(m => m.ResponseTeamModule),
      },
      {
        path: 'infrastructure-type',
        data: { pageTitle: 'sendaiMonitorApp.infrastructureType.home.title' },
        loadChildren: () => import('./infrastructure-type/infrastructure-type.module').then(m => m.InfrastructureTypeModule),
      },
      {
        path: 'infrastructure',
        data: { pageTitle: 'sendaiMonitorApp.infrastructure.home.title' },
        loadChildren: () => import('./infrastructure/infrastructure.module').then(m => m.InfrastructureModule),
      },
      {
        path: 'crop-type',
        data: { pageTitle: 'sendaiMonitorApp.cropType.home.title' },
        loadChildren: () => import('./crop-type/crop-type.module').then(m => m.CropTypeModule),
      },
      {
        path: 'crop',
        data: { pageTitle: 'sendaiMonitorApp.crop.home.title' },
        loadChildren: () => import('./crop/crop.module').then(m => m.CropModule),
      },
      {
        path: 'live-stock-type',
        data: { pageTitle: 'sendaiMonitorApp.liveStockType.home.title' },
        loadChildren: () => import('./live-stock-type/live-stock-type.module').then(m => m.LiveStockTypeModule),
      },
      {
        path: 'live-stock',
        data: { pageTitle: 'sendaiMonitorApp.liveStock.home.title' },
        loadChildren: () => import('./live-stock/live-stock.module').then(m => m.LiveStockModule),
      },
      {
        path: 'file-data',
        data: { pageTitle: 'sendaiMonitorApp.fileData.home.title' },
        loadChildren: () => import('./file-data/file-data.module').then(m => m.FileDataModule),
      },
      {
        path: 'country',
        data: { pageTitle: 'sendaiMonitorApp.country.home.title' },
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
      },
      {
        path: 'province',
        data: { pageTitle: 'sendaiMonitorApp.province.home.title' },
        loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule),
      },
      {
        path: 'district',
        data: { pageTitle: 'sendaiMonitorApp.district.home.title' },
        loadChildren: () => import('./district/district.module').then(m => m.DistrictModule),
      },
      {
        path: 'ward',
        data: { pageTitle: 'sendaiMonitorApp.ward.home.title' },
        loadChildren: () => import('./ward/ward.module').then(m => m.WardModule),
      },
      {
        path: 'village',
        data: { pageTitle: 'sendaiMonitorApp.village.home.title' },
        loadChildren: () => import('./village/village.module').then(m => m.VillageModule),
      },
      {
        path: 'household',
        data: { pageTitle: 'sendaiMonitorApp.household.home.title' },
        loadChildren: () => import('./household/household.module').then(m => m.HouseholdModule),
      },
      {
        path: 'household-type',
        data: { pageTitle: 'sendaiMonitorApp.householdType.home.title' },
        loadChildren: () => import('./household-type/household-type.module').then(m => m.HouseholdTypeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
