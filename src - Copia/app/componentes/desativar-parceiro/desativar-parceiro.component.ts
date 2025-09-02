import { Component } from '@angular/core';
import { RouterLink, Router} from '@angular/router';

@Component({
  selector: 'app-desativar-parceiro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './desativar-parceiro.component.html',
  styleUrl: './desativar-parceiro.component.css'
})
export class DesativarParceiroComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // ou sessionStorage.clear();
    this.router.navigate(['pagina-login']); // redireciona para a página de login
  }
}