import { useEffect, useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function useApplicationData() {

  // Sets up the state 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // Sets up setDay function
  const setDay = day => setState({ ...state, day });

  // Sets up book an interview
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    // Adds the appointment to the list of appointments 
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Makes a put request to the database and saves the new appointment
    const url = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(url, appointments[id])
    .then(response => {
      setState({ ...state, appointments });
    });
  };

  // Functionality to delete the interview 
  function deleteInterview (id) {

    // Sets the interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };

    // Puts the null interview into the list of interviews
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // Makes a delete request to delete the information from the database
    const url = `http://localhost:8001/api/appointments/${id}`
    return axios.delete(url, appointments[id])
    .then(response => {
      setState({ ...state, appointments });
    });
  };

  // All three of the get requests from the db, turning them into the state of the app.
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
    });
  }, []);

  // Functionality for keeping the spots available update with save and delete 
  useEffect(() => {

    let appointmentList = getAppointmentsForDay(state, state.day);

    // Filters through appointments where there isn't an interview and gets the number of them
    let spots = appointmentList.filter(appointment => !appointment.interview).length;

    // Maps through the days, and if the name of the day and the state are the same it sets the spots to equal spots
    let daysList = state.days.map(day => {

      if (day.name === state.day) {
        day.spots = spots;
      }
      return day;

    });

    setState(prev => ({...prev,
      days: daysList
    }));

    // Updates every time there is a change in appointments
  }, [state.appointments]);


  return {state, setDay, bookInterview, deleteInterview};
}