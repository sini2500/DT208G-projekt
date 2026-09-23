import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Course } from '../../interfaces/course';
import { ScheduleService } from '../../services/schedule';

@Component({
  selector: 'app-schedule',
  imports: [RouterLink],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})

export class Schedule {

  schedule; totalPoints;

  constructor(private scheduleService: ScheduleService) {

    this.schedule = this.scheduleService.schedule;
    this.totalPoints = this.scheduleService.totalPoints;
  }

  removeFromSchedule(courseCode: string): void {
    this.scheduleService.remove(courseCode);
  }
}