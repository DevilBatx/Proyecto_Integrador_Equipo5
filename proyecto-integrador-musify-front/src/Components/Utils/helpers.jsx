export const createAvatarFromName = (firstName, lastName) => {
  if (firstName && lastName) {
    firstName = firstName.toString();
    lastName = lastName.toString();
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase(); 
  } else {
    return ''; // Otra acción a tomar si firstName o lastName son undefined
  }
}



