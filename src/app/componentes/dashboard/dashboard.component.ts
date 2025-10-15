import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}

   logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['/pagina-login']); // redireciona para a página de login
  }

}
