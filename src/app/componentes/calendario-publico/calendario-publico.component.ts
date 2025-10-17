import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; 
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
export class CalendarioComponent {
  constructor(private calendarioService: CalendarioService) {}
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: 'pt-br',
    selectable: true,
    editable: true,
    eventClick: this.onEventClick.bind(this),
    select: this.onDateSelect.bind(this),     
    events: []
  };

  events: any[] = [];
  selectedEvent: any = null; 

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
      const novaDescricao = prompt('Descrição:', this.selectedEvent.extendedProps['descricao'] || '');
      const novoEndereco = prompt('Endereço:', this.selectedEvent.extendedProps['endereco'] || '');
      const novoInicio = prompt('Data/Hora início (YYYY-MM-DD HH:mm):', this.selectedEvent.startStr);
      const novoFim = prompt('Data/Hora término (YYYY-MM-DD HH:mm):', this.selectedEvent.endStr || this.selectedEvent.startStr);

      if (novoTitulo) {
        this.selectedEvent.setProp('title', novoTitulo);
        this.selectedEvent.setStart(novoInicio);
        this.selectedEvent.setEnd(novoFim);
        this.selectedEvent.setExtendedProp('descricao', novaDescricao);
        this.selectedEvent.setExtendedProp('endereco', novoEndereco);
      }
    }
    this.closeModal();
  }

  // Excluir evento
  deleteEvent() {
    if (this.selectedEvent && confirm(`Excluir evento "${this.selectedEvent.title}"?`)) {
      this.selectedEvent.remove();
    }
    this.closeModal();
  }
}