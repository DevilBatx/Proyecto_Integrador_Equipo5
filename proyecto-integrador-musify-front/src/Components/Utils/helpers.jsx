export const createAvatarFromName = (firstName, lastName) => {
  if (firstName && lastName) {
    firstName = firstName.toString();
    lastName = lastName.toString();
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase(); 
  } else {
    return ''; // Otra acción a tomar si firstName o lastName son undefined
  }
}

export const formatDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1), // Months are zero indexed
      day = '' + d.getDate(),
      year = d.getFullYear();

  // Adding leading zeros for day and month if they are less than 10
  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};

