import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {
  student: any;

  constructor(private router: Router,) {}

  ngOnInit() {
    const stored = localStorage.getItem('student');
    if (!stored) {
      this.router.navigate(['/login']);
    } else {
      this.student = JSON.parse(stored);
    }
  }
  // Ajoutez ces méthodes dans votre DashboardComponent

goToCourses() {
  this.router.navigate(['/student-courses']);  // ← Changez ici
}



logout() {
  if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
    localStorage.removeItem('currentStudent');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
goToMyAttendance() {
  this.router.navigate(['/my-attendance']); // slash initial = route absolue
}

  
}
