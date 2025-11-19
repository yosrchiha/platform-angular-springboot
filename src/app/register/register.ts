import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  student: any = {
    nom: '',
    prenom: '',
    age: null,
    adresse: '',
    niveau: '',
    sourateDe: '',
    sourateA: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    parentNom: '',
    parentEmail: '',
    parentTelephone: ''
  };

  showPassword = false;
  showConfirmPassword = false;
  acceptTerms = false;
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  getPasswordStrength(): number {
    const password = this.student.password;
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 33;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 33;
    if (/[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) strength += 34;
    
    return strength;
  }

  getPasswordStrengthClass(): string {
    const strength = this.getPasswordStrength();
    if (strength < 40) return 'weak';
    if (strength < 80) return 'medium';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength < 40) return 'Mot de passe faible';
    if (strength < 80) return 'Mot de passe moyen';
    return 'Mot de passe fort';
  }

  onSubmit(): void {
    // Validation des mots de passe
    if (this.student.password !== this.student.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas';
      return;
    }

    // Validation des CGU
    if (!this.acceptTerms) {
      this.errorMessage = 'Vous devez accepter les conditions d\'utilisation';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Préparation des données pour l'API (sans confirmPassword)
    const registrationData = {
      nom: this.student.nom,
      prenom: this.student.prenom,
      age: this.student.age,
      adresse: this.student.adresse,
      niveau: this.student.niveau,
      sourateDe: this.student.sourateDe,
      sourateA: this.student.sourateA,
      email: this.student.email,
      telephone: this.student.telephone,
      password: this.student.password,
      parentNom: this.student.parentNom,
      parentEmail: this.student.parentEmail,
      parentTelephone: this.student.parentTelephone,
      // Champ name pour compatibilité si nécessaire
      name: `${this.student.prenom} ${this.student.nom}`
    };

    this.authService.register(registrationData).subscribe({
      next: () => {
        this.isLoading = false;
        alert('Inscription réussie !');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur inscription:', err);
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }
}