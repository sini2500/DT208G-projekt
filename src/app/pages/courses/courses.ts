import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Course } from '../../interfaces/course';
import { CourseService } from '../../services/courses';
import { ScheduleService } from '../../services/schedule';
import { ToastService } from '../../services/toast';

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
  currentPage = signal(1);
  pageSize = signal(20);

  courses; loading; error;

  constructor(private courseService: CourseService, private scheduleService: ScheduleService, private toastService: ToastService) {

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

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
    this.currentPage.set(1);
  }

  setSubject(subject: string): void {
    this.selectedSubject.set(subject);
    this.currentPage.set(1);
  }

  setPageSize(size: string): void {
    this.pageSize.set(Number(size));
    this.currentPage.set(1);
  }

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredCourses().length / this.pageSize()))
  );

  pageCourses = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredCourses().slice(start, start + this.pageSize());
  });

  pageRange = computed(() => {

    const total = this.filteredCourses().length;

    if (total === 0) {
      return { first: 0, last: 0, total: 0 };
    }

    const first = (this.currentPage() - 1) * this.pageSize() + 1;
    const last = Math.min(this.currentPage() * this.pageSize(), total);

    return { first, last, total };
  });

  previousPage(): void {
    this.currentPage.update(page => Math.max(1, page - 1));
  }

  nextPage(): void {
    this.currentPage.update(page => Math.min(this.totalPages(), page + 1));
  }

  subjects = computed(() =>
    [...new Set(this.courses().map(course => course.subject))].sort((a, b) => a.localeCompare(b, 'sv'))
  );

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedSubject.set('');
    this.currentPage.set(1);
  }

  addToSchedule(course: Course): void {

    const alreadyAdded = this.scheduleService.schedule().some(c => c.courseCode === course.courseCode);

    this.scheduleService.add(course);

    this.toastService.show(alreadyAdded ? `${course.courseCode} finns redan i schemat` : `${course.courseCode} tillagd i schemat`);

  }

  scheduledCodes = computed(() =>
    new Set(this.scheduleService.schedule().map(course => course.courseCode))
  );

  isScheduled(courseCode: string): boolean {
    return this.scheduledCodes().has(courseCode);
  }

}