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

  constructor(private router: Router) {}

  ngOnInit() {
    const stored = localStorage.getItem('student');
    if (!stored) {
      this.router.navigate(['/login']);
    } else {
      this.student = JSON.parse(stored);
    }
  }

  logout() {
    localStorage.removeItem('student');
    this.router.navigate(['/login']);
  }
}
