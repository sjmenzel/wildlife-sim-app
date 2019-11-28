import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts'

import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageEditComponent } from './components/test/image-edit/image-edit.component';
import { ChartComponent } from './components/test/chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

/* Angular Material */

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

/* Components */

import { HomeComponent } from './pages/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { YourSpeciesComponent } from './components/your-species/your-species.component';
import { ImageComponent } from './components/image/image.component';
import { BrowseSpeciesComponent } from './pages/browse-species/browse-species.component';
import { DownloadSpeciesComponent } from './components/download-species/download-species.component';



@NgModule({
  declarations: [
    AppComponent,
    ImageEditComponent,
    ChartComponent,
    HomeComponent,
    ToolbarComponent,
    YourSpeciesComponent,
    ImageComponent,
    BrowseSpeciesComponent,
    DownloadSpeciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
