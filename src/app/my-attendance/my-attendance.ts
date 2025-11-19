import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AttendanceService, Attendance } from '../services/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-attendance',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './my-attendance.html',
})
export class MyAttendanceComponent implements OnInit {
  attendances: Attendance[] = [];
  absencesByMonth: { [month: string]: number } = {};
  student: any;

  constructor(private attendanceService: AttendanceService, private router: Router) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('student');
    if (stored) {
      this.student = JSON.parse(stored);
      this.loadAttendance();
    } else {
      console.error('Étudiant non connecté');
    }
  }

  loadAttendance() {
    if (!this.student || !this.student.id) {
      console.error('ID étudiant non disponible');
      return;
    }

    this.attendanceService.getMyAttendances(this.student.id).subscribe(
      (data) => {
        this.attendances = data;
        this.absencesByMonth = {};
        this.attendances.forEach(a => {
          if (a.status === 'ABSENT') {
            const month = new Date(a.date).getMonth() + 1;
            if (!this.absencesByMonth[month]) this.absencesByMonth[month] = 0;
            this.absencesByMonth[month]++;
          }
        });
      },
      (error) => console.error('Erreur lors de la récupération des présences', error)
    );
  }

  get months(): string[] {
    return Object.keys(this.absencesByMonth);
  }

  monthName(monthNumber: string): string {
    const names = [
      'Janvier','Février','Mars','Avril','Mai','Juin',
      'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
    ];
    return names[parseInt(monthNumber, 10) - 1] || monthNumber;
  }

  goHome() {
    this.router.navigate(['/dashboard']); // Assurez-vous que la route '/' existe
  }
}
