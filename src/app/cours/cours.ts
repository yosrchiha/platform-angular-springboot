import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Course, CourseService } from '../services/CourseService';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cours.html',
  styleUrls: ['./cours.css']
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  selectedDay: string = '';
  days: string[] = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data;
      },
      error: (err) => console.error('Erreur lors du chargement des cours', err)
    });
  }

  filterByDay(day: string) {
    this.selectedDay = day;
    if (day === '') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter(c => c.day === day);
    }
  }

  goToStudents() {
    this.router.navigate(['/students']);
  }

  goToAddStudent() {
    this.router.navigate(['/create-student']);
  }

  goToAddCourse() {
    this.router.navigate(['/create-course']);
  }

  editCourse(id: number | undefined) {
    if (id) {
      this.router.navigate(['/edit-course', id]);
    }
  }

  deleteCourse(id: number | undefined) {
    if (!id) return;

    if (confirm('Voulez-vous vraiment supprimer ce cours ?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          alert('Cours supprimé avec succès !');
          this.loadCourses();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert('Erreur lors de la suppression !');
        }
      });
    }
  }

  getTypeColor(type: string): string {
    const colors: { [key: string]: string } = {
      'Tajwid': 'badge bg-info',
      'Récitation': 'badge bg-success',
      'Mémorisation': 'badge bg-purple',
      'Révision': 'badge bg-warning',
      'Tafsir': 'badge bg-primary',
      'Pratique': 'badge bg-danger'
    };
    return colors[type] || 'badge bg-secondary';
  }
}