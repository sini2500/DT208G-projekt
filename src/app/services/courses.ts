import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url = '/miun_courses.json';

  courses = signal<Course[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  async loadCourses(): Promise<void> {

    this.loading.set(true);
    this.error.set(null);

    try {

      const courses = await firstValueFrom(this.http.get<Course[]>(this.url));

      this.courses.set(courses || []);

    } catch {

      this.error.set("Kunde inte ladda kurser från fil.");

    }
    
    finally {

      this.loading.set(false);
    }
  }
}