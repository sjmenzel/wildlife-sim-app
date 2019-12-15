import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts'

import { FormsModule } from "@angular/forms";

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
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/* Angular Forms */
import { ReactiveFormsModule } from '@angular/forms';


/* Components */
import { HomeComponent } from './pages/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { YourSpeciesComponent } from './components/your-species/your-species.component';
import { ImageComponent } from './components/image/image.component';
import { BrowseSpeciesComponent } from './pages/browse-species/browse-species.component';
import { DownloadSpeciesComponent } from './components/download-species/download-species.component';
import { CreateSpeciesComponent } from './components/create-species/create-species.component';
import { PortraitSelectComponent } from './components/portrait-select/portrait-select.component';
import { ConfirmPublishComponent } from './components/confirm-publish/confirm-publish.component';
import { EditSpeciesComponent } from './pages/edit-species/edit-species.component';
import { CreateSpeciesFormComponent } from './components/create-species-form/create-species-form.component';





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
    DownloadSpeciesComponent,
    CreateSpeciesComponent,
    PortraitSelectComponent,
    ConfirmPublishComponent,
    EditSpeciesComponent,
    CreateSpeciesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    MatStepperModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatProgressBarModule
  
  ],
  providers: [CookieService],
  entryComponents: [
    PortraitSelectComponent,
    CreateSpeciesComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
