import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartOption } from 'echarts';
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

  // Echarts config
  options: any;
  echartsInstance: any;
  @ViewChild('charts') chart: ElementRef;
  myEchart;
  

  constructor(
    private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getOptions();
    let user = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.getRuns().subscribe((data) => {
      this.Runs = data;
      for (let idx = 0; idx < this.Runs.length; idx++) {
        this.Dates.push(this.Runs[idx].date);
        this.Miles.push(this.Runs[idx].miles);
      }
      this.myEchart = echarts.init(document.querySelector('#charts'));
      this.myEchart.setOption(this.options)
    })
    

    // this.onChartInit(this)

  }
  getRuns(user) {
    this.apiService.getRuns().subscribe((data) => {
      this.Runs = data;
      this.getData();
    })
  }

  getData() {
    for (let idx = 0; idx < this.Runs.length; idx++) {
      this.Dates.push(this.Runs[idx].date);
      this.Miles.push(this.Runs[idx].distance);
    }
    this.paint();
  }

  paint() {
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
        silent: false
      },
      yAxis: {
        type: 'value',
        name: 'Miles Run'
      },
      series: [
          {
            name: 'Distance',
            type: 'bar',
            data: this.Miles,
            label: {
              normal: {
                show: true,
              position: 'top',
              }
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
