import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Course, CourseService } from '../services/CourseService';

@Component({
  selector: 'app-student-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-courses.html',
  styleUrls: ['./student-courses.css']
})
export class StudentCoursesComponent implements OnInit {
  
  // Liste de tous les cours
  courses: Course[] = [];
  
  // Liste filtrée des cours à afficher
  filteredCourses: Course[] = [];
  
  // Filtres sélectionnés
  selectedDay: string = '';
  selectedType: string = '';
  
  // Mode d'affichage (grille ou planning)
  viewByDay: boolean = false;

  // Options pour les filtres
  days: string[] = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  types: string[] = ['Tajwid', 'Récitation', 'Mémorisation', 'Révision', 'Tafsir', 'Pratique'];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  /**
   * Charge tous les cours depuis le service
   */
  loadCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = data;
        console.log('Cours chargés:', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des cours', err);
        alert('Impossible de charger les cours. Veuillez réessayer.');
      }
    });
  }

  /**
   * Filtre les cours selon les critères sélectionnés
   */
  filterCourses(): void {
    this.filteredCourses = this.courses.filter(course => {
      const matchDay = !this.selectedDay || course.day === this.selectedDay;
      const matchType = !this.selectedType || course.type === this.selectedType;
      return matchDay && matchType;
    });
  }

  /**
   * Retourne les cours d'un jour spécifique
   */
  getCoursesByDay(day: string): Course[] {
    return this.filteredCourses.filter(course => course.day === day);
  }

  /**
   * Retourne la classe CSS selon le type de cours
   */
  getTypeClass(type: string): string {
    const typeClasses: { [key: string]: string } = {
      'Tajwid': 'bg-primary text-white',
      'Récitation': 'bg-success text-white',
      'Mémorisation': 'bg-warning text-dark',
      'Révision': 'bg-info text-white',
      'Tafsir': 'bg-secondary text-white',
      'Pratique': 'bg-danger text-white'
    };
    return typeClasses[type] || 'bg-secondary text-white';
  }

  /**
   * Change entre la vue grille et la vue planning
   */
  toggleView(): void {
    this.viewByDay = !this.viewByDay;
  }

  /**
   * Retourne au tableau de bord
   */
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
