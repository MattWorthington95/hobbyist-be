const faker = require('faker/locale/en_GB');

exports.randomiseHours = () => {
  const days = {
    monday: { open: null, close: null },
    tuesday: { open: null, close: null },
    wednesday: { open: null, close: null },
    thursday: { open: null, close: null },
    friday: { open: null, close: null },
    saturday: { open: null, close: null },
    sunday: { open: null, close: null }
  };
  const dayIsOpen = faker.helpers.randomize(Object.keys(days));
  const openHours = faker.datatype.number(13) + 8;
  const closingHours = openHours + faker.datatype.number(3) + 1;

  for (let day in days) {
    if (dayIsOpen === day) {
      days[day] = { open: openHours, close: closingHours };
    }
  }

  return days;
};
