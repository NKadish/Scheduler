export function getAppointmentsForDay(state, day) {

  const found = state.days.find(current => current.name === day);

  if (!found) {
    return [];
  }

  const apps = found.appointments.map(id => state.appointments[id]);

  return apps;

}

export function getInterviewersForDay(state, day) {

  const found = state.days.find(val => val.name === day);

  if (!found) {
    return [];
  }

  const interviewers = found.interviewers.map(id => state.interviewers[id]);
  return interviewers;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  } else {
    const interviewerId = interview.interviewer;
    let interviewObj = {}
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[interviewerId];
    return interviewObj;
  }
}