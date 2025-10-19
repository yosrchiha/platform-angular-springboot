import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../services/students'; // ✅ correct

@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-student.html',
  styleUrls: ['./create-student.css']
})
export class CreateStudent { // ✅ il faut **exporter** la classe
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
