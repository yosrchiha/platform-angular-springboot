import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
  id?: number;
  day: string;
  type: string;
  title: string;
  description: string;
  surah: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private apiUrl = 'http://localhost:8081/api/courses';

  constructor(private http: HttpClient) {}

  // Récupérer tous les cours
  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

  // Récupérer un cours par ID
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les cours par jour
  getCoursesByDay(day: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/by-day/${day}`);
  }

  // Récupérer les cours par type
  getCoursesByType(type: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/by-type/${type}`);
  }

  // Créer un nouveau cours
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course);
  }

  // Mettre à jour un cours
  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
  }

  // Supprimer un cours
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}