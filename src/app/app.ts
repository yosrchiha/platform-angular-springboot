import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { StudentsList } from './students-list/students-list';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('app-aang-sb');

  constructor(private router: Router) {}
}
