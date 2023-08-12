import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserContentManagerComponent } from './components/main-page/user-content-manager/user-content-manager.component';
import { ContentFiltersComponent } from './components/main-page/user-content-manager/content-filters/content-filters.component';
import { ContentSettingsComponent } from './components/main-page/user-content-manager/content-settings/content-settings.component';
import { ContentVisibilityComponent } from './components/main-page/user-content-manager/content-visibility/content-visibility.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    MainPageComponent,
    UserContentManagerComponent,
    ContentFiltersComponent,
    ContentSettingsComponent,
    ContentVisibilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
