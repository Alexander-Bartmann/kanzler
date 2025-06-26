import { inject, Injectable, signal, computed } from '@angular/core';
import { Auth, signOut, User as FirebaseUser, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  userData = signal<any | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, async (user: FirebaseUser | null) => {
      if (user) {
        // Suche nach User-Dokument anhand der E-Mail
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          this.userData.set({ id: userDoc.id, ...userDoc.data() });
        } else {
          console.warn('Kein Benutzer mit dieser E-Mail gefunden');
          this.userData.set(null);
        }
      } else {
        this.userData.set(null);
      }
    });
  }

  logout() {
    signOut(this.auth);
    this.userData.set(null);
  }

  get role() {
    return this.userData()?.role;
  }

  get isAdminSignal() {
    return computed(() => this.userData()?.role === 'admin');
  }

  get isEmployeeSignal() {
    return computed(() => this.userData()?.role === 'employee');
  }
}
