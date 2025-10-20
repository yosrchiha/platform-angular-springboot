import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // ✅ importer RouterModule
import { StudentsService } from '../services/students';

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ ajouter RouterModule
  templateUrl: './create-student.html',
  styleUrls: ['./create-student.css']
})
export class CreateStudent {
  student: any = {};

  constructor(private studentService: StudentsService, private router: Router) {}

  onSubmit() {
    this.studentService.createStudent(this.student).subscribe({
      next: (res: any) => {
        alert('Étudiant ajouté avec succès !');
        this.router.navigate(['/students']);
      },
      error: (err: any) => {
        console.error('Erreur:', err);
        alert('Erreur côté serveur : ' + (err.error?.message || err.message));
      }
    });
  }

  cancel() {
    this.router.navigate(['/students']);
  }
}

