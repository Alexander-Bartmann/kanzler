import { Component, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  isAdmin = this.userService.isAdminSignal;
  isEmployee = this.userService.isEmployeeSignal;


  adminMitarbeiterLinks = [
    { label: 'Mitarbeiterliste', link: 'employees' },
    { label: 'Urlaub', link: 'employees/urlaub' },
    { label: 'Stunden', link: 'employees/stunden' },
    { label: 'Fortbildungen', link: 'employees/fortbildung' }
  ];

  employeeLinks = [
    { label: 'Mein Urlaub', link: 'employees/urlaub' },
    { label: 'Meine Stunden', link: 'employees/stunden' },
    { label: 'Meine Fortbildungen', link: 'employees/fortbildung' }
  ];

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
