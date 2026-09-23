import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Course } from '../../interfaces/course';
import { CourseService } from '../../services/courses';

@Component({
  selector: 'app-courses',
  imports: [FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})

export class Courses {

  searchTerm = signal('');
  sortField = signal<keyof Course>('courseCode');
  selectedSubject = signal('');

  courses; loading; error;

  constructor(private courseService: CourseService) {

    this.courses = this.courseService.courses;
    this.loading = this.courseService.loading;
    this.error = this.courseService.error;

    this.courseService.loadCourses();
  }

  filteredCourses = computed(() => {

    const term = this.searchTerm().toLowerCase();
    const field = this.sortField();
    const subject = this.selectedSubject();

    return [...this.courses()]
      .filter(course => !subject || course.subject === subject)
      .filter(course =>
        course.courseCode.toLowerCase().includes(term) ||
        course.courseName.toLowerCase().includes(term)
      )
      .sort((a, b) => {

        const valueA = a[field];
        const valueB = b[field];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        }

        return String(valueA).localeCompare(String(valueB), 'sv');
      });
  });

  setSortField(field: keyof Course): void {
    this.sortField.set(field);
  }

  subjects = computed(() =>
    [...new Set(this.courses().map(course => course.subject))].sort((a, b) => a.localeCompare(b, 'sv'))
  );

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedSubject.set('');
  }

}