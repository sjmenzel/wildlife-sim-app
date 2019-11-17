import { Component, OnInit } from '@angular/core';

import speciesJson from 'src/assets/data.json';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  sliderMax = 50
  chartCap = 10

  public barChartOptions = {
    responsive: true,
    // animation: {
    //   duration: 1000
    // },
    hover: {
      animationDuration: 250
    },
    // responseiveAnimationDuration: 0,
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Hello'
        },
        ticks: {
          beginAtZero: false,
          min: 0,
          max: speciesJson[0]['pop'].length,
          stepsize: 1
        }
      }]
    }
  }

  public barChartLabels = []
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [

  ];

  constructor() { }

  ngOnInit() {
    for (let i = 1; i < speciesJson.length; i++){
      this.barChartData.push({ data: speciesJson[i]['pop'], label: speciesJson[i]['name'], fill: false })
    }

    for (let i = 1; i < this.chartCap; i++) {
      this.barChartLabels.push(i)
    }
    this.sliderMax = speciesJson[0]['pop'].length
  }

  adjust() {
    if (this.chartCap > this.barChartLabels.length) {
      for(let i = this.barChartLabels.length; i < this.chartCap; i++)
        this.barChartLabels.push(i)
    }
    else if(this.chartCap < this.barChartLabels.length){
      this.barChartLabels = []
      for(let i = 0; i < this.chartCap; i++)
        this.barChartLabels.push(i + 1)
      console.log(speciesJson[0]['pop'].length)
    }

  }
}
