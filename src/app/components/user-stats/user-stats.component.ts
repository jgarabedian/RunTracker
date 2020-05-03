import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartOption } from 'echarts';
import * as Utility from '../../utility/utility'
import { ApiService } from '../../service/api.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})
export class UserStatsComponent implements OnInit {

  Runs:any = [];
  Dates:any = [];
  Miles:any = [];
  Chart:any;
  User = '';

  // Echarts config
  options: any;
  echartsInstance: any;
  @ViewChild('charts') chart: ElementRef;
  myEchart;
  

  constructor(
    private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.getOptions();
    this.User = this.actRoute.snapshot.paramMap.get('user');
    this.myEchart = echarts.init(document.querySelector('#charts'));
    this.getRuns();

  }

  goBack() {
    this.ngZone.run(() => this.router.navigateByUrl(`user-details/${this.User}`))
  }

  getRuns() {
    this.apiService.getRuns().subscribe((data) => {
      this.Runs = Utility.convertDates(Utility.sort(Utility.filterUser(data, 'user_id', this.User), 'date', false), 'date', 'abr');
      this.getData();
    })
  }



  getData() {
    for (let idx = 0; idx < this.Runs.length; idx++) {
      this.Dates.push(this.Runs[idx].date);
      this.Miles.push(this.Runs[idx].miles);
    }
    this.paint();
  }

  paint() {
    this.getOptions();
    this.myEchart.setOption(this.options)
  }

  onChartInit(e: any) {
    this.echartsInstance = e;
  }

  getOptions() {
    this.options = {
      legend: {
        data: ['Miles Run'],
        align: 'left'
      },
      xAxis: {
        data: this.Dates,
        silent: false,
        type: 'category'
      },
      yAxis: {
        type: 'value',
        name: 'Miles Run'
      },
      series: [
          {
            name: 'Distance',
            type: 'line',
            data: this.Miles,
            label: {
              normal: {
                show: true,
              position: 'top',
              }
            },
            legendHoverLink: true,
            tooltip: {
              position: 'top',
              formatter: '{b0}: {c0}<br />{b1}: {c1}',
              borderColor: 'black',
              borderWidth: 5
            },
            animationDelay: function(idx) {
              return idx * 10 + 100
            },
            color: ['#007bff']
        },
        
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    }
  }

}
