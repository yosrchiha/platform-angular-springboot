import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../services/students';
import { CourseService } from '../services/CourseService';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.html',
  styleUrls: ['./attendance.css']
})
export class AttendanceComponent implements OnInit {

  courses: any[] = [];
  students: any[] = [];
  selectedCourse: any = null;

  constructor(
    private studentsService: StudentsService,
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
  }

  loadCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }

  loadStudents() {
    this.studentsService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  markAttendance(student: any, status: string) {
    const presence = {
      student: student,
      course: this.selectedCourse,
      status: status
    };

    this.http.post("http://localhost:8081/api/presence", presence)
      .subscribe(() => {
        alert(`${student.nom} → ${status}`);
      });
  }
}
