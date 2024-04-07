import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { BibliographyComponent } from './components/bibliography/bibliography.component';

const routes: Routes = [
  { path: "chapitre/:order", component: MainPageComponent },
  { path: '', redirectTo: '/chapitre/1', pathMatch: 'full'},
  { path: "bibliographie", component: BibliographyComponent },
  { path: '**', redirectTo: '/chapitre/1' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

