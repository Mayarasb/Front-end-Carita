import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NoticiasComponent } from '../noticias/noticias.component';
import { BannerResultadoComponent } from '../banner-resultado/banner-resultado.component';
import { FooterComponent } from '../footer/footer.component';
import { BannerConteudoComponent } from '../banner-conteudo/banner-conteudo.component';
import { HelperBannerComponent } from '../helper-banner/helper-banner.component';

@Component({
  selector: 'app-pagina-conteudo',
  standalone: true,
  imports: [HeaderComponent, BannerConteudoComponent, NoticiasComponent, BannerResultadoComponent, FooterComponent, HelperBannerComponent],
  templateUrl: './pagina-conteudo.component.html',
  styleUrl: './pagina-conteudo.component.css'
})
export class PaginaConteudoComponent {

}
