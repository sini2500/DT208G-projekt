import { Routes } from '@angular/router';
import { Courses } from './pages/courses/courses';
import { Schedule } from './pages/schedule/schedule';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    { path: '', component: Courses },
    { path: "kurser", component: Courses },
    { path: "schema", component: Schedule },
    { path: "om", component: About },
    { path: '404', component: NotFound },
    { path: '**', redirectTo: "404", pathMatch: "full"}
];