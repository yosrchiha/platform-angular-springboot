import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register';
// autres composants standalone
import { StudentsList } from './students-list/students-list';
import { CreateStudent } from './create-student/create-student';
import { EditStudent } from './edit-student/edit-student';
import { DashboardComponent } from './dashboard/dashboard';
import { CoursesListComponent } from './cours/cours';
import { CourseFormComponent } from './course-form/course-form';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentsList },
  { path: 'create-student', component: CreateStudent },
  { path: 'edit-student/:id', component: EditStudent },
  { path: 'courses', component: CoursesListComponent },
    
  { path: 'create-course', component: CourseFormComponent },
  { path: 'edit-course/:id', component: CourseFormComponent },
];

