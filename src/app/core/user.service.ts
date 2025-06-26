import { inject, Injectable, signal, computed } from '@angular/core';
import { Auth, signOut, User as FirebaseUser, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { query, where } from '@angular/fire/firestore';
import { getDocs } from 'firebase/firestore'; // diesen kannst du vorerst behalten


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  userData = signal<any | null>(null);  // Signal für einfache Verwendung in Templates

  constructor() {
    onAuthStateChanged(this.auth, async (user: FirebaseUser | null) => {
      if (user) {
        const q = query(
          collection(this.firestore, 'users'),
          where('uid', '==', user.uid)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          this.userData.set({ uid: user.uid, ...userDoc });
        } else {
          console.warn('Kein Benutzer mit dieser UID gefunden');
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
