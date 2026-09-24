import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CourseService } from '../../services/courses';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  courses;

  constructor(private courseService: CourseService) {

    this.courses = this.courseService.courses;

    this.courseService.loadCourses();
  }

  totalCourses = computed(() => this.courses().length);

  subjects = computed(() =>
    [...new Set(this.courses().map(course => course.subject))].sort((a, b) => a.localeCompare(b, 'sv'))
  );

  topSubjects = computed(() => {

    const counts = new Map<string, number>();

    for (const course of this.courses()) {
      counts.set(course.subject, (counts.get(course.subject) ?? 0) + 1);
    }

    const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
    const largest = ranked[0][1];

    return ranked.map(([subject, count]) => ({
      subject,
      count,
      percent: Math.round((count / largest) * 100)
    }));
  });

}