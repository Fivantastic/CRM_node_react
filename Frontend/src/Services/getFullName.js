export const getFullName = (name, lastName) => {
    if (lastName && lastName.includes(' ')) {
      return name + ' ' + lastName.split(' ')[0];
    } else if (lastName == null) {
      return name;
    } else {
      return name + ' ' + lastName;
    }
  };