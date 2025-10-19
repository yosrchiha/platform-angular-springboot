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
  styleUrls: ['./edit-student.css']  // <-- ici il faut "styleUrls"
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
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getStudentById();
  }

  getStudentById() {
    this.studentService.getStudentById(this.id).subscribe({
      next: res => this.student = res,
      error: err => console.error(err)
    });
  }

  onSubmit(): void {  // <-- doit exister pour ngSubmit
    this.studentService.updateStudent(this.student.id, this.student).subscribe({
      next: () => {
        alert('Étudiant modifié avec succès !');
         this.router.navigate(['/students']);
      },
      error: err => console.error('Erreur modification étudiant', err)
    });
  }

  cancel() {  // <-- doit exister pour (click)="cancel()"
    this.router.navigate(['/students-list']);
  }
}
