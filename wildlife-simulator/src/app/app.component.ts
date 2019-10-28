
/*app.component.ts*/
import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../assets/canvasjs.min';
//var CanvasJS = require('./canvasjs.min');

import speciesJson from '../assets/data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  ngOnInit() {
    console.log(speciesJson)

    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Performance Demo - 10000 DataPoints"
      },
      subtitles: [{
        text: "Try Zooming and Panning"
      }],
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: true
      },
      data: [
        {
          name: 'SpeciesA',
          showInLegend: true,
          type: "line",
          dataPoints: speciesJson[0]
        },
        {
          name: 'SpeciesB',
          showInLegend: true,
          type: "line",
          dataPoints: speciesJson[1]
        },
        {
          name: 'SpeciesC',
          showInLegend: true,
          type: "line",
          dataPoints: speciesJson[2]
        },
        {
          name: 'SpeciesD',
          showInLegend: true,
          type: "line",
          dataPoints: speciesJson[3]
        },
        {
          name: 'SpeciesE',
          showInLegend: true,
          type: "line",
          dataPoints: speciesJson[4]
        },
        {
          name: 'SpeciesF',
          showInLegend: true,
          type: "line",
          dataPoints: speciesJson[5]
        }
      ]
    });

    chart.render();
  }
}