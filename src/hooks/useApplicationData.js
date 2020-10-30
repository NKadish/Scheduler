import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
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
      interview: { ...null }
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

  return {state, setDay, bookInterview, deleteInterview};
}