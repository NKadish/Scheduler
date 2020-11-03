import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

      const url = `http://localhost:8001/api/appointments/${id}`
      return axios.put(url, appointments[id])
      .then(response => {
        setState({ ...state, appointments });
      })

      
  }

  function deleteInterview (id) {
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const url = `http://localhost:8001/api/appointments/${id}`
      return axios.delete(url, appointments[id])
      .then(response => {
        setState({ ...state, appointments });
      })
  }

  useEffect(() => {
    const urlOne = `http://localhost:8001/api/days`
    const urlTwo = `http://localhost:8001/api/appointments`
    const urlThree =`http://localhost:8001/api/interviewers`
    Promise.all([
      axios.get(urlOne),
      axios.get(urlTwo),
      axios.get(urlThree)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])

  useEffect(() => {
    let listOfAppointments = getAppointmentsForDay(state, state.day);
    let numOfSpots = listOfAppointments.filter(appointment => !appointment.interview).length;
    let listOfDays = state.days.map(day => {
      if (day.name === state.day) {
        day.spots = numOfSpots;
      }
      return day;
    })
    setState(prev => ({...prev,
      days: listOfDays
    }))
  }, [state.appointments])


  return {state, setDay, bookInterview, deleteInterview};
}