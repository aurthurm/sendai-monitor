import { Component, OnInit } from '@angular/core';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';

import { Column } from '@antv/g2plot';

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private disasterService: DisasterService,
  ) {}

  ngOnInit(): void {
    this.disasterService.countDisasterByCategoryStats().subscribe(res => {
      this.plotDisasterByCategory(res.body)
    })

    this.disasterService.countDisasterByTypeStats().subscribe(res => {
      this.plotDisasterByType(res.body)
    })
  }

  plotDisasterByCategory(data: any): void {

    const columnPlot = new Column('disaster-by-category', {
      data,
      xField: 'group',
      yField: 'count',
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        group: {
          alias: 'Disaster category',
        },
        count: {
          alias: 'Total',
        },
      },
      minColumnWidth: 30,
      maxColumnWidth: 30,
    })
    columnPlot.render();
  }


  plotDisasterByType(data: any): void {


    const columnPlot = new Column('disaster-by-type', {
      data,
      xField: 'group',
      yField: 'count',
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        group: {
          alias: 'Disaster Type',
        },
        count: {
          alias: 'Total',
        },
      },
      minColumnWidth: 30,
      maxColumnWidth: 30,
    })

    columnPlot.render();
  }


}
