import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ← Ajouté
import { Students } from '../students';
import { StudentsService } from '../services/students'; 

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // ← Ajouté RouterModule
  templateUrl: './students-list.html',
  styleUrls: ['./students-list.css'] // ← correction
})
export class StudentsList implements OnInit {
  students_corran: Students[] = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentsService.getAllStudents().subscribe({
      next: (data) => (this.students_corran = data),
      error: (err) => console.error('Erreur lors du chargement des étudiants', err)
    });
  }

  deleteStudent(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet étudiant ?')) {
      this.studentsService.deleteStudent(id).subscribe({
        next: () => {
          alert('Étudiant supprimé avec succès !');
          this.loadStudents(); // Recharge la liste après suppression
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert('Erreur lors de la suppression !');
        }
      });
    }
  }
}
