import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentsService } from '../services/students'; // Ajustez le chemin selon votre structure

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './students-list.html',
  styleUrls: ['./students-list.css']
})
export class StudentsList implements OnInit {
  
  // Liste des étudiants
  students_corran: any[] = [];
  filteredStudents: any[] = [];
  
  // Statistiques du dashboard
  totalStudents: number = 0;
  totalCourses: number = 12;
  attendanceToday: number = 85;
  newStudentsThisMonth: number = 5;
  
  // Filtres et recherche
  searchTerm: string = '';
  filterNiveau: string = '';
  sortBy: string = 'nom';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  pages: number[] = [];

  constructor(
    private router: Router,
    private studentService: StudentsService // Injectez votre service
  ) {}
  goToAttendance():void {
  this.router.navigate(['/attendance']);
}


  ngOnInit(): void {
    this.loadStudents();
    this.loadStatistics();
  }

  /**
   * Charge tous les étudiants depuis le service
   */
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students_corran = data.map(student => ({
          ...student,
          selected: false // Ajoute la propriété de sélection
        }));
        this.filteredStudents = [...this.students_corran];
        this.totalStudents = this.students_corran.length;
        this.calculatePagination();
        this.sortStudents();
      },
      error: (err) => {
        console.error('Erreur chargement étudiants:', err);
        alert('Erreur lors du chargement des étudiants');
      }
    });
  }

  /**
   * Charge les statistiques du dashboard
   */
  loadStatistics(): void {
    // Vous pouvez créer un service pour récupérer ces stats
    this.totalStudents = this.students_corran.length;
    
    // Calculer les nouveaux étudiants du mois
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    this.newStudentsThisMonth = this.students_corran.filter(student => {
      const createdDate = new Date(student.createdAt);
      return createdDate >= firstDayOfMonth;
    }).length;
  }

  /**
   * Filtre les étudiants selon la recherche et le niveau
   */
  filterStudents(): void {
  this.filteredStudents = this.students_corran.filter(student => {
    const matchSearch =
      !this.searchTerm ||
      student.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      student.telephone.includes(this.searchTerm);

    const matchNiveau =
      !this.filterNiveau || student.niveau === this.filterNiveau;

    return matchSearch && matchNiveau;
  });
}


  /**
   * Trie les étudiants selon le critère sélectionné
   */
  sortStudents(): void {
    switch(this.sortBy) {
      case 'nom':
        this.filteredStudents.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'age':
        this.filteredStudents.sort((a, b) => a.age - b.age);
        break;
      case 'niveau':
        this.filteredStudents.sort((a, b) => a.niveau.localeCompare(b.niveau));
        break;
      case 'recent':
        this.filteredStudents.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        break;
    }
  }
   goToAddStudent() {
    this.router.navigate(['/create-student']);
  }
  

  /**
   * Retourne la classe CSS du badge selon le niveau
   */
  getNiveauBadgeClass(niveau: string): string {
    const classes: { [key: string]: string } = {
      'Débutant': 'bg-info',
      'Intermédiaire': 'bg-warning text-dark',
      'Avancé': 'bg-success'
    };
    return classes[niveau] || 'bg-secondary';
  }

  /**
   * Calcule le pourcentage de progression (sourates mémorisées)
   */
  getProgressWidth(student: any): number {
    // Liste simplifiée des sourates (vous pouvez l'étendre)
    const sourates = [
      'Al-Fatiha', 'Al-Baqara', 'Al-Imran', 'An-Nisa', 'Al-Maidah',
      'Al-Anam', 'Al-Araf', 'Al-Anfal', 'At-Tawba', 'Yunus'
      // ... ajoutez toutes les sourates
    ];
    
    const indexDe = sourates.findIndex(s => s === student.sourateDe);
    const indexA = sourates.findIndex(s => s === student.sourateA);
    
    if (indexDe === -1 || indexA === -1) return 0;
    
    const totalSourates = sourates.length;
    const progress = ((indexA - indexDe + 1) / totalSourates) * 100;
    
    return Math.min(Math.max(progress, 0), 100);
  }

  /**
   * Sélectionne/Désélectionne tous les étudiants
   */
  selectAll(event: any): void {
    const checked = event.target.checked;
    this.filteredStudents.forEach(student => student.selected = checked);
  }

  /**
   * Vérifie s'il y a des étudiants sélectionnés
   */
  hasSelectedStudents(): boolean {
    return this.filteredStudents.some(student => student.selected);
  }

  /**
   * Supprime les étudiants sélectionnés
   */
  deleteSelected(): void {
    const selected = this.filteredStudents.filter(s => s.selected);
    
    if (selected.length === 0) {
      alert('Aucun étudiant sélectionné');
      return;
    }
    
    if (confirm(`Voulez-vous vraiment supprimer ${selected.length} étudiant(s) ?`)) {
      const deletePromises = selected.map(student => 
        this.studentService.deleteStudent(student.id).toPromise()
      );
      
      Promise.all(deletePromises).then(() => {
        alert('Étudiants supprimés avec succès');
        this.loadStudents();
      }).catch(err => {
        console.error('Erreur suppression:', err);
        alert('Erreur lors de la suppression');
      });
    }
  }

  /**
   * Envoie un email aux étudiants sélectionnés
   */
  sendEmailToSelected(): void {
    const selected = this.filteredStudents.filter(s => s.selected);
    if (selected.length === 0) {
      alert('Aucun étudiant sélectionné');
      return;
    }
    alert(`Envoi d'email à ${selected.length} étudiant(s)\nFonctionnalité à implémenter`);
  }

  /**
   * Exporte les étudiants sélectionnés
   */
  exportSelected(): void {
    const selected = this.filteredStudents.filter(s => s.selected);
    if (selected.length === 0) {
      alert('Aucun étudiant sélectionné');
      return;
    }
    console.log('Export sélection:', selected);
    alert('Export en cours... (à implémenter)');
  }

  /**
   * Exporte tous les étudiants vers Excel
   */
  exportToExcel(): void {
    // Installation: npm install xlsx
    // import * as XLSX from 'xlsx';
    
    alert('Export Excel à implémenter avec la bibliothèque XLSX');
    
    /* Exemple d'implémentation:
    const ws = XLSX.utils.json_to_sheet(this.filteredStudents);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Étudiants');
    XLSX.writeFile(wb, 'etudiants.xlsx');
    */
  }

  /**
   * Navigation vers les différentes pages
   */
  goToDashboard(): void {
    this.router.navigate(['/admin-dashboard']);
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  

  goToCourses(): void {
    this.router.navigate(['/courses']);
  }

  

  goToReports(): void {
    this.router.navigate(['/reports']);
    // Cette route doit être créée
  }

  /**
   * Voir les détails d'un étudiant
   */
  viewStudent(id: number): void {
    this.router.navigate(['/student-detail', id]);
    // Cette route doit être créée
  }

  /**
   * Supprime un étudiant
   */
  deleteStudent(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          alert('Étudiant supprimé avec succès');
          this.loadStudents(); // Recharge la liste
        },
        error: (err) => {
          console.error('Erreur suppression:', err);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  /**
   * Déconnexion
   */
  logout(): void {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }

  /**
   * Calcule la pagination
   */
  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredStudents.length / this.itemsPerPage);
    this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    
    // Limite l'affichage à 5 pages maximum
    if (this.pages.length > 5) {
      const start = Math.max(0, this.currentPage - 3);
      const end = Math.min(this.pages.length, start + 5);
      this.pages = this.pages.slice(start, end);
    }
  }

  /**
   * Va à une page spécifique
   */
  goToPage(page: number): void {
    this.currentPage = page;
  }

  /**
   * Page précédente
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Page suivante
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  /**
   * Obtient les étudiants de la page actuelle
   */
  get paginatedStudents(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredStudents.slice(start, end);
  }
}