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