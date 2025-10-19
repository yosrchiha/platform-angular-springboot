import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Students } from '../students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:8081/api/students_coraan/students';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(this.apiUrl);
  }

  createStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateStudent(id: number, student: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, student);
}
  getStudentById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/${id}`);
}

}


