export function getAppointmentsForDay(state, day) {

  const appointmentsArray = [];

  const filteredDay = state.days.filter(val => val.name === day);

  if (filteredDay.length > 0) {

    const appointmentsForDay = filteredDay[0].appointments
    appointmentsForDay.forEach(key => appointmentsArray.push(state.appointments[key]));
    return appointmentsArray;

  } else {

    return appointmentsArray;
    
  }
  //... returns an array of appointments for that day
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