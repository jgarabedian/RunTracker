import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Utility from '../../utility/utility';
import * as echarts from 'echarts';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user-charts',
  templateUrl: './user-charts.component.html',
  styleUrls: ['./user-charts.component.css']
})
export class UserChartsComponent implements OnChanges {

  @Input() chartType: String;
  ChartType: any;
  Data:any = [];

  Dates:any = [];
  Miles:any = [];
  TotalMiles:any = [];
  User = '';

  // Echarts config
  options: any;
  echartsInstance: any;
  @ViewChild('charts') chart: ElementRef;
  myEchart;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.User = this.actRoute.snapshot.paramMap.get('user');
    this.myEchart = echarts.init(document.querySelector('#charts'));
    this.render();
  }


  onChartInit(e: any) {
    this.echartsInstance = e;
  }

  render() {
    console.warn('Changing')
    this.apiService.getRuns().subscribe((data) => {
      this.Data = Utility.convertDates(Utility.sort(Utility.filterUser(data, 'user_id', this.User), 'date', false), 'date', 'abr');
      if (this.chartType === 'all-runs') {
        this.allRuns();
      } else if (this.chartType === 'total-miles') {
        this.runsOverTime()
      }
    })
  }

  runsOverTime() {
    this.Dates = [];
    for (let idx = 0; idx < this.Data.length; idx++) {
      this.Dates.push(this.Data[idx].date);
    }
    let data = this.getCumSum();
    this.getOptions(this.TotalMiles, 'Total Miles');
    this.myEchart.setOption(this.options)
   }

  allRuns() {
    this.Dates = [];
    for (let idx = 0; idx < this.Data.length; idx++) {
      this.Dates.push(this.Data[idx].date);
      this.Miles.push(this.Data[idx].miles);
    }
    this.getOptions(this.Miles, 'Miles Run');
    this.myEchart.setOption(this.options)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.render();
  }

  getCumSum() {
    let data = this.Data;
    let sum = 0;
    this.TotalMiles = [];
    for (let i = 0; i < data.length; i++) {
      this.TotalMiles.push(Math.round(data[i]['miles'] + sum));
      sum = sum + data[i]['miles']
    }
    return data;
  }

  getOptions(data, label) {
    this.options = {
      legend: {
        data: [label],
        align: 'left'
      },
      xAxis: {
        data: this.Dates,
        silent: false,
        type: 'category'
      },
      yAxis: {
        type: 'value',
        name: label
      },
      tooltip: { },
      series: [
          {
            name: label,
            type: 'line',
            data: data,
            label: {
              normal: {
                show: true,
              position: 'top',
              }
            },
            legendHoverLink: true,
            tooltip: {
              position: 'bottom',
              formatter: '{b0}<br>{c0} Miles',
              borderColor: '#007BFF',
              borderWidth: 1,
              backgroundColor: '#F2F2F2',
              textStyle: {
                color: '#007BFF'
              }
              
            },
            animationDelay: function(idx) {
              return idx * 10 + 100
            },
            color: ['#007BFF']
        },
        
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    }
  }

}
