import { Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { WorksComponent } from './components/works/works.component';
import { BlogComponent } from './components/blog/blog.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'works/:id', component: WorksComponent },
  { path: 'blog/:id', component: BlogComponent },
  { path: '**', redirectTo: '' },
];
