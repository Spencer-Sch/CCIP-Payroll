export type CalendarEvent = {
  title: string;
  theme: string;
  startTime: any;
  endTime: any;
};

export type CalendarMore = {
  title: string;
  theme: string;
};

export type CalendarDetails = {
  filteredEvents: CalendarMore[];
  title: string;
};

export type CalendarEvents = (CalendarEvent | CalendarMore)[];
