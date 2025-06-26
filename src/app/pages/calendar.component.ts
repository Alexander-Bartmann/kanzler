import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [FullCalendarModule],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek',
    },
    editable: true,
    selectable: true,
    dateClick: this.onDateClick.bind(this),
    events: [], // später dynamisch via Firestore
  };

  onDateClick(info: any) {
    console.log('Klick auf', info.dateStr);
    // Hier später: Modal öffnen zum Auftrag anlegen
    alert(`Neuer Auftrag am ${info.dateStr}`);
  }
}
