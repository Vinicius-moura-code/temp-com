export interface ResponseForm {
  identifier: number;
  nomeContato: string;
  email: string;
}

export interface RequestSchedule {
  identifier: number;
  meetingSuggestion: MeetingSuggestion;
}

export interface MeetingSuggestion {
  attendee: string;
  startDateTime: string;
  endDateTime: string;
}

export interface Payload {
  cliente: ResponseForm;
  agendamento: RequestSchedule;
}
