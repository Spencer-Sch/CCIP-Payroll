import { useState } from "react";
import CalendarView from "../../components/CalendarView";
import { CalendarDetails } from "../../types/CalendarTypes";
import { CALENDAR_INITIAL_EVENTS } from "../../utils/dummyData";
import { RIGHT_DRAWER_TYPES } from "../../utils/globalConstantUtil";
import { showNotification } from "../common/headerSlice";
import { openRightDrawer } from "../common/rightDrawerSlice";
import moment from "moment";
import { useMyDispatch } from "~~/components/dash-wind/app/store";

const INITIAL_EVENTS = CALENDAR_INITIAL_EVENTS;

function Calendar() {
  const dispatch = useMyDispatch();

  const [events, setEvents] = useState(INITIAL_EVENTS);

  // Add your own Add Event handler, like opening modal or random event addition
  // Format - {title :"", theme: "", startTime : "", endTime : ""}, typescript version comming soon :)
  const addNewEvent = (date: moment.Moment) => {
    const randomEvent = INITIAL_EVENTS[Math.floor(Math.random() * 10)];
    const newEventObj = {
      title: randomEvent.title,
      theme: randomEvent.theme,
      startTime: moment(date).startOf("day"),
      endTime: moment(date).endOf("day"),
    };
    setEvents([...events, newEventObj]);
    dispatch(showNotification({ message: "New Event Added!", status: 1 }));
  };

  // Open all events of current day in sidebar
  const openDayDetail = ({ filteredEvents, title }: CalendarDetails) => {
    dispatch(
      openRightDrawer({ header: title, bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS, extraObject: { filteredEvents } }),
    );
  };

  return (
    <>
      <CalendarView calendarEvents={events} addNewEvent={addNewEvent} openDayDetail={openDayDetail} />
    </>
  );
}

export default Calendar;
