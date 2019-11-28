import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageEditComponent } from './components/test/image-edit/image-edit.component';
import { ChartComponent } from './components/test/chart/chart.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowseSpeciesComponent } from './pages/browse-species/browse-species.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "image", component: ImageEditComponent},
  {path: "chart", component: ChartComponent},
  {path: "species", component: BrowseSpeciesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
