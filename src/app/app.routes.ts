import { Routes } from '@angular/router';
import { ListaOrganizacoesComponent } from './componentes/lista-organizacoes/lista-organizacoes.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { PaginaSobreComponent } from './componentes/pagina-sobre/pagina-sobre.component';
import { MainComponent } from './main/main.component';
import { PaginaConteudoComponent } from './componentes/pagina-conteudo/pagina-conteudo.component';
import { PaginaComoajudarComponent } from './componentes/pagina-comoajudar/pagina-comoajudar.component';
import { PaginaContatoComponent } from './componentes/pagina-contato/pagina-contato.component';
import { PaginaLoginComponent } from './componentes/pagina-login/pagina-login.component';
import { PaginaCadastroComponent } from './componentes/pagina-cadastro/pagina-cadastro.component';
import { PaginaPrecadastroComponent } from './componentes/pagina-precadastro/pagina-precadastro.component';
import { DadosInstituicaoComponent } from './componentes/dados-instituicao/dados-instituicao.component';
import { DadosParceirosComponent } from './componentes/dados-parceiros/dados-parceiros.component';
import { DadosRepresentanteComponent } from './componentes/dados-representante/dados-representante.component';
import { DesativarContaComponent } from './componentes/desativar-conta/desativar-conta.component';
import { DadosParceirosIdComponent } from './componentes/dados-parceiros-id/dados-parceiros-id.component';
import { DesativarParceiroComponent } from './componentes/desativar-parceiro/desativar-parceiro.component';
import { DadosRepresentanteParceiroComponent } from './componentes/dados-representante-parceiro/dados-representante-parceiro.component';

import { FomeVotorantimNoticiaComponent } from './componentes/fome-votorantim-noticia/fome-votorantim-noticia.component';
import { AlimentosNoticiasComponent } from './componentes/alimentos-noticias/alimentos-noticias.component';
import { DoacaoNoticiasComponent } from './componentes/doacao-noticias/doacao-noticias.component';
import { PaginaPixComponent } from './componentes/pagina-pix/pagina-pix.component';
import { DadosInstituicaoIdComponent } from './componentes/dados-instituicao-id/dados-instituicao-id.component';
import { AvaliacaoSiteComponent } from './componentes/avaliacao-site/avaliacao-site.component';
import { PaginaAdministradorComponent } from './componentes/pagina-administrador/pagina-administrador.component';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';

export const routes: Routes = [
    {path: '', component: MainComponent },
    {path: 'lista-organizacoes', component: ListaOrganizacoesComponent },
    {path: 'dashboard', component: DashboardComponent },
    {path: 'pagina-sobre', component: PaginaSobreComponent },
    {path: 'pagina-conteudo', component: PaginaConteudoComponent },
    {path: 'pagina-comoAjudar', component: PaginaComoajudarComponent },
    {path: 'pagina-contato', component: PaginaContatoComponent},
    {path: 'pagina-login', component: PaginaLoginComponent},
    {path: 'pagina-preCadastro', component: PaginaPrecadastroComponent},
    {path: 'pagina-cadastro', component: PaginaCadastroComponent},
    {path: 'pagina-ong', component: DadosInstituicaoComponent},
    {path: 'pagina-parceiros', component: DadosParceirosComponent},
    {path: 'pagina-parceirosId', component: DadosParceirosIdComponent},
    {path: 'pagina-representante', component: DadosRepresentanteComponent},
    {path: 'pagina-RepresentanteParceiros', component: DadosRepresentanteParceiroComponent},
    {path: 'pagina-ongId', component: DadosInstituicaoIdComponent},
    

    {path: 'pagina-desativarOng', component: DesativarContaComponent},
    {path: 'pagina-desativarParceiro', component: DesativarParceiroComponent},
    {path: 'noticia-fomeVotorantim', component: FomeVotorantimNoticiaComponent},
    {path: 'noticia-alimentos', component: AlimentosNoticiasComponent},
    {path: 'noticia-doacao', component: DoacaoNoticiasComponent},
    {path: 'pagina-pix', component: PaginaPixComponent},
    {path: 'pagina-avaliacao', component: AvaliacaoSiteComponent},
    {path: 'pagina-administrador', component: PaginaAdministradorComponent},
    {path: 'lista-usuarios', component: ListaUsuariosComponent},
    {path: 'calendario', component: CalendarioComponent},
    




];
