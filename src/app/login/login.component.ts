import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
showPassword = false;
rememberMe = false;
isLoading = false;
errorMessage = '';
  constructor(private authService: AuthService, private router: Router) {}
onSubmit() {
  console.log('Tentative de connexion avec :', this.credentials);

  // 🔹 Cas admin
  if (this.credentials.email === 'admin@gmail.com' && this.credentials.password === 'admin1') {
    // redirection vers la page des étudiants
    this.router.navigate(['/students']);
    return; // on stop ici pour ne pas appeler le backend
  }

  // 🔹 Cas étudiant
  this.authService.login(this.credentials).subscribe({
    next: (res) => {
      console.log('Réponse du backend :', res);
      localStorage.setItem('student', JSON.stringify(res));
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('Erreur de connexion:', err);
      alert('Échec de connexion');
    }
  });
}

}
