import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userId: string = '';
  password: string = '';

  constructor(private auth: Auth, private router: Router) {}

  async login() {
    const fakeEmail = `${this.userId}@firma.de`; // Workaround

    try {
      await signInWithEmailAndPassword(this.auth, fakeEmail, this.password);
      this.router.navigate(['/dashboard']); // z. B. Startseite nach Login
    } catch (err: any) {
      console.error('Login fehlgeschlagen:', err);
      alert(`Login fehlgeschlagen: ${err.code || err.message}`);
    }

  }
}
