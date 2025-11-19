import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Attendance {
  course: {
    id: number;
    title?: string;
  };
  date: string;
  status: 'PRESENT' | 'ABSENT';
}


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:8081/api/presence';

  constructor(private http: HttpClient) {}

  // Récupérer les présences/absences pour un étudiant
  getMyAttendances(studentId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/me?studentId=${studentId}`);
  }
}
