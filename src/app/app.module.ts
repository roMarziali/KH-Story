import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SettingsFiltersComponent } from './components/main-page/settings-filters/settings-filters.component';;
import { StoryComponent } from './components/main-page/story/story.component';
import { DownloadMenuComponent } from './components/header-page/download-menu/download-menu.component';
import { IconComponent } from './components/shared/icon/icon.component';
import { ChaptersMenuComponent } from './components/header-page/chapters-menu/chapters-menu.component';
import { ParagraphComponent } from './components/main-page/story/story-paragraph/paragraph.component';
import { IntroComponent } from './components/main-page/intro/intro.component';
import { MoveChapterComponent } from './components/main-page/story/move-chapter/move-chapter.component';
import { LoginComponent } from './components/login/login.component';
import { AddingTextComponent } from './components/main-page/story/adding-text/adding-text.component';
import { TextFormComponent } from './components/main-page/story/text-form/text-form.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    MainPageComponent,
    SettingsFiltersComponent,
    StoryComponent,
    DownloadMenuComponent,
    IconComponent,
    ChaptersMenuComponent,
    ParagraphComponent,
    IntroComponent,
    MoveChapterComponent,
    LoginComponent,
    AddingTextComponent,
    TextFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatMenuModule,
    MatSliderModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { hideRequiredMarker: 'true' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
