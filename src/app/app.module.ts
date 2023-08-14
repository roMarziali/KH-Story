import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContentFiltersComponent } from './components/main-page/user-content-manager/content-filters/content-filters.component';;
import { ContentVisibilityComponent } from './components/main-page/user-content-manager/content-visibility/content-visibility.component';
import { TranslateSettingsPipe } from './pipes/translate-settings.pipe';
import { TranslatedVisibilityPipe } from './pipes/translated-visibility.pipe';
import { StoryComponent } from './components/main-page/story/story.component';
import { SegmentComponent } from './components/main-page/story/segment/segment.component';
import { DownloadMenuComponent } from './components/main-page/download-menu/download-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    MainPageComponent,
    ContentFiltersComponent,
    ContentVisibilityComponent,
    TranslateSettingsPipe,
    TranslatedVisibilityPipe,
    StoryComponent,
    SegmentComponent,
    DownloadMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
