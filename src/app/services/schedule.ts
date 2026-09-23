import { Injectable, computed, signal } from '@angular/core';

import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private localStorageKey = 'ramschema';

  schedule = signal<Course[]>([]);

  totalPoints = computed(() =>
    this.schedule().reduce((sum, course) => sum + course.points, 0)
  );

  constructor() {
    this.load();
  }

  add(course: Course): void {

    if (this.schedule().some(c => c.courseCode === course.courseCode)) {
      return;
    }

    this.schedule.update(courses => [...courses, course]);
    this.save();
  }

  remove(courseCode: string): void {
    this.schedule.update(courses => courses.filter(c => c.courseCode !== courseCode));
    this.save();
  }

  private save(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.schedule()));
  }

  private load(): void {

    const stored = localStorage.getItem(this.localStorageKey);

    if (!stored) {
      return;
    }

    try {
      this.schedule.set(JSON.parse(stored));
    } catch {
      localStorage.removeItem(this.localStorageKey);
    }
  }
}