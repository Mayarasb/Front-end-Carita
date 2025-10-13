import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // Importa o módulo
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';


@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent {
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

  // Criar evento clicando em um dia
  onDateSelect(selectionInfo: any) {
    const title = prompt('Título do evento:');
    if (title) {
      const descricao = prompt('Descrição:');
      const endereco = prompt('Endereço:');
      const start = prompt('Data/Hora início (YYYY-MM-DD HH:mm):', selectionInfo.startStr);
      const end = prompt('Data/Hora término (YYYY-MM-DD HH:mm):', selectionInfo.endStr || selectionInfo.startStr);

      const newEvent = {
        id: String(new Date().getTime()),
        title,
        start,
        end,
        extendedProps: {
          descricao,
          endereco,
        }
      };

      this.events.push(newEvent);
      this.calendarOptions.events = [...this.events];
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