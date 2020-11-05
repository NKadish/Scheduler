// Returns an array of appointments for the day 
export function getAppointmentsForDay(state, day) {

  const appointmentsArray = [];

  // Filters through the days to find the day with the right name
  const filteredDay = state.days.filter(val => val.name === day);

  // If there is something in the array
  if (filteredDay.length > 0) {

    const appointmentsForDay = filteredDay[0].appointments
    // Loops through the day, pushing the appointments to appointmentArray
    appointmentsForDay.forEach(key => appointmentsArray.push(state.appointments[key]));
    return appointmentsArray;

  } else {

    // Returns and empty array if there are none 
    return appointmentsArray;
    
  };

};

// Gets the interviewers for the day
export function getInterviewersForDay(state, day) {

  // Looks to see if there is a day that matches
  const found = state.days.find(val => val.name === day);

  // If there is not returns an empty array
  if (!found) {
    return [];
  };

  // Maps the interviewers into a new array
  const interviewers = found.interviewers.map(id => state.interviewers[id]);
  return interviewers;
};

// Gets a specific interview 
export function getInterview(state, interview) {

  // If there are none return null
  if (interview === null) {

    return null;

  } else {

    // Populates a new object with what is in the interview
    const interviewerId = interview.interviewer;
    let interviewObj = {}
    interviewObj.student = interview.student;
    interviewObj.interviewer = state.interviewers[interviewerId];
    return interviewObj;

  };
};