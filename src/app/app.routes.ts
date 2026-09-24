import { Routes } from '@angular/router';
import { Courses } from './pages/courses/courses';
import { Schedule } from './pages/schedule/schedule';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { Home } from './pages/home/home';

export const routes: Routes = [
    { path: "", component: Home },
    { path: "kurser", component: Courses },
    { path: "schema", component: Schedule },
    { path: "om", component: About },
    { path: "404", component: NotFound },
    { path: "**", redirectTo: "404", pathMatch: "full"}
];