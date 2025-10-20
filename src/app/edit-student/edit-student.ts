// src/app/edit-student/edit-student.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-student.html',
  styleUrls: ['./edit-student.css']
})
export class EditStudent implements OnInit {
  student: any = {};  // nécessaire pour ngModel
  id!: number;

  constructor(
    private studentService: StudentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // récupération de l'id depuis l'URL
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = Number(paramId);
      this.getStudentById();
    } else {
      console.error('ID étudiant manquant dans l’URL');
      this.router.navigate(['/students']);
    }
  }

  getStudentById(): void {
    this.studentService.getStudentById(this.id).subscribe({
      next: (res: any) => (this.student = res),
      error: (err: any) => console.error('Erreur récupération étudiant', err)
    });
  }

  onSubmit(): void {
    this.studentService.updateStudent(this.id, this.student).subscribe({
      next: () => {
        alert('Étudiant modifié avec succès !');
        this.router.navigate(['/students']);
      },
      error: (err: any) => console.error('Erreur modification étudiant', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
