import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { StoryComponent } from './story/story.component';
import { HeaderComponent } from './header/header.component';
import { StoryParamsComponent } from './story-params/story-params.component';
import { StoryContentComponent } from './story-content/story-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StoryComponent,
    HeaderComponent,
    StoryParamsComponent,
    StoryContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
