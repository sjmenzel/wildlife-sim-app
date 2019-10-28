import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageEditComponent } from './components/test/image-edit/image-edit.component';
import { ChartComponent } from './components/test/chart/chart.component';


const routes: Routes = [
  {path: "image", component: ImageEditComponent},
  {path: "chart", component: ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
