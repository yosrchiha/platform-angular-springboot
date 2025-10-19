import { Routes } from '@angular/router';
import { StudentsList } from './students-list/students-list';
import { CreateStudent } from './create-student/create-student'; // ✅ exporter la classe
import { EditStudent } from './edit-student/edit-student';

export const routes: Routes = [
  { path: 'students', component: StudentsList },
  { path: 'create-student', component: CreateStudent },
  { path: 'edit-student/:id', component: EditStudent },

  { path: '', redirectTo: 'students', pathMatch: 'full' }
];
