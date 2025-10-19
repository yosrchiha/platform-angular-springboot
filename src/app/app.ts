import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { StudentsList } from './students-list/students-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-aang-sb');

  constructor(private router: Router) {}

  goToStudents() {
    this.router.navigate(['/students']);
  }

  goToAddStudent() {
    this.router.navigate(['/create-student']);
  }
}
