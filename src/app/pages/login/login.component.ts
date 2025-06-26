import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  loginForm = this.fb.group({
    mitarbeiternummer: ['', [Validators.required]],
    passwort: ['', [Validators.required]]
  });

  async login() {
    const mitarbeiterId = this.loginForm.value.mitarbeiternummer;
    const password = this.loginForm.value.passwort;

    if (!mitarbeiterId || !password) {
      alert('Bitte alle Felder ausfüllen.');
      return;
    }

    const pseudoEmail = `${mitarbeiterId}@firma.de`;

    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, pseudoEmail, password);
      const user = userCredential.user;

      // Hier kannst du basierend auf der UID oder Custom Claims weiterleiten
      if (user.email?.startsWith('admin')) {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/mitarbeiter-dashboard']);
      }
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
      alert('Login fehlgeschlagen. Bitte prüfe die Angaben.');
    }
  }
}
