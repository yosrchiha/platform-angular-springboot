import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // ← Router ajouté
import { Students } from '../students';
import { StudentsService } from '../services/students'; 

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './students-list.html',
  styleUrls: ['./students-list.css']
})
export class StudentsList implements OnInit {
  students_corran: Students[] = [];

  constructor(
    private studentsService: StudentsService,
    private router: Router // ← Injection du Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  goToStudents() {
    this.router.navigate(['/students']);
  }

  goToAddStudent() {
    this.router.navigate(['/create-student']);
  }

  loadStudents() {
    this.studentsService.getAllStudents().subscribe({
      next: (data) => (this.students_corran = data),
      error: (err) => console.error('Erreur lors du chargement des étudiants', err)
    });
  }
  goToCourses() {
    this.router.navigate(['/courses']);
  }

  deleteStudent(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      this.studentsService.deleteStudent(id).subscribe({
        next: () => {
          alert('Étudiant supprimé avec succès !');
          this.loadStudents();
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert('Erreur lors de la suppression !');
        }
      });
    }
  }
}

