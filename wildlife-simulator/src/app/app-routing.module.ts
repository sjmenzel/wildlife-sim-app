import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageEditComponent } from './components/test/image-edit/image-edit.component';
import { ChartComponent } from './components/test/chart/chart.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowseSpeciesComponent } from './pages/browse-species/browse-species.component';
import { CreateSpeciesFormComponent } from './components/create-species-form/create-species-form.component';
import { PortraitSelectComponent } from './components/portrait-select/portrait-select.component';
import { ConfirmPublishComponent } from './components/confirm-publish/confirm-publish.component';
import { EditSpeciesComponent } from './pages/edit-species/edit-species.component';


const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "image", component: ImageEditComponent},
  {path: "chart", component: ChartComponent},
  {path: "species", component: BrowseSpeciesComponent},
  {path: "create", component: CreateSpeciesFormComponent},
  {path: "portrait", component: PortraitSelectComponent},
  {path: "confirm", component: ConfirmPublishComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
