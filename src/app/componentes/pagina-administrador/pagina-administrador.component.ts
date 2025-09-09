import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-pagina-administrador',
  standalone: true,
  imports: [ CommonModule, RouterLink],
  templateUrl: './pagina-administrador.component.html',
  styleUrl: './pagina-administrador.component.css'
})
export class PaginaAdministradorComponent {

}
