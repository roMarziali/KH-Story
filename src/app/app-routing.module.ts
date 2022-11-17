import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StoryComponent } from './story/story.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: '', component: StoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
