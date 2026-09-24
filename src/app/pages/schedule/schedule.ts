import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Course } from '../../interfaces/course';
import { ScheduleService } from '../../services/schedule';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-schedule',
  imports: [RouterLink],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})

export class Schedule {

  schedule; totalPoints;

  constructor(private scheduleService: ScheduleService, private toastService: ToastService) {

    this.schedule = this.scheduleService.schedule;
    this.totalPoints = this.scheduleService.totalPoints;
  }

  removeFromSchedule(courseCode: string): void {
    this.scheduleService.remove(courseCode);
    this.toastService.show(`${courseCode} borttagen från schemat`);
  }

  clearSchedule(): void {
    if (!confirm('Vill du tömma hela schemat?')) {
      return;
    }

    this.scheduleService.clear();
    this.toastService.show('Schemat är tömt');
  }

}