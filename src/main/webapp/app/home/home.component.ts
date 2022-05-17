import { Component, OnInit, OnDestroy, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'app/login/login.service';
import { DisasterService } from 'app/entities/disaster/service/disaster.service';
import Highcharts from "highcharts/highmaps";
import worldMap from "@highcharts/map-collection/countries/zw/zw-all.geo.json";
import proj4 from "proj4";


@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "mapChart";
  chartData = [];

  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap,
      proj4
    },
    title: {
      text: "Zimbabwe"
    },
    subtitle: {
      text:
        'Distribution of disasters'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
        type: "map",
        name: "Disaster data",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: false,
        data: [
          ['zw-ma', 0], ['zw-ms', 0], ['zw-bu', 12], ['zw-mv', 13],
          ['zw-mw', 14], ['zw-mc', 15], ['zw-ha', 16], ['zw-mn', 17],
          ['zw-mi', 18], ['zw-me', 19]
        ]
        
      } as Highcharts.SeriesMapOptions,
      {
        // Specify points using lat/lon
        type: "mappoint",
        name: "Zimbabwe cities",
        marker: {
          radius: 7,
          fillColor: "tomato"
        },
        data: [
          {
            lat: -17.824858,
            lon: 31.053028
          },
          {
            lat: -20.153625,
            lon: 28.568127
          },
          {
            lat: -20.899999,
            lon: 28.800000000000068
          } 
        ]
      }
    ]
  };
  account: Account | null = null;
  @ViewChild('username', { static: false })
  username!: ElementRef;
  simpleStats: any = {};
  authenticationError = false;

  loginForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    rememberMe: [false],
  });

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private loginService: LoginService,
    private disasterService: DisasterService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));
  
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });

    this.disasterService.countSimpleStats().subscribe(res => {
      this.simpleStats = res.body;
    })
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login(): void {
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      })
      .subscribe({
        next: () => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            // There were no routing during login (eg from navigationToStoredUrl)
            this.router.navigate(['']);
          }
        },
        error: () => (this.authenticationError = true),
      });
  }

}
