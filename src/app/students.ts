export class Students {
  id!: number;
  nom!: string;
  prenom!: string;
  age!: number;
  adresse!: string;

  // Niveau d'apprentissage du Coran (liste déroulante)
  niveau!: string; // peut être 'COMPLET', 'PARTIEL', etc.

  // Si partiel — préciser les sourates mémorisées
  sourateDe!: string;
  sourateA!: string;

  // Coordonnées
  email!: string;
  telephone!: string;

  // Coordonnées des parents (si < 15 ans)
  parentNom!: string;
  parentEmail!: string;
  parentTelephone!: string;

  constructor(init?: Partial<Students>) {
    Object.assign(this, init);
  }

  get isMineur(): boolean {
    return this.age < 15;
  }
}
