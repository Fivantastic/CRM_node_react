export const getFullName = (name, last_name) => {
    if (last_name && last_name.includes(' ')) {
      return name + ' ' + last_name.split(' ')[0];
    } else if (last_name == null) {
      return name;
    } else {
      return name + ' ' + last_name;
    }
  };