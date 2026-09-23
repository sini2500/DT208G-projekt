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

  courses; loading;

  constructor(private courseService: CourseService) {

    this.courses = this.courseService.courses;
    this.loading = this.courseService.loading;

    this.courseService.loadCourses();
  }

  filteredCourses = computed(() => {

    const term = this.searchTerm().toLowerCase();
    const field = this.sortField();

    return [...this.courses()]
      .filter(course =>
        course.courseCode.toLowerCase().includes(term) ||
        course.courseName.toLowerCase().includes(term)
      )
      .sort((a, b) => {

        const valueA = a[field];
        const valueB = b[field];

        return String(valueA).localeCompare(String(valueB));
      });
  });

  setSortField(field: keyof Course): void {
    this.sortField.set(field);
  }
}