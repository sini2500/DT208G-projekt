import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private url = '/ramschema.json';

  courses = signal<Course[]>([]);
  loading = signal<boolean>(false);

  constructor(private http: HttpClient) { }

  async loadCourses(): Promise<void> {

    this.loading.set(true);

    try {

      const courses = await this.http
        .get<Course[]>(this.url)
        .toPromise();

      this.courses.set(courses || []);

    } finally {

      this.loading.set(false);
    }
  }
}