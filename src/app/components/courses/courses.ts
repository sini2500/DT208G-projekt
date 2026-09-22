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

export class CourseComponent {

  searchTerm = signal('');
  sortField = signal<keyof Course>('code');

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
        course.code.toLowerCase().includes(term) ||
        course.coursename.toLowerCase().includes(term)
      )
      .sort((a, b) => {

        const valueA = a[field].toLowerCase();
        const valueB = b[field].toLowerCase();

        return valueA.localeCompare(valueB);
      });
  });

  setSortField(field: keyof Course): void {
    this.sortField.set(field);
  }
}