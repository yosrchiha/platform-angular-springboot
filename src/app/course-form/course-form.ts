import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Course, CourseService } from '../services/CourseService';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './course-form.html',
  styleUrls: ['./course-form.css']
})
export class CourseFormComponent implements OnInit {
  course: Course = {
    day: '',
    type: 'Tajwid',
    title: '',
    description: '',
    surah: ''
  };

  isEditMode = false;
  courseId: number | null = null;
  isLoading = false;
  errorMessage = '';

  days: string[] = ['Samedi', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
  types: string[] = ['Tajwid', 'Récitation', 'Mémorisation', 'Révision', 'Tafsir', 'Pratique'];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.courseId = params['id'];
        // ✅ Vérification null ici
        if (this.courseId !== null) {
          this.loadCourse(this.courseId);
        }
      }
    });
  }

  loadCourse(id: number) {
    this.courseService.getCourseById(id).subscribe({
      next: (data) => {
        this.course = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du cours', err);
        this.errorMessage = 'Impossible de charger le cours';
      }
    });
  }

  saveCourse() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isEditMode && this.courseId !== null) {  // ✅ Vérification null
      this.courseService.updateCourse(this.courseId, this.course).subscribe({
        next: () => {
          alert('Cours mis à jour avec succès !');
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          console.error('Erreur mise à jour:', err);
          this.errorMessage = 'Erreur lors de la mise à jour du cours';
          this.isLoading = false;
        }
      });
    } else {
      this.courseService.createCourse(this.course).subscribe({
        next: () => {
          alert('Cours créé avec succès !');
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          console.error('Erreur création:', err);
          this.errorMessage = 'Erreur lors de la création du cours';
          this.isLoading = false;
        }
      });
    }
  }

  validateForm(): boolean {
    if (!this.course.day) {
      this.errorMessage = 'Veuillez sélectionner un jour';
      return false;
    }
    if (!this.course.type) {
      this.errorMessage = 'Veuillez sélectionner un type';
      return false;
    }
    if (!this.course.title || this.course.title.trim() === '') {
      this.errorMessage = 'Le titre est obligatoire';
      return false;
    }
    if (!this.course.surah || this.course.surah.trim() === '') {
      this.errorMessage = 'La sourate est obligatoire';
      return false;
    }
    return true;
  }

  cancel() {
    this.router.navigate(['/courses']);
  }
}