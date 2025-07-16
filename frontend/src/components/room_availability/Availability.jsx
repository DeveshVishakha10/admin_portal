import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const Availability = () => {
  const [events, setEvents] = useState([])

  const eventsService = createEventsServicePlugin({
    events: events, // will update dynamically
  })

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    plugins: [eventsService],
  })

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:3000/contact')
      const bookings = res.data || []

      const calendarEvents = bookings.map((item) => ({
        id: item.booking_id,
        title: `${item.purpose || 'Meeting'} (${item.assigned_room || 'Unassigned'})`,
        start: item.date,
        end: item.time,
        location: item.location,
      }))

      setEvents(calendarEvents)
      eventsService.removeAll()
      eventsService.addMany(calendarEvents)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div style={{ height: '600px' }}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}
