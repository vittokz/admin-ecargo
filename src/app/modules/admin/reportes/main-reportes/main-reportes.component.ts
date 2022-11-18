import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-main-reportes',
  templateUrl: './main-reportes.component.html',
  styleUrls: ['./main-reportes.component.scss']
})
export class MainReportesComponent implements OnInit {
  chartConversions: ApexOptions;
  constructor() { }

  ngOnInit(): void {
    this._prepareChartData();
  }
  private _prepareChartData(): void {
       // Conversions
    //    this.chartConversions = {
    //     chart  : {
    //         animations: {
    //             enabled: false
    //         },
    //         fontFamily: 'inherit',
    //         foreColor : 'inherit',
    //         height    : '100%',
    //         type      : 'area',
    //         sparkline : {
    //             enabled: true
    //         }
    //     },
    //     colors : ['#38BDF8'],
    //     fill   : {
    //         colors : ['#38BDF8'],
    //         opacity: 0.5
    //     },
    //     series : this.data.conversions.series,
    //     stroke : {
    //         curve: 'smooth'
    //     },
    //     tooltip: {
    //         followCursor: true,
    //         theme       : 'dark'
    //     },
    //     xaxis  : {
    //         type      : 'category',
    //         categories: this.data.conversions.labels
    //     },
    //     yaxis  : {
    //         labels: {
    //             formatter: (val): string => val.toString()
    //         }
    //     }
    // };
  }

}
