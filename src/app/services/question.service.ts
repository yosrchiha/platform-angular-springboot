import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  studentId: number;
  text: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:8081/api/questions';

  constructor(private http: HttpClient) {}

  postQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.apiUrl, question);
  }
}
