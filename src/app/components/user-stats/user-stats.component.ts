import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartOption } from 'echarts';
import * as Utility from '../../utility/utility'
import { ApiService } from '../../service/api.service';
import * as echarts from 'echarts';

import { UserChartsComponent } from '../../components/user-charts/user-charts.component';


@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  User = '';
  State:any;
  

  constructor(
    private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.State = 'all-runs'
    this.User = this.actRoute.snapshot.paramMap.get('user');

  }

  setState(state: String) {
    this.State = state;
  }

  get totalRuns() {
    return document.querySelector('#v-pills-total-miles-tab')
  }

  goBack() {
    this.ngZone.run(() => this.router.navigateByUrl(`user-details/${this.User}`))
  }

}
