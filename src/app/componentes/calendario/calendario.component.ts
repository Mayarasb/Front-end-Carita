import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importa o módulo
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { CalendarioService} from '../../services/calendario.service';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  constructor(private calendarioService: CalendarioService) {}
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'pt-br',
    selectable: true,
    editable: true,
    eventClick: this.onEventClick.bind(this), // clique no evento
    select: this.onDateSelect.bind(this),     // clique em dia
    events: []
  };

  events: any[] = [];
  selectedEvent: any = null; // evento selecionado

  ngOnInit(): void {
  this.carregarEventos();
}

carregarEventos(): void {
  this.calendarioService.getEventos().subscribe({
    next: (res: any[]) => {
      this.events = res;
      this.calendarOptions.events = [...this.events]; 
    },
    error: (err) => {
      console.error('Erro ao carregar eventos:', err);
      alert('Erro ao carregar eventos do servidor!');
    }
  });
}


  // Criar evento clicando em um dia
   onDateSelect(selectionInfo: any) {
    const title = prompt('Título do evento:');
    if (title) {
      const descricao = prompt('Descrição:');
      const endereco = prompt('Endereço:');
      const start = selectionInfo.startStr;
      const end = selectionInfo.endStr || selectionInfo.startStr;

      const newEvent = { title, description: descricao, address: endereco, start, end };

      this.calendarioService.adicionarEvento(newEvent).subscribe({
        next: (eventoSalvo) => {
          console.log('Evento salvo no backend:', eventoSalvo);
          this.events.push(eventoSalvo);
          this.calendarOptions.events = [...this.events];
        },
        error: (err) => {
          console.error('Erro ao salvar evento:', err);
          alert('Erro ao salvar evento no servidor!');
        }
      });
    }
  }

  // Abrir modal com informações do evento
  onEventClick(clickInfo: any) {
    this.selectedEvent = clickInfo.event;
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  // Fechar modal
  closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) {
      modal.style.display = 'none';
    }
    this.selectedEvent = null;
  }

  
  // Editar evento
editEvent() {
  if (this.selectedEvent) {
    const novoTitulo = prompt('Novo título:', this.selectedEvent.title);
    const novaDescricao = prompt('Descrição:', this.selectedEvent.extendedProps['description'] || '');
    const novoEndereco = prompt('Endereço:', this.selectedEvent.extendedProps['address'] || '');
    const novoInicio = prompt('Data/Hora início (YYYY-MM-DD HH:mm):', this.selectedEvent.startStr);
    const novoFim = prompt('Data/Hora término (YYYY-MM-DD HH:mm):', this.selectedEvent.endStr || this.selectedEvent.startStr);

    if (novoTitulo) {
      const eventoAtualizado = {
        id: this.selectedEvent.id,
        title: novoTitulo,
        description: novaDescricao || this.selectedEvent.extendedProps['description'] || '',
        address: novoEndereco || this.selectedEvent.extendedProps['address'] || '',
        start: novoInicio || this.selectedEvent.startStr,
        end: novoFim || this.selectedEvent.endStr || this.selectedEvent.startStr
      };

      // Atualiza no backend
      this.calendarioService.atualizarEvento(eventoAtualizado).subscribe({
        next: (res) => {
          console.log('Evento atualizado no backend:', res);

         
          if (this.selectedEvent) {
            this.selectedEvent.setProp('title', eventoAtualizado.title);
            this.selectedEvent.setStart(eventoAtualizado.start);
            this.selectedEvent.setEnd(eventoAtualizado.end);
            this.selectedEvent.setExtendedProp('description', eventoAtualizado.description);
            this.selectedEvent.setExtendedProp('address', eventoAtualizado.address);
          }

    
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao atualizar evento:', err);
          alert('Erro ao atualizar evento no servidor!');
        }
      });
    } else {
      this.closeModal();
    }
  }
}



  // Excluir evento
deleteEvent() {
  if (this.selectedEvent && confirm(`Excluir evento "${this.selectedEvent.title}"?`)) {
    const id = this.selectedEvent.id; // o ID é necessário pro DELETE

    // Chama o backend
    this.calendarioService.removerEvento(id).subscribe({
      next: () => {
        console.log('Evento removido do backend:', id);
        this.selectedEvent.remove(); // agora sim remove também da tela
        this.closeModal();
      },
      error: (err) => {
        console.error('Erro ao excluir evento:', err);
        alert('Erro ao excluir evento no servidor!');
      }
    });
  } else {
    this.closeModal();
  }
}

}